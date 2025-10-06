
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'digitalextension.fr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avisclients.digitalextension.fr',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      // === ENGLISH REDIRECTS (en) ===
      { source: '/en/guide-wheel-of-chance', destination: '/en/guide-spin-wheel-of-chance', permanent: true },
      { source: '/en/faq-wheel-of-chance', destination: '/en/faq-spin-wheel-of-chance', permanent: true },
      { source: '/en/random-wheel-library', destination: '/en/random-spin-wheel-library', permanent: true },
      { source: '/en/yes-no-wheel', destination: '/en/yes-no-spin-wheel', permanent: true },
      { source: '/en/yes-no-maybe-wheel', destination: '/en/yes-no-maybe-spin-wheel', permanent: true },
      { source: '/en/alphabet-wheel-a-z', destination: '/en/alphabet-spin-wheel-a-z', permanent: true },
      { source: '/en/online-wheel-top-10-action-movies', destination: '/en/online-spin-wheel-top-10-action-movies', permanent: true },
      { source: '/en/color-wheel', destination: '/en/color-spin-wheel', permanent: true },
      { source: '/en/western-europe-wheel', destination: '/en/spin-wheel-western-europe', permanent: true },
      { source: '/en/top-10-countries-wheel', destination: '/en/spin-wheel-top-10-visited-countries', permanent: true },
      
      // === FRENCH REDIRECTS (fr) ===
      { source: '/fr/roue-oui-non', destination: '/fr/roue-de-la-chance-oui-non', permanent: true },
      { source: '/fr/roue-oui-non-peut-etre', destination: '/fr/roue-de-la-chance-oui-non-peut-etre', permanent: true },
      { source: '/fr/roue-alphabet-a-z', destination: '/fr/roue-de-la-chance-alphabet-a-z', permanent: true },
      { source: '/fr/roue-des-couleurs', destination: '/fr/roue-de-la-chance-couleurs', permanent: true },
      { source: '/fr/roue-europe-ouest', destination: '/fr/roue-de-la-chance-europe-ouest', permanent: true },
      { source: '/fr/roue-10-pays-visites', destination: '/fr/roue-de-la-chance-10-pays-visites', permanent: true },
      { source: '/fr/roue-top-10-films-action', destination: '/fr/roue-de-la-chance-films-action', permanent: true },

      // === SPANISH REDIRECTS (es) ===
      { source: '/es/ruleta-si-no', destination: '/es/ruleta-giratoria-si-no', permanent: true },
      { source: '/es/ruleta-si-no-quizas', destination: '/es/ruleta-giratoria-si-no-quizas', permanent: true },
      { source: '/es/ruleta-alfabeto-a-z', destination: '/es/ruleta-giratoria-alfabeto-a-z', permanent: true },
      { source: '/es/ruleta-de-colores', destination: '/es/ruleta-giratoria-colores', permanent: true },
      { source: '/es/ruleta-de-la-suerte-europa-occidental', destination: '/es/ruleta-giratoria-europa-occidental', permanent: true },
      { source: '/es/ruleta-de-la-suerte-10-paises-visitados', destination: '/es/ruleta-giratoria-10-paises-visitados', permanent: true },
      { source: '/es/ruleta-en-linea-top-10-peliculas-accion', destination: '/es/ruleta-giratoria-peliculas-accion', permanent: true },
      { source: '/es/ruleta-de-la-suerte-si-no', destination: '/es/ruleta-giratoria-si-no', permanent: true },
      { source: '/es/ruleta-giratoria', destination: '/es', permanent: true },
      
      // === GERMAN REDIRECTS (de) ===
      { source: '/de/ja-nein-rad', destination: '/de/ja-nein-glucksrad', permanent: true },
      { source: '/de/ja-nein-vielleicht-rad', destination: '/de/ja-nein-vielleicht-glucksrad', permanent: true },
      { source: '/de/alphabet-rad-a-z', destination: '/de/alphabet-glucksrad-a-z', permanent: true },
      { source: '/de/farbrad', destination: '/de/farben-glucksrad', permanent: true },
      { source: '/de/zufallsrad-westeuropa', destination: '/de/westeuropa-glucksrad', permanent: true },
      { source: '/de/zufallsrad-top-10-besuchte-lander', destination: '/de/top-10-lander-glucksrad', permanent: true },
      { source: '/de/online-rad-top-10-actionfilme', destination: '/de/actionfilme-glucksrad', permanent: true },
      { source: '/de/münzwurf', destination: '/de/munzwurf', permanent: true },

      // === PORTUGUESE REDIRECTS (pt) ===
      { source: '/pt/roda-sim-nao', destination: '/pt/roda-da-sorte-sim-nao', permanent: true },
      { source: '/pt/roda-sim-nao-talvez', destination: '/pt/roda-da-sorte-sim-nao-talvez', permanent: true },
      { source: '/pt/roda-alfabeto-a-z', destination: '/pt/roda-da-sorte-alfabeto-a-z', permanent: true },
      { source: '/pt/roda-das-cores', destination: '/pt/roda-da-sorte-cores', permanent: true },
      { source: '/pt/roda-online-top-10-filmes-acao', destination: '/pt/roda-da-sorte-filmes-acao', permanent: true },
      { source: '/pt/roda-da-sorte-europa-ocidental', destination: '/pt/roda-da-sorte-europa-ocidental', permanent: false },
      { source: '/pt/politica-de-privacidade-old', destination: '/pt/politica-de-privacidade', permanent: true },
      { source: '/pt/roda-da-sorte', destination: '/pt', permanent: true },
    ]
  },
};

export default nextConfig;
