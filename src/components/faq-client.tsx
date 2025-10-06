
'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

interface FaqClientPageProps {
  translations: any;
  lang: string;
}

export default function FaqClientPage({ translations, lang }: FaqClientPageProps) {
  const t = translations[lang];
  
  if (!t) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((faq: { q: string, a: string }) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a.replace(/<[^>]*>?/gm, ''), // Remove HTML tags for plain text answer
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-5xl mx-auto py-12 px-4 lg:px-8">
        <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
          
          <div className="space-y-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.description}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {t.faqs.map((faq: {q: string, a: string}, index: number) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: faq.a.replace(/href='\/[a-z]{2}/, `href='/${lang}`) }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground/90 font-headline">{t.ctaTitle}</h2>
              <p className="text-muted-foreground text-lg my-4">{t.ctaDescription}</p>
              <Link href={`/${lang}`} className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
                  {t.ctaLink}
              </Link>
          </div>

        </div>
      </div>
    </>
  );
}
