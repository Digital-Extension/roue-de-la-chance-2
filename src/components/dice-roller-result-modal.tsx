
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

interface DiceRollerResultModalProps {
  result: number | null;
  onRollAgain: () => void;
  onClearResult: () => void;
  lang: string;
  isSoundOn: boolean;
}

const translations = {
    fr: {
        title: "Le résultat du dé est...",
        close: "Fermer",
        rollAgain: "Relancer !",
    },
    en: {
        title: "The dice result is...",
        close: "Close",
        rollAgain: "Roll Again!",
    },
    es: {
        title: "El resultado del dado es...",
        close: "Cerrar",
        rollAgain: "¡Lanzar de nuevo!",
    },
    de: {
        title: "Das Würfelergebnis ist...",
        close: "Schließen",
        rollAgain: "Nochmal würfeln!",
    },
    pt: {
        title: "O resultado do dado é...",
        close: "Fechar",
        rollAgain: "Lançar Novamente!",
    }
}

export default function DiceRollerResultModal({ result, onRollAgain, onClearResult, lang, isSoundOn }: DiceRollerResultModalProps) {
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
  
  const handleRollAgain = () => {
    onRollAgain();
  };
  
  return (
    <AlertDialog open={!!result} onOpenChange={(open) => !open && onClearResult()}>
      <AlertDialogContent>
        {result && <ConfettiExplosion />}
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-3xl font-headline">
            {t.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-primary text-6xl font-bold text-center py-8 break-words">
            {result}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClearResult}>{t.close}</AlertDialogCancel>
          <AlertDialogAction onClick={handleRollAgain}>{t.rollAgain}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
