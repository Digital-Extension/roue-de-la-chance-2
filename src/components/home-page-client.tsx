
"use client";

import WheelPageClient from "@/components/wheel-page-client";
import type { Translations } from "@/components/wheel-page-client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Zap, SlidersHorizontal, Gift, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { getSlug } from "@/lib/slugs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from 'next/image';
import { useRef } from 'react';
import QuizSection from './quiz-section';

interface HomePageClientProps {
  lang: string;
  t: any;
}

export default function HomePageClient({ lang, t }: HomePageClientProps) {
  const customizationClickHandler = useRef<() => void>();

  const setCustomizationClickHandler = (handler: () => void) => {
    customizationClickHandler.current = handler;
  };
  
  const handleCardClick = () => {
    const wheelSection = document.getElementById('wheel-section');
    if (wheelSection) {
        wheelSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (customizationClickHandler.current) {
        customizationClickHandler.current();
    }
  };

  const wheelTranslations: Translations = {
    storageWarning: t.storageWarning,
    spinButton: t.spinButton,
    customizeTooltip: t.customizeTooltip,
    shuffleTooltip: t.shuffleTooltip,
    resultsTooltip: t.resultsTooltip,
    hideTooltip: t.hideTooltip,
    showTooltip: t.showTooltip,
    openPanelToCustomizeTitle: t.openPanelToCustomizeTitle,
    openPanelToCustomizeDescription: t.openPanelToCustomizeDescription,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t.title,
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    description: t.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1357',
    },
    softwareHelp: {
      '@type': 'CreativeWork',
      url: `/${lang}/${getSlug('guide', lang)}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WheelPageClient
        lang={lang}
        translations={wheelTranslations}
        storageKeySuffix="home"
        initialOptions={t.defaultOptions}
        pageTitle={t.pageTitle}
        pageDescription={t.pageDescription}
        showOptionsPanel={true}
        setCustomizationClickHandler={setCustomizationClickHandler}
      />

      <section className="w-full max-w-7xl mx-auto p-4 lg:p-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
                {t.whyUseTitle}
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl mt-2 max-w-3xl mx-auto">
                {t.whyUseDescription}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 shadow-lg">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Zap className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="font-headline text-2xl">{t.feature1Title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                      {t.feature1Description}
                  </CardDescription>
                </CardContent>
            </Card>
            <Card className="text-center p-6 border-2 shadow-lg cursor-pointer hover:border-primary/50 hover:shadow-2xl transition-all" onClick={handleCardClick}>
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <SlidersHorizontal className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="font-headline text-2xl">{t.feature2Title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                      {t.feature2Description}
                  </CardDescription>
                </CardContent>
            </Card>
            <Card className="text-center p-6 border-2 shadow-lg">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Gift className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="font-headline text-2xl">{t.feature3Title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                      {t.feature3Description}
                  </CardDescription>
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto p-4 lg:p-8">
        <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
            {t.discoverTitle}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.discoverDescription}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.whatIsTitle}</h3>
          <p className="text-muted-foreground text-lg">
            {t.whatIsDescription}
          </p>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.howToTitle}</h3>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground text-lg">
            {t.howToSteps.map((item: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: item}}/>)}
          </ul>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.unlimitedUsesTitle}</h3>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground text-lg">
            {t.unlimitedUsesItems.map((item: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: item}}/>)}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline">{t.multipleWheelsPowerTitle}</h3>
          <p className="text-muted-foreground text-lg">
            {t.multipleWheelsPowerDescription}
          </p>
          <h4 className="text-xl sm:text-2xl font-semibold text-foreground/70">{t.examplesTitle}</h4>
           <ul className="list-disc list-inside space-y-3 text-muted-foreground text-lg">
             {t.examplesItems.map((item: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: item}}/>)}
          </ul>
        </div>
        
        <div className="text-center pt-8">
            <Link href={`/${lang}`} className="text-xl font-bold text-primary hover:underline transition-colors">
                {t.ctaLink}
            </Link>
            <p className="text-muted-foreground text-lg mt-2">{t.ctaDescription}</p>
        </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto p-4 lg:p-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
                {t.libraryTitle}
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl mt-2 max-w-3xl mx-auto">
                {t.libraryDescription}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.libraryWheels.map((wheel: any) => (
              <Link href={`/${lang}/${getSlug(wheel.slugKey, lang)}`} key={wheel.slugKey} className="group block">
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <Image
                      src={wheel.image}
                      alt={wheel.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={wheel.aiHint}
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <h3 className="font-headline text-xl sm:text-2xl mb-2 group-hover:text-primary">{wheel.title}</h3>
                    <CardDescription className="text-base text-muted-foreground">
                      {wheel.description}
                    </CardDescription>
                  </CardContent>
                  <CardContent className="p-6 pt-0">
                      <div className="flex items-center text-primary font-semibold">
                          {t.libraryLaunch}
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
         <div className="text-center mt-12">
            <Link href={`/${lang}/${getSlug('library', lang)}`} className="text-lg font-bold text-primary hover:underline transition-colors">
                {t.librarySeeAll}
            </Link>
        </div>
      </section>
      
      <section className="w-full max-w-5xl mx-auto p-4 lg:p-8">
        <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
              {t.faqTitle}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.faqDescription}
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {t.faqItems.map((item: {q: string, a: string}, index: number) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>
                   <div dangerouslySetInnerHTML={{__html: item.a.replace('/fr', `/${lang}`).replace('/en', `/${lang}`).replace('/es', `/${lang}`).replace('/de', `/${lang}`).replace('/pt', `/${lang}`)}} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           <div className="text-center pt-4 border-b pb-8 mb-8">
              <Link href={`/${lang}/${getSlug('faq', lang)}`} className="text-primary hover:underline font-medium">
                {t.faqSeeAll}
              </Link>
           </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground/90 font-headline">{t.ctaTitle}</h2>
                <p className="text-muted-foreground text-lg my-4">{t.ctaDescription}</p>
                <Link href={`/${lang}`} className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
                    {t.ctaLink}
                </Link>
            </div>
        </div>
      </section>
      
      <QuizSection t={t} />

    </>
  );
}
