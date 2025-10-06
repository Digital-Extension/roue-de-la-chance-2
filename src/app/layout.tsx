
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import ScrollToTopButton from '@/components/scroll-to-top-button';
import CookieConsentBanner from '@/components/cookie-consent-banner';
import Script from 'next/script';

const SITE_URL = 'https://larouedelachance.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Roue de la Chance | Roulette Aléatoire & Personnalisable",
    template: `%s`,
  },
  description: "Créez votre roue de la chance personnalisable en ligne ! Notre roue du hasard 100% gratuite est l'outil parfait pour vos tirages au sort (choisir des noms, des couleurs) ou pour prendre une décision (Oui ou Non ?). Lancez cette roulette aléatoire et créez votre propre roue de la chance dès maintenant !",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'fr': `${SITE_URL}/fr`,
      'en': `${SITE_URL}/en`,
      'es': `${SITE_URL}/es`,
      'de': `${SITE_URL}/de`,
      'pt': `${SITE_URL}/pt`,
      'x-default': `${SITE_URL}/fr`,
    },
  },
  openGraph: {
    title: 'Roue de la Chance | Roulette en Ligne Gratuite et Personnalisable',
    description: "Créez votre roue de la chance personnalisable en ligne ! Notre roue du hasard 100% gratuite est l'outil parfait pour vos tirages au sort (choisir des noms, des couleurs) ou pour prendre une décision (Oui ou Non ?). Lancez cette roulette aléatoire et créez votre propre roue dès maintenant !",
    url: '/',
    siteName: 'La Roue De La Chance',
    images: [
      {
        url: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/09/roue-de-la-chance-aleatoire-personnalisable-hasard.png',
        width: 1200,
        height: 630,
        alt: 'Roue de la Chance en ligne',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'Roue de la Chance | Roulette en Ligne Gratuite et Personnalisable',
    description: "Créez votre roue de la chance personnalisable en ligne ! Notre roue du hasard 100% gratuite est l'outil parfait pour vos tirages au sort (choisir des noms, des couleurs) ou pour prendre une décision (Oui ou Non ?). Lancez cette roulette aléatoire et créez votre propre roue dès maintenant !",
    images: ['https://avisclients.digitalextension.fr/wp-content/uploads/2025/09/roue-de-la-chance-aleatoire-personnalisable-hasard.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'La Roue De La Chance',
    url: SITE_URL,
    logo: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/09/roue-de-la-chance-aleatoire-personnalisable-hasard.png',
    sameAs: [], 
  };

  const faviconUrl = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/Favicon-Roue-de-la-chance.ico";

  const clarityScript = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "si6y2u9va9");
  `;

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="hrLygSzdlIi_3Avl9hYj-8jj1Rl2GR-fQGXezEEwIlY" />
        
        <link rel="icon" href={faviconUrl} type="image/x-icon" sizes="any" />
        <link rel="shortcut icon" href={faviconUrl} type="image/x-icon" />
        <link rel="apple-touch-icon" href={faviconUrl} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: clarityScript }} />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background">
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-74BC3VZFC5"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-74BC3VZFC5');
          `}
        </Script>
        {children}
        <Toaster />
        <ScrollToTopButton />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
