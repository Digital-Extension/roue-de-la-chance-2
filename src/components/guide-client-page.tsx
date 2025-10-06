
"use client";

import Link from 'next/link';

interface GuideClientPageProps {
  translations: any;
  lang: string;
}

export default function GuideClientPage({ translations, lang }: GuideClientPageProps) {
  const t = translations[lang];

  if (!t) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 lg:px-8">
      <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
        
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: `${t.intro} <a href="/${lang}" class="font-semibold text-primary hover:underline">${t.introLink}</a> ${t.intro2}` }} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.whatIsTitle}</h2>
          <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: `${t.whatIsText} <span class="font-semibold">${t.whatIsText2}</span> ${t.whatIsText3} <span class="font-semibold">${t.whatIsText4}</span> ${t.whatIsText5}` }}/>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.howToTitle}</h2>
          <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: `${t.howToText} <span class="font-semibold">${t.howToText2}</span> ${t.howToText3}`}}/>
          <ul className="list-decimal list-inside space-y-3 text-muted-foreground text-lg pl-4">
            {t.howToSteps.map((step: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: step}}/>)}
          </ul>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.usesTitle}</h2>
           <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: `${t.usesText} <span class="font-semibold">${t.usesText2}</span> ${t.usesText3}`}}/>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground text-lg pl-4">
            <li dangerouslySetInnerHTML={{__html: t.usesItems[0]}}/>
            <li dangerouslySetInnerHTML={{__html: t.usesItems[1]}}/>
            <li dangerouslySetInnerHTML={{__html: `${t.usesItems[2]} <span class="font-semibold">${t.usesItem3Part2}</span> ${t.usesItem3Part3}`}}/>
            <li dangerouslySetInnerHTML={{__html: t.usesItems[3]}}/>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.featuresTitle}</h2>
          <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{__html: t.featuresText}} />
          <ul className="list-disc list-inside space-y-3 text-muted-foreground text-lg pl-4">
             <li dangerouslySetInnerHTML={{__html: `${t.featuresItems[0]} <span class="font-semibold">${t.featureItem1Part2}</span> ${t.featureItem1Part3}`}} />
             <li dangerouslySetInnerHTML={{__html: t.featuresItems[1]}}/>
             <li dangerouslySetInnerHTML={{__html: t.featuresItems[2]}}/>
          </ul>
        </div>

        <div className="text-center pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground/90 font-headline">{t.ctaTitle}</h2>
            <p className="text-muted-foreground text-lg my-4">{t.ctaText}</p>
            <Link href={`/${lang}`} className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
                {t.ctaLink}
            </Link>
        </div>
      </div>
    </div>
  );
}
