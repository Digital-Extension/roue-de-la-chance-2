
"use client";

import { useEffect, useRef, MutableRefObject } from "react";
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
import { type Option } from "@/components/wheel-page-client";
import ConfettiExplosion from "./confetti-explosion";
import { useParams } from 'next/navigation';
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ResultModalProps {
  result: Option | null;
  onSpinAgain: () => void;
  onClearResult: () => void;
  isSoundOn: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const translations = {
    fr: {
        title: "Et le gagnant est...",
        close: "Fermer",
        spinAgain: "Relancer !",
        share: "Partager",
        shareText: (result: string, url: string) => `J'ai obtenu "${result}" sur la Roue de la Chance ! Tentez votre chance vous aussi : ${url}`,
        linkCopied: "Message copié !",
        linkCopiedDescription: "Le message a été copié dans votre presse-papiers.",
        error: "Erreur",
        errorDescription: "Impossible de partager ou de copier.",
    },
    en: {
        title: "And the winner is...",
        close: "Close",
        spinAgain: "Spin Again!",
        share: "Share",
        shareText: (result: string, url: string) => `I got "${result}" on the Wheel of Chance! Try your luck too: ${url}`,
        linkCopied: "Message copied!",
        linkCopiedDescription: "The message has been copied to your clipboard.",
        error: "Error",
        errorDescription: "Could not share or copy.",
    },
    es: {
        title: "Y el ganador es...",
        close: "Cerrar",
        spinAgain: "¡Girar de nuevo!",
        share: "Compartir",
        shareText: (result: string, url: string) => `¡He conseguido "${result}" en la Ruleta de la Suerte! Prueba tu suerte también: ${url}`,
        linkCopied: "¡Mensaje copiado!",
        linkCopiedDescription: "El mensaje ha sido copiado a tu portapapeles.",
        error: "Error",
        errorDescription: "No se pudo compartir o copiar.",
    },
    de: {
        title: "Und der Gewinner ist...",
        close: "Schließen",
        spinAgain: "Nochmal drehen!",
        share: "Teilen",
        shareText: (result: string, url: string) => `Ich habe "${result}" am Glücksrad bekommen! Versuchen Sie auch Ihr Glück: ${url}`,
        linkCopied: "Nachricht kopiert!",
        linkCopiedDescription: "Die Nachricht wurde in Ihre Zwischenablage kopiert.",
        error: "Fehler",
        errorDescription: "Konnte nicht teilen oder kopieren.",
    },
    pt: {
        title: "E o vencedor é...",
        close: "Fechar",
        spinAgain: "Girar Novamente!",
        share: "Partilhar",
        shareText: (result: string, url: string) => `Eu consegui "${result}" na Roda da Sorte! Tente a sua sorte também: ${url}`,
        linkCopied: "Mensagem copiada!",
        linkCopiedDescription: "A mensagem foi copiada para a sua área de transferência.",
        error: "Erro",
        errorDescription: "Não foi possível partilhar ou copiar.",
    }
}


export default function ResultModal({ result, onSpinAgain, onClearResult, isSoundOn, audioRef }: ResultModalProps) {
  const params = useParams();
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.fr;
  const { toast } = useToast();

  useEffect(() => {
    if (result && isSoundOn && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Error playing win sound:", e));
    }
  }, [result, isSoundOn, audioRef]);

  const handleShare = async () => {
    if (!result) return;
    const shareUrl = window.location.origin + `/${lang}`;
    const shareText = t.shareText(result.name, shareUrl);
    const shareData = {
      title: t.title,
      text: shareText,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: t.linkCopied,
          description: t.linkCopiedDescription,
        });
      } catch (copyErr) {
        toast({
          variant: "destructive",
          title: t.error,
          description: t.errorDescription,
        });
      }
    }
  };

  const handleSpinAgain = () => {
    onClearResult();
    onSpinAgain();
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
            {result?.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={cn("flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2 gap-y-2")}>
          <AlertDialogCancel onClick={onClearResult}>{t.close}</AlertDialogCancel>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            {t.share}
          </Button>
          <AlertDialogAction onClick={handleSpinAgain}>{t.spinAgain}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
