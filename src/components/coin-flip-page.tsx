
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dices, History, RotateCw, Volume2, VolumeX } from 'lucide-react';
import CoinFlipResultModal from './coin-flip-result-modal';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const COIN_FLIP_SOUND = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/09/coin-flip.mp3";

interface CoinFlipPageProps {
  translations: any;
  lang: string;
}

export default function CoinFlipPage({ translations, lang }: CoinFlipPageProps) {
  const t = translations[lang];

  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [headsCount, setHeadsCount] = useLocalStorage(`coinflip-heads-${lang}`, 0);
  const [tailsCount, setTailsCount] = useLocalStorage(`coinflip-tails-${lang}`, 0);
  const [rotation, setRotation] = useState(0);
  const [spinDuration, setSpinDuration] = useState(3000);
  const [isSoundOn, setIsSoundOn] = useLocalStorage('coinflip-sound-on', true);
  const [isMounted, setIsMounted] = useState(false);
  const coinFlipAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const preloadAudio = () => {
      if (typeof window !== "undefined") {
        if (!coinFlipAudioRef.current) {
          coinFlipAudioRef.current = new Audio(COIN_FLIP_SOUND);
          coinFlipAudioRef.current.preload = 'auto';
        }
        document.removeEventListener('click', preloadAudio);
        document.removeEventListener('touchstart', preloadAudio);
      }
    };

    document.addEventListener('click', preloadAudio);
    document.addEventListener('touchstart', preloadAudio);

    return () => {
      document.removeEventListener('click', preloadAudio);
      document.removeEventListener('touchstart', preloadAudio);
    };
  }, []);
  
  const handleFlip = () => {
    if (isFlipping) return;

    if (isSoundOn && coinFlipAudioRef.current) {
        coinFlipAudioRef.current.currentTime = 0;
        coinFlipAudioRef.current.play().catch(e => console.error("Error playing coin flip sound:", e));
    }

    setIsFlipping(true);
    setResult(null);

    const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
    const randomDuration = Math.floor(Math.random() * 1000) + 2500;

    // Calculate a new absolute rotation
    const newSpins = Math.floor(Math.random() * 5) + 8; // 8 to 12 full spins
    let finalRotation = rotation + (newSpins * 360);
    
    // Ensure the final resting face is correct
    if (randomResult === 'tails') {
        // If current rotation is even (ends on heads), add 180 to land on tails
        if (Math.round(finalRotation / 180) % 2 === 0) {
            finalRotation += 180;
        }
    } else { // heads
        // If current rotation is odd (ends on tails), add 180 to land on heads
        if (Math.round(finalRotation / 180) % 2 !== 0) {
            finalRotation += 180;
        }
    }
    
    setSpinDuration(randomDuration);
    setRotation(finalRotation);
    
    setTimeout(() => {
      setResult(randomResult);
      if (randomResult === 'heads') {
        setHeadsCount(prev => prev + 1);
      } else {
        setTailsCount(prev => prev + 1);
      }
      setIsFlipping(false);
    }, randomDuration); 
  };

  const resetCounts = () => {
    setHeadsCount(0);
    setTailsCount(0);
  }
  
  const handleFlipAgain = () => {
    setResult(null);
    handleFlip();
  }

  const totalFlips = headsCount + tailsCount;

  return (
    <>
      <div className="w-full max-w-5xl mx-auto py-12 px-4 lg:p-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground/90 font-headline tracking-wider">{t.title}</h1>
            <p className="text-muted-foreground text-lg sm:text-xl mt-2">{t.description}</p>
          </div>
        <div className="coin-flip-container flex flex-col items-center gap-8">
          
          <div className="w-64 h-64 perspective-1000">
            <div
              className="coin relative w-full h-full transform-style-3d"
              style={{ 
                transform: `rotateX(${rotation}deg)`,
                transition: isFlipping ? `transform ${spinDuration}ms ease-out` : 'none',
              }}
            >
              <div className="face absolute w-full h-full backface-hidden rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg border-4 border-yellow-600">
                <span className="text-4xl font-bold text-yellow-800/80">{t.heads}</span>
              </div>
              <div className="face absolute w-full h-full backface-hidden rounded-full flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-500 shadow-lg border-4 border-slate-600 transform-rotate-x-180">
                <span className="text-4xl font-bold text-slate-800/80">{t.tails}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <Button onClick={handleFlip} disabled={isFlipping} size="lg" className="w-full py-7 text-xl font-bold">
              <Dices className="mr-3 h-6 w-6" />
              {isFlipping ? t.flippingText : t.buttonText}
            </Button>
          </div>

          <div className="relative w-full max-w-sm">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button 
                            onClick={() => setIsSoundOn(!isSoundOn)} 
                            variant="outline" 
                            size="icon" 
                            className="absolute -top-4 right-0 z-10 h-10 w-10"
                        >
                            {isSoundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isSoundOn ? "Couper le son" : "Activer le son"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between font-headline">
                      <div className="flex items-center gap-2">
                        <History className="h-5 w-5 text-primary"/>
                        {t.historyTitle}
                      </div>
                      <Button variant="ghost" size="icon" onClick={resetCounts} className="h-8 w-8" aria-label={t.resetTooltip}>
                        <RotateCw className="h-4 w-4"/>
                      </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-around text-center text-lg">
                    <div>
                        <p className="font-bold text-3xl">{isMounted ? headsCount : 0}</p>
                        <p className="text-muted-foreground">{t.heads}</p>
                    </div>
                    <div>
                        <p className="font-bold text-3xl">{isMounted ? tailsCount : 0}</p>
                        <p className="text-muted-foreground">{t.tails}</p>
                    </div>
                </CardContent>
                {isMounted && totalFlips > 0 && (
                  <CardFooter className="flex-col items-center gap-2 pt-4 border-t text-center">
                      <div className="text-muted-foreground">{t.totalFlips}:</div>
                      <div className="text-4xl font-bold text-accent">{totalFlips}</div>
                  </CardFooter>
                )}
            </Card>
          </div>
        </div>

        <CoinFlipResultModal 
            lang={lang}
            result={result} 
            onFlipAgain={handleFlipAgain}
            onClearResult={() => setResult(null)} 
            isSoundOn={isSoundOn}
          />
      </div>

      <section className="w-full max-w-5xl mx-auto p-4 lg:p-8">
        <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="font-headline" dangerouslySetInnerHTML={{ __html: t.seo.title }} />
              <p dangerouslySetInnerHTML={{ __html: t.seo.intro }} />
              <hr />
              <h3 className="font-headline" dangerouslySetInnerHTML={{ __html: t.seo.howItWorksTitle }} />
              <p dangerouslySetInnerHTML={{ __html: t.seo.howItWorksText }} />
              <ul className="list-disc list-inside">
                {t.seo.howItWorksItems.map((item: string, index: number) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
              </ul>
              <p dangerouslySetInnerHTML={{ __html: t.seo.howItWorksConclusion }} />
              <hr />
              <h3 className="font-headline" dangerouslySetInnerHTML={{ __html: t.seo.multiplayerTitle }} />
              <p dangerouslySetInnerHTML={{ __html: t.seo.multiplayerText }} />
              <blockquote dangerouslySetInnerHTML={{ __html: t.seo.multiplayerExample.replace('/fr', `/${lang}`) }} />
              <hr />
              <h3 className="font-headline" dangerouslySetInnerHTML={{ __html: t.seo.didYouKnowTitle }} />
              <p dangerouslySetInnerHTML={{ __html: t.seo.didYouKnowText }} />
              <hr />
              <h3 className="font-headline" dangerouslySetInnerHTML={{ __html: t.seo.historyTitle }} />
              <p dangerouslySetInnerHTML={{ __html: t.seo.historyText1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.seo.historyText2 }} />
          </div>

          <div className="space-y-8 pt-8 border-t border-border">
              <div className="space-y-4 text-center">
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">{t.faq.title}</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                  {t.faq.items.map((faq: { q: string, a: string }, index: number) => (
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
              <p className="text-muted-foreground text-lg my-4 max-w-2xl mx-auto">
                  {t.ctaText}
              </p>
              <div className="text-center pt-4">
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
