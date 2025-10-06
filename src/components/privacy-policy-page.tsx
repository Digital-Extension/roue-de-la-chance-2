
"use client";

import Link from 'next/link';

interface PrivacyPolicyPageProps {
  translations: any;
  lang: string;
}

export default function PrivacyPolicyPage({ translations, lang }: PrivacyPolicyPageProps) {
  const t = translations[lang];

  if (!t) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 lg:px-8">
      <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
        
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t.lastUpdated}
          </p>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>
            {t.intro}
          </p>
          
          {t.sections.map((section: any, index: number) => (
            <div key={index}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline pt-4">
                {section.title}
              </h2>
              <p>
                {section.content}
              </p>
              {section.points && (
                <ul className="list-disc list-inside space-y-2 pl-4">
                  {section.points.map((point: string, pIndex: number) => (
                    <li key={pIndex} dangerouslySetInnerHTML={{ __html: point }} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="text-center pt-8 border-t border-border">
            <Link href={`/${lang}`} className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
                {t.cta}
            </Link>
        </div>

      </div>
    </div>
  );
}
