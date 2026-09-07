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

/**
 * BUGFIX (QA-MKT-015): og:image and twitter:image were written as the root-relative
 * '/logos/logo-full.png'. Every consumer of those tags requires an absolute URL.
 *
 * Scope, stated honestly: this is NOT why a shared link would look wrong today. This site is a
 * client-rendered SPA with no prerendering, and vercel.json rewrites every route to
 * index.html — whose static og tags are already absolute and correct. Crawlers do not run
 * JavaScript, so they never see anything this hook writes. The relative value is a latent
 * defect that would surface the moment these tags are read from the live DOM (a prerender
 * step, or an in-app preview), and it costs one function to remove.
 *
 * What it does not fix: every route currently shares one title, description and image in a
 * crawler's view, because they all get the same index.html. Per-route previews need
 * prerendering or per-route static HTML — a build-pipeline change, not a URL prefix.
 */
function absoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url) || url.startsWith('//')) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

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
    const ogImage = absoluteUrl(config.ogImage || DEFAULT_OG_IMAGE);
    setMeta('og:image', ogImage, 'property');
    setMeta('og:url', canonicalUrl, 'property');

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', config.description);
    setMeta('twitter:image', ogImage);

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
