import { useEffect } from 'react';

// SECURITY-FIX (H-M1): The Google Translate widget is a third-party script that, once loaded,
// has full DOM/JS access to the page and sends data to Google. Previously it was injected
// unconditionally in index.html on every page load — before/without user consent.
//
// This component defers that injection until the user has EXPLICITLY accepted cookies via the
// CookieConsentModal. On load it either injects immediately (consent already stored from a prior
// visit) or waits for the `cookie-consent-done` event and injects only if the choice is 'accepted'.
//
// DECISION: The consent flag key is `cookie-consent` with the accepted value `accepted`
// (see components/layout/CookieConsentModal.tsx). AUDIT_FINDINGS H-M1 gave `cookie_consent`
// /`accepted` only as an example; we follow the key/value the app actually writes so that a
// "Reject" choice truly keeps the third-party script from loading.

const TRANSLATE_SRC =
  'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

function injectTranslateScript() {
  // Guard against double injection (e.g. the consent event firing on an already-accepted load).
  if (document.getElementById('google-translate-script')) return;

  (window as any).googleTranslateElementInit = () => {
    const g = (window as any).google;
    if (g?.translate?.TranslateElement) {
      new g.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    }
  };

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src = TRANSLATE_SRC;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Consent-gated loader for the Google Translate widget. Renders nothing; the widget's target
 * element (#google_translate_element) lives in index.html and is relocated by the Navbar.
 */
export function GoogleTranslate() {
  useEffect(() => {
    // Consent already granted on a previous visit → safe to load now.
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      injectTranslateScript();
      return;
    }

    // Otherwise wait for the consent decision and load ONLY if the user accepts.
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === 'accepted') injectTranslateScript();
    };
    window.addEventListener('cookie-consent-done', onConsent as EventListener);
    return () => window.removeEventListener('cookie-consent-done', onConsent as EventListener);
  }, []);

  return null;
}
