
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ConfettiExplosion from "./confetti-explosion";
import { useEffect, useRef } from "react";

const WIN_SOUND = "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/resultat-roue.mp3";

interface CoinFlipResultModalProps {
  result: 'heads' | 'tails' | null;
  onFlipAgain: () => void;
  onClearResult: () => void;
  lang: string;
  isSoundOn: boolean;
}

const translations = {
    fr: {
        title: "Le résultat est...",
        close: "Fermer",
        flipAgain: "Relancer !",
        heads: "Pile",
        tails: "Face",
    },
    en: {
        title: "The result is...",
        close: "Close",
        flipAgain: "Flip Again!",
        heads: "Heads",
        tails: "Tails",
    },
    es: {
        title: "El resultado es...",
        close: "Cerrar",
        flipAgain: "¡Lanzar de nuevo!",
        heads: "Cara",
        tails: "Cruz",
    },
    de: {
        title: "Das Ergebnis ist...",
        close: "Schließen",
        flipAgain: "Nochmal werfen!",
        heads: "Kopf",
        tails: "Zahl",
    },
    pt: {
        title: "O resultado é...",
        close: "Fechar",
        flipAgain: "Lançar Novamente!",
        heads: "Cara",
        tails: "Coroa",
    }
}


export default function CoinFlipResultModal({ result, onFlipAgain, onClearResult, lang, isSoundOn }: CoinFlipResultModalProps) {
  const t = translations[lang as keyof typeof translations] || translations.fr;
  const winAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio on mount
    if (typeof window !== "undefined") {
        if (!winAudioRef.current) {
            winAudioRef.current = new Audio(WIN_SOUND);
            winAudioRef.current.preload = 'auto';
        }
    }
  }, []);

  useEffect(() => {
    if (result && isSoundOn && winAudioRef.current) {
        winAudioRef.current.currentTime = 0;
        winAudioRef.current.play().catch(e => console.error("Error playing win sound:", e));
    }
  }, [result, isSoundOn]);
  
  const handleFlipAgain = () => {
    onClearResult();
    onFlipAgain();
  };

  const getResultText = () => {
    if (!result) return "";
    return result === 'heads' ? t.heads : t.tails;
  }
  
  return (
    <AlertDialog open={!!result} onOpenChange={(open) => !open && onClearResult()}>
      <AlertDialogContent>
        {result && <ConfettiExplosion />}
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-3xl font-headline">
            {t.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-primary text-6xl font-bold text-center py-8 break-words">
            {getResultText()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClearResult}>{t.close}</AlertDialogCancel>
          <AlertDialogAction onClick={handleFlipAgain}>{t.flipAgain}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
