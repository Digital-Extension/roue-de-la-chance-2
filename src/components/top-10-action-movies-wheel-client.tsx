
"use client";

import WheelPageClient from "@/components/wheel-page-client";
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Top10ActionMoviesWheelProps {
  translations: any;
  lang: string;
}

const movieColors = [
  "#34495e", "#c0392b", "#f39c12", "#27ae60", "#2980b9",
  "#8e44ad", "#f1c40f", "#d35400", "#7f8c8d", "#16a085"
];

export default function Top10ActionMoviesWheelClient({ translations, lang }: Top10ActionMoviesWheelProps) {
  const t = translations[lang];

  return (
    <>
      <WheelPageClient
        lang={lang}
        translations={t}
        storageKeySuffix="top-10-action-movies"
        initialOptions={t.defaultOptions}
        pageTitle={t.pageTitle}
        pageDescription={t.description}
        showOptionsPanel={true}
        wheelColors={movieColors}
        textColor="#FFFFFF"
        textStrokeColor="#000000"
        segmentFontSize={9}
        textRadiusRatio={0.65}
      />
      <section className="w-full max-w-5xl mx-auto p-4 lg:p-8">
        <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
            <div className="space-y-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider" dangerouslySetInnerHTML={{__html: t.sectionTitle}}/>
                <p className="text-muted-foreground text-lg sm:text-xl mt-2 max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html: t.sectionDescription}}/>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.whatIsTitle}</h3>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{__html: t.whatIsText}}/>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.whyUseTitle}</h3>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{__html: t.whyUseText}}/>
            </div>
            
            <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.howToUseTitle}</h3>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground text-lg pl-4">
                    {t.howToUseSteps.map((step: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: step}}/>)}
                </ul>
            </div>

            <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.ideasTitle}</h3>
                <ul className="list-disc list-inside space-y-4 text-muted-foreground text-lg pl-4">
                    {t.ideasItems.map((item: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: item}}/>)}
                </ul>
            </div>

            <div className="space-y-8 pt-8 border-t border-border">
                <div className="space-y-4 text-center">
                    <h3 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">{t.faqTitle}</h3>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {t.faqItems.map((faq: { q: string, a: string }, index: number) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                            <AccordionTrigger>{faq.q}</AccordionTrigger>
                            <AccordionContent>
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: faq.a.replace(/href='\/[a-z]{2}/g, `href='/${lang}`) }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="text-center pt-8 border-t border-border">
                <h4 className="text-2xl font-bold text-foreground/90 font-headline">{t.ctaTitle}</h4>
                <p className="text-muted-foreground text-lg my-4 max-w-2xl mx-auto" dangerouslySetInnerHTML={{__html: t.ctaText}}>
                </p>
                <div className="text-center pt-8">
                  <Link href={`/${lang}`} className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
                      {t.ctaLink}
                  </Link>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}



