
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import RouletteWheel from "@/components/roulette-wheel";
import OptionsEditor from "@/components/options-editor";
import ResultsHistory from "@/components/results-history";
import ResultModal from "@/components/result-modal";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, History, Shuffle, Eye, EyeOff, Settings, Volume2, VolumeX, ListChecks } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { WHEEL_COLORS } from "@/lib/colors";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export interface Option {
  id: string;
  name: string;
}

export interface Translations {
  storageWarning: string;
  spinButton: string;
  customizeTooltip?: string;
  shuffleTooltip?: string;
  resultsTooltip?: string;
  hideTooltip: string;
  showTooltip: string;
  resultsTitle?: string;
  clear?: string;
  draw?: string;
  noResults?: string;
  customizationDisabledTitle?: string;
  customizationDisabledDescription?: string;
  openPanelToCustomizeTitle?: string;
  openPanelToCustomizeDescription?: string;
}

interface WheelPageClientProps {
  lang: string;
  translations: Translations;
  storageKeySuffix: string;
  initialOptions?: Option[];
  options?: Option[]; // New prop to pass reactive options
  shuffleOptions?: () => void;
  pageTitle: string;
  pageDescription: string;
  showOptionsPanel?: boolean;
  showShuffleButton?: boolean;
  showCustomizeButton?: boolean;
  wheelColors?: string[];
  textColor?: string | string[];
  textStrokeColor?: string;
  segmentFontSize?: number;
  textRadiusRatio?: number;
  optionsEditorComponent?: React.ReactNode;
  setCustomizationClickHandler?: (handler: () => void) => void;
}

const SPIN_START_SOUND = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/roue-lancement.mp3";
const SPINNING_SOUND = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/roue-qui-tourne-2.mp3";
const SHUFFLE_SOUND = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/remuer.mp3";
const WIN_SOUND = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/resultat-roue.mp3";


export default function WheelPageClient({
  lang,
  translations: t,
  storageKeySuffix,
  initialOptions = [],
  options: externalOptions,
  shuffleOptions: externalShuffleOptions,
  pageTitle,
  pageDescription,
  showOptionsPanel = true,
  showShuffleButton = true,
  showCustomizeButton = true,
  wheelColors = WHEEL_COLORS,
  textColor = "#FFFFFF",
  textStrokeColor = "#000000",
  segmentFontSize,
  textRadiusRatio,
  optionsEditorComponent,
  setCustomizationClickHandler,
}: WheelPageClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  
  // Use local storage only if external options are not provided
  const [localOptions, setLocalOptions] = useLocalStorage<Option[]>(`roulette-options-${storageKeySuffix}-${lang}`, initialOptions);
  
  const [resultsHistory, setResultsHistory] = useLocalStorage<Option[]>(`roulette-history-${storageKeySuffix}-${lang}`, []);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<Option | null>(null);
  const [view, setView] = useState<'options' | 'results'>('options');
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [spinDuration, setSpinDuration] = useState(10000);
  const [isSoundOn, setIsSoundOn] = useLocalStorage('roulette-sound-on', true);
  const [highlightInput, setHighlightInput] = useState(false);


  const spinStartAudioRef = useRef<HTMLAudioElement | null>(null);
  const spinningAudioRef = useRef<HTMLAudioElement | null>(null);
  const shuffleAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const isExternallyManaged = externalOptions !== undefined;
  const options = isExternallyManaged ? externalOptions : localOptions;

  useEffect(() => {
    setIsMounted(true);
    
    // Preload audio on first user interaction to bypass mobile autoplay restrictions
    const preloadAudio = () => {
      if (typeof window !== "undefined") {
        if (!spinStartAudioRef.current) {
          spinStartAudioRef.current = new Audio(SPIN_START_SOUND);
          spinStartAudioRef.current.preload = 'auto';
        }
        if (!spinningAudioRef.current) {
          spinningAudioRef.current = new Audio(SPINNING_SOUND);
          spinningAudioRef.current.preload = 'auto';
          spinningAudioRef.current.loop = true;
        }
        if (!winAudioRef.current) {
          winAudioRef.current = new Audio(WIN_SOUND);
          winAudioRef.current.preload = 'auto';
        }
        if (showShuffleButton && !shuffleAudioRef.current) {
          shuffleAudioRef.current = new Audio(SHUFFLE_SOUND);
          shuffleAudioRef.current.preload = 'auto';
        }
        // Remove the event listener after it has run once
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
  }, [showShuffleButton]);

  const currentOptions = isMounted ? options : initialOptions;
  if (isMounted && options.length === 0 && storageKeySuffix !== 'color-wheel' && !isExternallyManaged) {
    setLocalOptions(initialOptions);
  }

  const addOption = (name: string) => {
    if (isExternallyManaged) return;
    const newOption: Option = { id: crypto.randomUUID(), name };
    setLocalOptions(prev => [...prev, newOption]);
  };

  const removeOption = (id: string) => {
    if (isExternallyManaged) return;
    setLocalOptions(prev => {
        if (prev.length <= 1) return prev;
        return prev.filter(option => option.id !== id)
    });
  };

  const updateOption = (id: string, newName: string) => {
    if (isExternallyManaged) return;
    setLocalOptions(prev => prev.map(option => option.id === id ? { ...option, name: newName } : option));
  };

  const shuffleOptions = () => {
    if (isSoundOn && shuffleAudioRef.current) {
        shuffleAudioRef.current.currentTime = 0;
        shuffleAudioRef.current.play().catch(e => console.error("Error playing shuffle sound:", e));
    }
    if(externalShuffleOptions) {
        externalShuffleOptions();
        return;
    }
    setLocalOptions(prev => [...prev].sort(() => Math.random() - 0.5));
  };
  
  const clearHistory = () => {
    setResultsHistory([]);
  };

  const handleCustomizationClick = useCallback(() => {
    if (!showOptionsPanel) {
      if (t.customizationDisabledTitle) {
        toast({
            title: t.customizationDisabledTitle,
            description: t.customizationDisabledDescription,
            duration: 3000
        });
      }
      return;
    }
    
    if (!isPanelVisible) {
        setIsPanelVisible(true);
    }
    setView('options');
    setHighlightInput(true);
    setTimeout(() => setHighlightInput(false), 1500); 
  }, [isPanelVisible, showOptionsPanel, t.customizationDisabledTitle, t.customizationDisabledDescription, toast]);

  useEffect(() => {
    if (setCustomizationClickHandler) {
      setCustomizationClickHandler(() => handleCustomizationClick);
    }
  }, [setCustomizationClickHandler, handleCustomizationClick]);


  const handleSpin = useCallback(() => {
    if (isSpinning || currentOptions.length < 2) return;
    
    if (isSoundOn && spinStartAudioRef.current && spinningAudioRef.current) {
      const startAudio = spinStartAudioRef.current;
      const spinningAudio = spinningAudioRef.current;

      spinningAudio.pause();
      if(spinningAudio) spinningAudio.currentTime = 0;

      const playSpinningSound = () => {
        spinningAudio.currentTime = 0;
        spinningAudio.play().catch(e => console.error("Error playing spinning sound:", e));
        startAudio.removeEventListener('ended', playSpinningSound);
      };
      
      startAudio.addEventListener('ended', playSpinningSound);
      
      startAudio.currentTime = 0;
      startAudio.play().catch(e => {
        console.error("Error playing start sound:", e);
        startAudio.removeEventListener('ended', playSpinningSound);
      });
    }
    
    setIsSpinning(true);
    setResult(null);

    const randomExtraSpins = Math.floor(Math.random() * 9) + 12;
    const randomDuration = Math.floor(Math.random() * 5000) + 10000;
    setSpinDuration(randomDuration);

    const randomAngle = Math.random() * 360;
    const newRotation = rotation + 360 * randomExtraSpins + randomAngle;
    setRotation(newRotation);

    setTimeout(() => {
        spinningAudioRef.current?.pause();
    }, randomDuration - 500);

    setTimeout(() => {
      const numOptions = currentOptions.length;
      const segmentAngle = 360 / numOptions;
      
      const finalAngle = newRotation % 360;
      const normalizedAngle = (360 - finalAngle + 90 + 360) % 360;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle);
      
      const winningOption = currentOptions[winningIndex];
      setResult(winningOption);
      setResultsHistory(prev => [winningOption, ...prev]);
      setIsSpinning(false);
    }, randomDuration);
  }, [isSpinning, currentOptions, rotation, setResultsHistory, isSoundOn]);
  
  const spinAgain = () => {
    setResult(null);
    handleSpin();
  };

  if (!isMounted) {
    return null;
  }
  
  const editor = optionsEditorComponent ? optionsEditorComponent : (
    <OptionsEditor 
        options={currentOptions} 
        addOption={addOption} 
        removeOption={removeOption} 
        updateOption={updateOption} 
        isSpinning={isSpinning}
        highlightInput={highlightInput}
    />
  );


  const mainPanel = (
    <Card className="w-full max-w-md mx-auto shadow-xl border-2">
      <CardHeader className="flex-row items-center justify-between p-3">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            {showCustomizeButton && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={view === 'options' && isPanelVisible ? 'secondary' : 'ghost'} size="icon" onClick={handleCustomizationClick} disabled={isSpinning}>
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>{t.customizeTooltip}</p></TooltipContent>
              </Tooltip>
            )}
            {showShuffleButton && (
                <Tooltip>
                <TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={shuffleOptions} disabled={isSpinning || currentOptions.length < 2}><Shuffle className="h-5 w-5" /></Button></TooltipTrigger>
                <TooltipContent><p>{t.shuffleTooltip}</p></TooltipContent>
                </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild><Button variant={view === 'results' && isPanelVisible ? 'secondary' : 'ghost'} size="icon" onClick={() => { if (!isPanelVisible) setIsPanelVisible(true); setView('results')}}><History className="h-5 w-5" /></Button></TooltipTrigger>
              <TooltipContent><p>{t.resultsTooltip}</p></TooltipContent>
            </Tooltip>
             <Tooltip>
              <TooltipTrigger asChild><Button onClick={() => setIsSoundOn(!isSoundOn)} variant="ghost" size="icon">{isSoundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}</Button></TooltipTrigger>
              <TooltipContent><p>{isSoundOn ? "Couper le son" : "Activer le son"}</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild><Button onClick={() => setIsPanelVisible(!isPanelVisible)} variant="ghost" size="icon">{isPanelVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</Button></TooltipTrigger>
              <TooltipContent><p>{isPanelVisible ? t.hideTooltip : t.showTooltip}</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      {isPanelVisible && (
        <>
          {view === 'options' && (
            showOptionsPanel ? editor : <ResultsHistory results={resultsHistory} clearHistory={clearHistory} isSpinning={isSpinning} translations={t} />
          )}
          {view === 'results' && (
             <ResultsHistory results={resultsHistory} clearHistory={clearHistory} isSpinning={isSpinning} translations={t} />
          )}
        </>
      )}
    </Card>
  );

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start p-4 pt-8 lg:p-8" id="wheel-section">
        <div className="text-center mb-8 hidden sm:block">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground/90 font-headline tracking-wider">{pageTitle}</h1>
          <p className="text-muted-foreground text-lg sm:text-xl mt-2">{pageDescription}</p>
        </div>
        <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-y-8 lg:gap-x-4 lg:grid-cols-3 lg:items-start mt-4">
          <div className="relative flex flex-col items-center justify-center lg:col-span-2">
            <RouletteWheel
              options={currentOptions}
              rotation={rotation}
              spinDuration={spinDuration}
              isSpinning={isSpinning}
              colors={wheelColors}
              segmentFontSize={segmentFontSize}
              textRadiusRatio={textRadiusRatio}
              textColor={textColor}
              textStrokeColor={textStrokeColor}
              visualsClassName={cn(isSpinning ? "transition-[transform]" : "animate-slow-spin")}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Button
                  onClick={handleSpin}
                  disabled={isSpinning || currentOptions.length < 2}
                  size="lg"
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-primary text-white shadow-2xl transition-transform active:scale-95 border-4 border-white flex items-center justify-center hover:bg-primary hover:scale-105"
                  aria-label="Lancer la roue de la chance"
                >
                 <span className="text-md sm:text-lg font-bold tracking-wider">{t.spinButton}</span>
              </Button>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 mb-4 max-w-md mx-auto">
                <Info className="h-5 w-5 mt-0.5 shrink-0" />
                <p><span className="font-semibold">{t.storageWarning.split(':')[0]}:</span> {t.storageWarning.split(':')[1]}</p>
            </div>
            {mainPanel}
          </div>
        </div>
        <ResultModal result={result} onSpinAgain={spinAgain} onClearResult={() => setResult(null)} isSoundOn={isSoundOn} audioRef={winAudioRef} />
      </div>
    </>
  );
}
