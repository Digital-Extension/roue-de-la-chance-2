
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Dices } from "lucide-react";
import { getSlug } from '@/lib/slugs';
import { Button } from './ui/button';

interface LibraryClientPageProps {
  translations: any;
  lang: string;
}

export default function LibraryClientPage({ translations, lang }: LibraryClientPageProps) {
  const t = translations[lang];

  if (!t) {
    return null; // or a loading state
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground/90 font-headline tracking-wider">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl mt-2 max-w-3xl mx-auto">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.wheels.map((wheel: any) => (
          <Link href={`/${lang}/${getSlug(wheel.slugKey, lang)}`} key={wheel.slugKey} className="group block">
            <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1">
              <CardHeader className="p-0">
                {wheel.image && (
                  <Image
                    src={wheel.image}
                    alt={wheel.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={wheel.aiHint}
                  />
                )}
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <h2 className="font-headline text-xl sm:text-2xl mb-2">{wheel.title}</h2>
                <CardDescription className="text-base text-muted-foreground">
                  {wheel.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 justify-start">
                <div className="flex items-center text-primary font-semibold">
                    {t.launchWheel}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
         {/* Placeholder for future wheels */}
        <Card className="h-full flex items-center justify-center border-dashed border-2 bg-muted/40">
            <div className="text-center text-muted-foreground">
                <p className="font-semibold">{t.comingSoon}</p>
                <p className="text-sm">{t.newWheels}</p>
            </div>
        </Card>
      </div>

      <section className="w-full max-w-5xl mx-auto p-4 lg:p-8 mt-12">
        <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider" dangerouslySetInnerHTML={{__html: t.seo.title}} />
            <p className="text-muted-foreground text-lg sm:text-xl mt-2 max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html: t.seo.description}} />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline" dangerouslySetInnerHTML={{__html: t.seo.whatIsTitle}} />
            <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{__html: t.seo.whatIsText.replace('/fr', `/${lang}`).replace('/en', `/${lang}`).replace('/es', `/${lang}`).replace('/de', `/${lang}`).replace('/pt', `/${lang}`)}} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground/80 font-headline" dangerouslySetInnerHTML={{__html: t.seo.whyUseTitle}} />
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-lg pl-4">
              {t.seo.whyUseItems.map((item: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: item}}/>)}
            </ul>
          </div>

          <div className="text-center pt-8 border-t border-border">
            <h4 className="text-2xl font-bold text-foreground/90 font-headline" dangerouslySetInnerHTML={{__html: t.seo.ctaTitle}} />
            <p className="text-muted-foreground text-lg my-4 max-w-2xl mx-auto" dangerouslySetInnerHTML={{__html: t.seo.ctaText}} />
            <Button asChild size="lg">
              <Link href={`/${lang}`}>
                  <Dices className="mr-2 h-5 w-5" />
                  {t.seo.ctaLink}
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
