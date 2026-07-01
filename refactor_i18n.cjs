const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts'))
                results.push(file);
        }
    });
    return results;
}

const files = walk('src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    
    // Remove imports
    newContent = newContent.replace(/import\s+\{\s*useTranslation\s*\}\s+from\s+['"]react-i18next['"];?\r?\n?/g, '');
    
    // Remove destructured t hook
    newContent = newContent.replace(/\s*const\s+\{\s*t\s*\}\s*=\s*useTranslation\(\);?\r?\n?/g, '');
    
    // Replace {t('String')} with {'String'}
    newContent = newContent.replace(/\{\s*t\(['"](.*?)['"]\)\s*\}/g, `'$1'`);
    
    // Replace {t(variable)} with {variable}
    newContent = newContent.replace(/\{\s*t\((.*?)\)\s*\}/g, `{$1}`);
    
    // Replace t('String') with 'String'
    newContent = newContent.replace(/\bt\(['"](.*?)['"]\)/g, `'$1'`);
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Fixed ' + file);
    }
});
console.log('Done');
