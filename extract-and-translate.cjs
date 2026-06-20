const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');

const project = new Project();
project.addSourceFilesAtPaths('src/components/sections/**/*.tsx');

const extractedStrings = new Set();
const TRANSLATABLE_ATTRS = ['title', 'subtitle', 'eyebrow', 'label', 'description', 'heading', 'text', 'placeholder'];

for (const sourceFile of project.getSourceFiles()) {
  let needsTranslationHook = false;

  // 1. Process JSX Texts
  const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText);
  for (const node of jsxTexts) {
    const rawText = node.getText();
    const trimmed = rawText.replace(/[\r\n]+/g, ' ').trim();
    if (trimmed.length > 1 && /[a-zA-Z]/.test(trimmed)) {
      extractedStrings.add(trimmed);
      // We must preserve surrounding whitespace in JSX if it exists, but for simplicity, we just wrap the trimmed text.
      // A better approach is to wrap the trimmed text in curly braces and leave raw whitespace.
      const prefix = rawText.match(/^\s*/)[0];
      const suffix = rawText.match(/\s*$/)[0];
      node.replaceWithText(`${prefix}{t(${JSON.stringify(trimmed)})}${suffix}`);
      needsTranslationHook = true;
    }
  }

  // 2. Process Translatable Attributes
  const jsxAttributes = sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute);
  for (const node of jsxAttributes) {
    if (node.getKind() === SyntaxKind.JsxAttribute) {
      const name = node.getNameNode().getText();
      if (TRANSLATABLE_ATTRS.includes(name)) {
        const initializer = node.getInitializer();
        if (initializer && initializer.getKind() === SyntaxKind.StringLiteral) {
          const text = initializer.getLiteralValue();
          if (text.length > 1 && /[a-zA-Z]/.test(text)) {
            extractedStrings.add(text);
            initializer.replaceWithText(`{t(${JSON.stringify(text)})}`);
            needsTranslationHook = true;
          }
        }
      }
    }
  }

  if (needsTranslationHook) {
    // Add import
    const hasI18nImport = sourceFile.getImportDeclarations().some(i => i.getModuleSpecifierValue() === 'react-i18next');
    if (!hasI18nImport) {
      sourceFile.addImportDeclaration({
        namedImports: ['useTranslation'],
        moduleSpecifier: 'react-i18next'
      });
    }

    // Add hook to functions (FunctionDeclarations and VariableDeclarations containing arrow functions)
    const funcs = sourceFile.getFunctions();
    for (const func of funcs) {
      if (func.isExported() && func.getName() && /^[A-Z]/.test(func.getName())) {
        const statements = func.getStatements();
        const hasHook = statements.some(s => s.getText().includes('useTranslation()'));
        if (!hasHook) {
          func.insertStatements(0, 'const { t } = useTranslation();');
        }
      }
    }
    
    // Also check arrow functions assigned to exported variables
    const varDecls = sourceFile.getVariableDeclarations();
    for (const varDecl of varDecls) {
      const initializer = varDecl.getInitializer();
      if (initializer && initializer.getKind() === SyntaxKind.ArrowFunction) {
        const parentStmt = varDecl.getFirstAncestorByKind(SyntaxKind.VariableStatement);
        if (parentStmt && parentStmt.isExported() && /^[A-Z]/.test(varDecl.getName())) {
            const body = initializer.getBody();
            if (body.getKind() === SyntaxKind.Block) {
               const hasHook = body.getStatements().some(s => s.getText().includes('useTranslation()'));
               if (!hasHook) {
                 initializer.insertStatements(0, 'const { t } = useTranslation();');
               }
            } else {
               // If it's returning JSX directly: `const Comp = () => <div/>;`
               // we would need to convert it to a block `const Comp = () => { const {t} = useTranslation(); return <div/>; }`
               // To keep it simple, we skip implicit returns. Most components in this project use explicit return.
            }
        }
      }
    }
  }

  sourceFile.saveSync();
}

fs.writeFileSync('extracted.json', JSON.stringify(Array.from(extractedStrings), null, 2));
console.log(`Extracted ${extractedStrings.size} strings to extracted.json`);
