
"use client";

import { useState, CSSProperties, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dices, History, RotateCw, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import DiceRollerResultModal from './dice-roller-result-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const DICE_ROLL_SOUND = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/09/de-en-ligne.mp3";

interface DiceRollerPageProps {
  translations: any;
  lang: string;
}

const initialRotation = { x: -20, y: 35, z: -15 };

const resultRotations: { [key: number]: { x: number, y: number } } = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: -90, y: 0 },
  4: { x: 90, y: 0 },
  5: { x: 0, y: 90 },
  6: { x: 0, y: 180 },
};

export default function DiceRollerPage({ translations, lang }: DiceRollerPageProps) {
  const t = translations[lang];

  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useLocalStorage<number[]>(`diceroll-history-${lang}`, []);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(initialRotation);
  const [isInitialState, setIsInitialState] = useState(true);
  const [isSoundOn, setIsSoundOn] = useLocalStorage('diceroll-sound-on', true);
  const [isMounted, setIsMounted] = useState(false);
  const diceRollAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Preload audio on first user interaction to bypass mobile autoplay restrictions
    const preloadAudio = () => {
      if (typeof window !== "undefined") {
        if (!diceRollAudioRef.current) {
          diceRollAudioRef.current = new Audio(DICE_ROLL_SOUND);
          diceRollAudioRef.current.preload = 'auto';
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

  const handleRoll = () => {
    if (isRolling) return;

    if (isSoundOn && diceRollAudioRef.current) {
        diceRollAudioRef.current.currentTime = 0;
        diceRollAudioRef.current.play().catch(e => console.error("Error playing dice roll sound:", e));
    }

    setIsRolling(true);
    setIsInitialState(false);
    setShowModal(false);
    
    const randomResult = Math.floor(Math.random() * 6) + 1;
    
    const finalRotation = resultRotations[randomResult];
    const randomSpins = Math.floor(Math.random() * 4) + 8; // 8 to 11 full spins

    setRotation({
      x: finalRotation.x + randomSpins * 360,
      y: finalRotation.y + randomSpins * 360,
      z: 0
    });
    
    setTimeout(() => {
      setResult(randomResult);
      setIsRolling(false);
      setHistory(prev => [randomResult, ...prev].slice(0, 100));
    }, 2500); // Animation duration

    setTimeout(() => {
        setShowModal(true);
    }, 2550); // Show modal just after animation ends
  };
  
  const resetToDefaultState = () => {
    setShowModal(false);
    setIsInitialState(true);
    setRotation(initialRotation);
    setResult(null);
  }

  const handleRollAgain = () => {
    resetToDefaultState();
    setTimeout(handleRoll, 100); 
  }

  const resetHistory = () => {
    setHistory([]);
  }

  return (
    <>
      <style jsx>{`
        .scene {
          width: 160px;
          height: 160px;
          perspective: 800px;
        }
        
        .dice {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transform: rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg);
            transition: ${isRolling ? 'transform 2.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'};
        }

        .face {
            position: absolute;
            width: 160px;
            height: 160px;
            background: linear-gradient(145deg, hsl(var(--primary)), hsl(var(--destructive)));
            border-radius: 15px;
            display: grid;
            grid-template-areas:
              "a b c"
              "d e f"
              "g h i";
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 15px;
            box-sizing: border-box;
            box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .dot {
            width: 24px;
            height: 24px;
            background-color: hsl(var(--primary-foreground));
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            place-self: center;
        }

        .face-1 { transform: rotateY(0deg) translateZ(80px); }
        .face-2 { transform: rotateY(90deg) translateZ(80px); }
        .face-3 { transform: rotateX(90deg) translateZ(80px); }
        .face-4 { transform: rotateX(-90deg) translateZ(80px); }
        .face-5 { transform: rotateY(-90deg) translateZ(80px); }
        .face-6 { transform: rotateY(180deg) translateZ(80px); }

        .face-1 .dot-1 { grid-area: e; }

        .face-2 .dot-1 { grid-area: a; }
        .face-2 .dot-2 { grid-area: i; }

        .face-3 .dot-1 { grid-area: a; }
        .face-3 .dot-2 { grid-area: e; }
        .face-3 .dot-3 { grid-area: i; }

        .face-4 .dot-1 { grid-area: a; }
        .face-4 .dot-2 { grid-area: c; }
        .face-4 .dot-3 { grid-area: g; }
        .face-4 .dot-4 { grid-area: i; }

        .face-5 .dot-1 { grid-area: a; }
        .face-5 .dot-2 { grid-area: c; }
        .face-5 .dot-3 { grid-area: e; }
        .face-5 .dot-4 { grid-area: g; }
        .face-5 .dot-5 { grid-area: i; }

        .face-6 .dot-1 { grid-area: a; }
        .face-6 .dot-2 { grid-area: c; }
        .face-6 .dot-3 { grid-area: d; }
        .face-6 .dot-4 { grid-area: f; }
        .face-6 .dot-5 { grid-area: g; }
        .face-6 .dot-6 { grid-area: i; }

        @media (min-width: 768px) {
            .scene {
              width: 180px;
              height: 180px;
            }
            .face {
              width: 180px;
              height: 180px;
            }
            .face-1 { transform: rotateY(0deg) translateZ(90px); }
            .face-2 { transform: rotateY(90deg) translateZ(90px); }
            .face-3 { transform: rotateX(90deg) translateZ(90px); }
            .face-4 { transform: rotateX(-90deg) translateZ(90px); }
            .face-5 { transform: rotateY(-90deg) translateZ(90px); }
            .face-6 { transform: rotateY(180deg) translateZ(90px); }
        }
      `}</style>
      
      <div className="w-full max-w-5xl mx-auto py-12 px-4 lg:p-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground/90 font-headline tracking-wider">{t.title}</h1>
            <p className="text-muted-foreground text-lg sm:text-xl mt-2">{t.description}</p>
        </div>
        <div className="flex flex-col items-center gap-8">
          
           <div className="scene my-12">
             <div className={cn("dice")}>
                <div className="face face-1"><div className="dot dot-1"></div></div>
                <div className="face face-2"><div className="dot dot-1"></div><div className="dot dot-2"></div></div>
                <div className="face face-3"><div className="dot dot-1"></div><div className="dot dot-2"></div><div className="dot dot-3"></div></div>
                <div className="face face-4"><div className="dot dot-1"></div><div className="dot dot-2"></div><div className="dot dot-3"></div><div className="dot dot-4"></div></div>
                <div className="face face-5"><div className="dot dot-1"></div><div className="dot dot-2"></div><div className="dot dot-3"></div><div className="dot dot-4"></div><div className="dot dot-5"></div></div>
                <div className="face face-6"><div className="dot dot-1"></div><div className="dot dot-2"></div><div className="dot dot-3"></div><div className="dot dot-4"></div><div className="dot dot-5"></div><div className="dot dot-6"></div></div>
             </div>
           </div>
          
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <Button onClick={handleRoll} disabled={isRolling} size="lg" className="w-full py-7 text-xl font-bold">
              <Dices className="mr-3 h-6 w-6" />
              {isRolling ? t.rollingText : t.buttonText}
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
                      <Button variant="ghost" size="icon" onClick={resetHistory} className="h-8 w-8" aria-label={t.resetTooltip}>
                        <RotateCw className="h-4 w-4"/>
                      </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    {isMounted && history.length > 0 ? (
                        <div className="overflow-x-auto whitespace-nowrap p-2 -m-2">
                            <p className="text-2xl font-mono tracking-widest inline-block">{history.join(' - ')}</p>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">{t.noResults}</p>
                    )}
                </CardContent>
                {isMounted && history.length > 0 && (
                  <CardFooter className="flex-col items-center gap-2 pt-4 border-t text-center">
                      <div className="text-muted-foreground">{t.totalRolls}:</div>
                      <div className="text-4xl font-bold text-accent">{history.length}</div>
                  </CardFooter>
                )}
            </Card>
          </div>
        </div>
      </div>
      
      <DiceRollerResultModal 
        lang={lang}
        result={showModal ? result : null} 
        onRollAgain={handleRollAgain}
        onClearResult={resetToDefaultState}
        isSoundOn={isSoundOn}
      />

      <section className="w-full max-w-5xl mx-auto p-4 lg:p-8">
        <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: t.seo.content.replace(/href='\/[a-z]{2}/g, `href='/${lang}`) }} />

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
