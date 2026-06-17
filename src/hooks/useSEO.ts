import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: Record<string, any>;
}

const BASE_URL = 'https://ilesure.com';
const DEFAULT_OG_IMAGE = '/logos/logo-full.png';

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    const fullTitle = `${config.title} | iléSure`;
    document.title = fullTitle;

    const canonicalUrl = config.canonical ? `${BASE_URL}${config.canonical}` : BASE_URL + window.location.pathname;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    setMeta('description', config.description);
    if (config.keywords) setMeta('keywords', config.keywords);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', config.description, 'property');
    setMeta('og:image', config.ogImage || DEFAULT_OG_IMAGE, 'property');
    setMeta('og:url', canonicalUrl, 'property');

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', config.description);
    setMeta('twitter:image', config.ogImage || DEFAULT_OG_IMAGE);

    let scriptEl = document.querySelector('script[id="seo-structured-data"]') as HTMLScriptElement;
    if (config.structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'seo-structured-data';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(config.structuredData);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      document.title = 'iléSure: Your Sure Home Anywhere';
    };
  }, [config.title, config.description, config.keywords, config.ogImage, config.canonical]);
}
