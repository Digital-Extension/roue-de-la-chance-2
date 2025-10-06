
"use client";

import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { getSlug } from '@/lib/slugs';
import { translations as whatsNewTranslations } from '@/content/pages/whats-new';
import { Dices, Gamepad2, Copy, DollarSign, Palette, Text, Film, Globe, Map, ExternalLink, LayoutGrid } from 'lucide-react';
import { Button } from './ui/button';

interface WhatsNewPageProps {
  lang: string;
}

const iconMap: { [key: string]: React.ElementType } = {
    'dice-roller': Dices,
    'coin-flip': Copy,
    'coin-flip-dollar': DollarSign,
    'game-2048': LayoutGrid,
    'color-wheel': Palette,
    'alphabet': Text,
    'yes-no': Dices,
    'yes-no-maybe': Dices,
    'top-10-action-movies': Film,
    'top-10-countries': Globe,
    'western-europe': Map,
    'default': Dices,
};

export default function WhatsNewPage({ lang }: WhatsNewPageProps) {
  const t = (whatsNewTranslations as any)[lang];
  
  const tools = [...t.tools];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground/90 font-headline tracking-wider">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl mt-2 max-w-3xl mx-auto">
          {t.description}
        </p>
      </div>

      <div className="space-y-6">
        {tools.map((tool: any, index: number) => {
            const Icon = iconMap[tool.slugKey] || iconMap['default'];
            const isExternal = !!tool.url;
            const href = isExternal ? tool.url : `/${lang}/${getSlug(tool.slugKey, lang)}`;

            return (
                <Link href={href} 
                      target={isExternal ? '_blank' : '_self'}
                      rel={isExternal ? 'noopener noreferrer' : ''}
                      key={index} 
                      className="block group">
                    <Card className="hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-6 flex items-start gap-6">
                             <div className="bg-primary/10 p-3 rounded-lg mt-1">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-headline text-xl font-semibold mb-1 group-hover:text-primary flex items-center gap-2">
                                    {tool.title}
                                    {isExternal && <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />}
                                </h2>
                                <p className="text-xs text-muted-foreground font-semibold mb-2">{tool.date}</p>
                                <p className="text-muted-foreground">
                                    {tool.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            )
        })}
      </div>
      
      <div className="text-center mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold text-foreground/90 font-headline">{t.ctaTitle}</h2>
        <p className="text-muted-foreground text-lg my-4 max-w-2xl mx-auto">
            {t.ctaText}
        </p>
        <Button asChild size="lg">
            <Link href={`/${lang}`}>
                <Dices className="mr-2 h-5 w-5" />
                {t.ctaLink}
            </Link>
        </Button>
      </div>
    </div>
  );
}
