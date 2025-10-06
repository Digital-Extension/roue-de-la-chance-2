
export const slugTranslations: { [key: string]: { [lang:string]: string } } = {
  'home': { fr: '', en: '', es: '', de: '', pt: '' },
  'guide': { fr: 'guide-roue-de-la-chance', en: 'guide-spin-wheel-of-chance', es: 'guia-ruleta-de-la-suerte', de: 'anleitung-zufallsrad', pt: 'guia-roda-da-sorte' },
  'faq': { fr: 'faq-roue-de-la-chance', en: 'faq-spin-wheel-of-chance', es: 'faq-ruleta-de-la-suerte', de: 'faq-zufallsrad', pt: 'faq-roda-da-sorte' },
  'privacy': { fr: 'politique-de-confidentialite', en: 'privacy-policy', es: 'politica-de-privacidad', de: 'datenschutzrichtlinie', pt: 'politica-de-privacidade' },
  'library': { fr: 'bibliotheque-de-roues-aleatoires', en: 'random-spin-wheel-library', es: 'biblioteca-de-ruletas-aleatorias', de: 'bibliothek-zufallsraeder', pt: 'biblioteca-de-rodas-da-sorte' },
  'yes-no': { fr: 'roue-de-la-chance-oui-non', en: 'yes-no-spin-wheel', es: 'ruleta-giratoria-si-no', de: 'ja-nein-glucksrad', pt: 'roda-da-sorte-sim-nao' },
  'yes-no-maybe': { fr: 'roue-de-la-chance-oui-non-peut-etre', en: 'yes-no-maybe-spin-wheel', es: 'ruleta-giratoria-si-no-quizas', de: 'ja-nein-vielleicht-glucksrad', pt: 'roda-da-sorte-sim-nao-talvez' },
  'contact': { fr: 'contact-partenariats', en: 'contact-partnerships', es: 'contacto-colaboraciones', de: 'kontakt-partnerschaften', pt: 'contato-parcerias' },
  'western-europe': { fr: 'roue-de-la-chance-europe-ouest', en: 'spin-wheel-western-europe', es: 'ruleta-giratoria-europa-occidental', de: 'westeuropa-glucksrad', pt: 'roda-da-sorte-europa-ocidental' },
  'top-10-countries': { fr: 'roue-de-la-chance-10-pays-visites', en: 'spin-wheel-top-10-visited-countries', es: 'ruleta-giratoria-10-paises-visitados', de: 'top-10-lander-glucksrad', pt: 'roda-da-sorte-10-paises-visitados' },
  'alphabet': { fr: 'roue-de-la-chance-alphabet-a-z', en: 'alphabet-spin-wheel-a-z', es: 'ruleta-giratoria-alfabeto-a-z', de: 'alphabet-glucksrad-a-z', pt: 'roda-da-sorte-alfabeto-a-z' },
  'top-10-action-movies': { fr: 'roue-de-la-chance-films-action', en: 'online-spin-wheel-top-10-action-movies', es: 'ruleta-giratoria-peliculas-accion', de: 'actionfilme-glucksrad', pt: 'roda-da-sorte-filmes-acao' },
  'blog': { fr: 'blog', en: 'blog', es: 'blog', de: 'blog', pt: 'blog' },
  'color-wheel': { fr: 'roue-de-la-chance-couleurs', en: 'color-spin-wheel', es: 'ruleta-giratoria-colores', de: 'farben-glucksrad', pt: 'roda-da-sorte-cores' },
  'coin-flip': { fr: 'pile-ou-face', en: 'coin-flip', es: 'cara-o-cruz', de: 'munzwurf', pt: 'cara-ou-coroa' },
  'dice-roller': { fr: 'de-en-ligne', en: 'online-dice-roller', es: 'dado-en-linea', de: 'online-wurfel', pt: 'dado-online' },
  'whats-new': { fr: 'nouveautes', en: 'whats-new', es: 'novedades', de: 'neuigkeiten', pt: 'novidades' },
  'game-2048': { fr: 'jeu-2048', en: 'game-2048', es: 'juego-2048', de: 'spiel-2048', pt: 'jogo-2048' },
  'coin-flip-dollar': { fr: 'pile-ou-face-dollar', en: 'coin-flip-dollar', es: 'cara-o-cruz-dolar', de: 'muenzwurf-dollar', pt: 'cara-ou-coroa-dolar' },
  'coin-flip-2': { fr: 'pile-ou-face-2-pieces', en: 'coin-flip-2-coins', es: 'cara-o-cruz-2-monedas', de: 'muenzwurf-2-muenzen', pt: 'cara-ou-coroa-2-moedas' },
};

export const getSlug = (key: string, lang: string): string => {
    const validLangs = ['fr', 'en', 'es', 'de', 'pt'];
    const validLang = validLangs.includes(lang) ? lang : 'fr';

    if (slugTranslations[key] && slugTranslations[key][validLang] !== undefined) {
      return slugTranslations[key][validLang];
    }
    
    if (key.startsWith('blog/')) {
        const postSlug = key.split('/')[1];
        return `${postSlug}`;
    }

    return slugTranslations['home'][validLang];
}

export const getSlugKeyFromSlug = (slug: string, lang: string): string | null => {
    const validLangs = ['fr', 'en', 'es', 'de', 'pt'];
    const validLang = validLangs.includes(lang) ? lang : 'fr';

    for (const pageKey in slugTranslations) {
        if (slugTranslations[pageKey][validLang] === slug) {
            return pageKey;
        }
    }
    return null;
}
