
"use client";

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from './ui/button';
import Link from 'next/link';
import { getSlug } from '@/lib/slugs';
import { usePathname } from 'next/navigation';
import { Cookie } from 'lucide-react';

const translations = {
  fr: {
    message: "En utilisant ce site, vous acceptez notre utilisation des cookies pour sauvegarder vos options de roue et améliorer votre expérience.",
    accept: "Accepter",
    policy: "Politique de Confidentialité"
  },
  en: {
    message: "By using this site, you agree to our use of cookies to save your wheel options and enhance your experience.",
    accept: "Accept",
    policy: "Privacy Policy"
  },
  es: {
    message: "Al utilizar este sitio, aceptas nuestro uso de cookies para guardar las opciones de tu ruleta y mejorar tu experiencia.",
    accept: "Aceptar",
    policy: "Política de Privacidad"
  },
  de: {
    message: "Durch die Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu, um Ihre Radoptionen zu speichern und Ihre Erfahrung zu verbessern.",
    accept: "Akzeptieren",
    policy: "Datenschutzrichtlinie"
  },
  pt: {
    message: "Ao utilizar este site, concorda com a nossa utilização de cookies para guardar as opções da sua roda e melhorar a sua experiência.",
    accept: "Aceitar",
    policy: "Política de Privacidade"
  }
};

export default function CookieConsentBanner() {
  const [consent, setConsent] = useLocalStorage('cookie_consent', false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const lang = pathname.split('/')[1] || 'fr';
  const t = translations[lang as keyof typeof translations] || translations.fr;

  useEffect(() => {
    // Only show the banner if consent has not been given
    if (!consent) {
      setIsVisible(true);
    }
  }, [consent]);

  const handleAccept = () => {
    setConsent(true);
    setIsVisible(false);
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('cookie_consent_change'));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t p-4 shadow-lg animate-in slide-in-from-bottom-full">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-card-foreground">
          <Cookie className="h-5 w-5 shrink-0 text-primary" />
          <p>
            {t.message}{' '}
            <Link href={`/${lang}/${getSlug('privacy', lang)}`} className="font-semibold text-primary hover:underline">
              {t.policy}.
            </Link>
          </p>
        </div>
        <Button onClick={handleAccept} size="sm" className="shrink-0">{t.accept}</Button>
      </div>
    </div>
  );
}
