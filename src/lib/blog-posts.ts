import { post as voyagePrive } from '@/content/blog/fr/voyage-prive-escapade-reve';
import { post as leclercVoyage } from '@/content/blog/fr/leclerc-voyage-vacances-accessibles';
import { post as carrefourVoyages } from '@/content/blog/fr/carrefour-voyages-bons-plans';
import { post as voyageCreteTui } from '@/content/blog/fr/voyage-crete-tui-experience-inoubliable';
import { post as voyageToutComprisTui } from '@/content/blog/fr/voyage-tout-compris-tui-serenite-absolue';
import { post as voyageEspagneToutComprisTui } from '@/content/blog/fr/voyage-espagne-tout-compris-tui-vacances-reussies';
import { post as coinFlipBlogFr } from '@/content/blog/fr/guide-ultime-pile-ou-face';

import { post as prizeWheelBusiness } from '@/content/blog/en/how-to-use-a-prize-wheel-for-your-business';
import { post as coinFlipBlogEn } from '@/content/blog/en/ultimate-guide-coin-flip';

import { post as ruletaPremiosSocialMedia } from '@/content/blog/es/ruleta-de-premios-para-sorteos-en-redes-sociales';
import { post as coinFlipBlogEs } from '@/content/blog/es/guia-definitiva-cara-o-cruz';

import { post as coinFlipBlogDe } from '@/content/blog/de/ultimativer-leitfaden-kopf-oder-zahl';

import { post as coinFlipBlogPt } from '@/content/blog/pt/guia-definitivo-cara-ou-coroa';


export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  aiHint: string;
  content: string;
  readingTime?: number;
  toc?: { id: string; text: string; level: number }[];
}

const postsData: { [lang: string]: BlogPost[] } = {
  fr: [
    voyagePrive,
    leclercVoyage,
    carrefourVoyages,
    voyageCreteTui,
    voyageToutComprisTui,
    voyageEspagneToutComprisTui,
    coinFlipBlogFr,
  ],
  en: [
    prizeWheelBusiness,
    coinFlipBlogEn,
  ],
  es: [
    ruletaPremiosSocialMedia,
    coinFlipBlogEs,
  ],
  de: [
      coinFlipBlogDe,
  ],
  pt: [
      coinFlipBlogPt,
  ],
};

// Function to slugify text for IDs
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

// Process content to add reading time, TOC, and header IDs
export const processContent = (post: BlogPost): BlogPost => {
    // 1. Calculate Reading Time
    const textOnly = post.content.replace(/<[^>]+>/g, '');
    const wordCount = textOnly.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed

    // 2. Generate TOC and add IDs to headers
    const toc: { id: string; text: string; level: number }[] = [];
    const contentWithIds = post.content.replace(/<h([23]).*?>(.*?)<\/h\1>/g, (match, levelStr, innerText) => {
        const level = parseInt(levelStr, 10);
        const text = innerText.replace(/<[^>]+>/g, ''); // Strip any inner tags like <strong>
        const id = slugify(text);
        
        // Check if an id attribute already exists
        const hasId = /id=".*?"/.test(match);
        if (hasId) return match.replace(/id=".*?"/, `id="${id}"`);

        // Add class for scroll margin and the new id
        const newAttrs = ` id="${id}"`;

        toc.push({ id, text, level });
        return `<h${level}${newAttrs}>${innerText}</h${level}>`;
    });

    return {
        ...post,
        readingTime,
        toc,
        content: contentWithIds,
    };
};


export const getAllPosts = (lang: string): BlogPost[] => {
  const posts = postsData[lang] || []; // Fallback to empty array if no posts for the language
  
  // Sort posts by date in descending order
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
