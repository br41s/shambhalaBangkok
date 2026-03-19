'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            autoDisplay: boolean;
            includedLanguages?: string;
            layout?: unknown;
          },
          element: string
        ) => void;
      };
    };
  }
}

export function GoogleTranslate() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || document.getElementById('google-translate-script')) return;
    initialized.current = true;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: 'th,en,es,fr,de,ja,ko,zh-CN,zh-TW,ru,pt,hi',
          },
          'google_translate_element'
        );
      }
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => console.warn('Google Translate failed to load');
    document.body.appendChild(script);

    return () => { delete window.googleTranslateElementInit; };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg"
    />
  );
}
