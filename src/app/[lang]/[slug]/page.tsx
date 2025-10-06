
import { notFound } from 'next/navigation';
import { getSlugKeyFromSlug, slugTranslations } from '@/lib/slugs';
import type { Metadata } from 'next';
import { getAllPosts, processContent } from '@/lib/blog-posts';

import GuideClientPage from '@/components/guide-client-page';
import FaqClientPage from '@/components/faq-client';
import PrivacyPolicyPage from '@/components/privacy-policy-page';
import LibraryClientPage from '@/components/library-client-page';
import ContactPage from '@/components/contact-page';
import WesternEuropeWheelClient from '@/components/western-europe-wheel-client';
import Top10CountriesWheelClient from '@/components/top-10-countries-wheel-client';
import BlogPage from '@/components/blog-page';
import BlogPostPage from '@/components/blog-post-page';
import YesNoPage from '@/components/yes-no-page';
import AlphabetWheelClient from '@/components/alphabet-wheel-client';
import YesNoMaybeWheelClient from '@/components/yes-no-maybe-wheel-client';
import Top10ActionMoviesWheelClient from '@/components/top-10-action-movies-wheel-client';
import ColorWheelClient from '@/components/color-wheel-client';
import CoinFlipPage from '@/components/coin-flip-page';
import DiceRollerPage from '@/components/dice-roller-page';
import WhatsNewPage from '@/components/whats-new-page';

import { translations as guideTranslations } from '@/content/pages/guide';
import { translations as faqTranslations } from '@/content/pages/faq';
import { translations as privacyTranslations } from '@/content/pages/privacy';
import { translations as libraryTranslations } from '@/content/pages/library';
import { translations as contactTranslations } from '@/content/pages/contact';
import { translations as westernEuropeTranslations } from '@/content/pages/western-europe';
import { translations as top10CountriesTranslations } from '@/content/pages/top-10-countries';
import { translations as yesNoTranslations } from '@/content/pages/yes-no';
import { translations as yesNoMaybeTranslations } from '@/content/pages/yes-no-maybe';
import { translations as alphabetTranslations } from '@/content/pages/alphabet';
import { translations as top10MoviesTranslations } from '@/content/pages/top-10-action-movies';
import { translations as colorWheelTranslations } from '@/content/pages/color-wheel';
import { translations as blogTranslations } from '@/content/pages/blog';
import { translations as coinFlipTranslations } from '@/content/pages/coin-flip';
import { translations as diceRollerTranslations } from '@/content/pages/dice-roller';
import { translations as whatsNewTranslations } from '@/content/pages/whats-new';

type Props = {
  params: { lang: string, slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const pageTranslations: { [key: string]: any } = {
  'guide': guideTranslations,
  'faq': faqTranslations,
  'privacy': privacyTranslations,
  'library': libraryTranslations,
  'contact': contactTranslations,
  'western-europe': westernEuropeTranslations,
  'top-10-countries': top10CountriesTranslations,
  'yes-no': yesNoTranslations,
  'yes-no-maybe': yesNoMaybeTranslations,
  'alphabet': alphabetTranslations,
  'top-10-action-movies': top10MoviesTranslations,
  'color-wheel': colorWheelTranslations,
  'blog': blogTranslations,
  'coin-flip': coinFlipTranslations,
  'dice-roller': diceRollerTranslations,
  'whats-new': whatsNewTranslations,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = params;
  const slugKey = getSlugKeyFromSlug(slug, lang);

  if (slugKey && pageTranslations[slugKey] && pageTranslations[slugKey][lang]) {
    const t = pageTranslations[slugKey][lang];
    const pageUrl = `/${lang}/${slug}`;
    const ogImage = t.ogImage;

    const ogImages = ogImage ? [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: t.metaTitle,
    }] : undefined;

    return {
      title: t.metaTitle,
      description: t.metaDescription,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: t.metaTitle,
        description: t.metaDescription,
        url: pageUrl,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: t.metaTitle,
        description: t.metaDescription,
        images: ogImage ? [ogImage] : undefined,
      }
    };
  }

  const post = getAllPosts(lang).find((p) => p.slug === slug);
  if (post) {
      const pageUrl = `/${lang}/${post.slug}`;
      const ogImages = post.image ? [{
          url: post.image,
          width: 1200,
          height: 600,
          alt: post.title,
      }] : undefined;

      return {
          title: post.title,
          description: post.description,
          alternates: {
            canonical: pageUrl,
          },
          openGraph: {
            title: post.title,
            description: post.description,
            url: pageUrl,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: ogImages,
          },
          twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: ogImages ? [post.image] : undefined,
          }
      };
  }

  return {};
}

export default function GenericPage({ params, searchParams }: Props) {
  const { lang, slug } = params;
  const slugKey = getSlugKeyFromSlug(slug, lang);
  const allPosts = getAllPosts(lang);
  const post = allPosts.find((p) => p.slug === slug);

  if (post) {
      const processedPost = processContent(post);
      return <BlogPostPage lang={lang} post={processedPost} allPosts={allPosts} />;
  }
  
  if (!slugKey || !pageTranslations[slugKey] || !pageTranslations[slugKey][lang]) {
    notFound();
  }
  
  switch (slugKey) {
    case 'guide':
      return <GuideClientPage translations={guideTranslations} lang={lang} />;
    case 'faq':
      return <FaqClientPage translations={faqTranslations} lang={lang} />;
    case 'privacy':
      return <PrivacyPolicyPage translations={privacyTranslations} lang={lang} />;
    case 'library':
      return <LibraryClientPage translations={libraryTranslations} lang={lang} />;
    case 'contact':
      return <ContactPage translations={contactTranslations} lang={lang} />;
    case 'western-europe':
        return <WesternEuropeWheelClient translations={westernEuropeTranslations} lang={lang} />;
    case 'top-10-countries':
        return <Top10CountriesWheelClient translations={top10CountriesTranslations} lang={lang} />;
    case 'yes-no':
        return <YesNoPage translations={yesNoTranslations} lang={lang} />;
    case 'yes-no-maybe':
        return <YesNoMaybeWheelClient translations={yesNoMaybeTranslations} lang={lang} />;
    case 'alphabet':
        return <AlphabetWheelClient translations={alphabetTranslations} lang={lang} />;
    case 'top-10-action-movies':
        return <Top10ActionMoviesWheelClient translations={top10MoviesTranslations} lang={lang} />;
    case 'color-wheel':
        return <ColorWheelClient translations={colorWheelTranslations} lang={lang} />;
    case 'coin-flip':
        return <CoinFlipPage translations={coinFlipTranslations} lang={lang} />;
    case 'dice-roller':
        return <DiceRollerPage translations={diceRollerTranslations} lang={lang} />;
    case 'whats-new':
        return <WhatsNewPage lang={lang} />;
    case 'blog':
        const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
        return <BlogPage lang={lang} currentPage={page} />;
    default:
      notFound();
  }
}

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];
    const langs = ['fr', 'en', 'es', 'de', 'pt'];
    
    const excludedKeys = ['home'];
    for (const key in slugTranslations) {
        if (excludedKeys.includes(key)) continue;
        for (const lang of langs) {
            if (slugTranslations[key] && slugTranslations[key][lang] !== undefined) {
              params.push({ lang, slug: slugTranslations[key][lang] });
            }
        }
    }

    for (const lang of langs) {
        const posts = getAllPosts(lang);
        for (const post of posts) {
            params.push({ lang, slug: post.slug });
        }
    }

    return params;
}
