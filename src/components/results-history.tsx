
"use client";

import { type Option, type Translations } from "@/components/wheel-page-client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { useParams } from 'next/navigation';

interface ResultsHistoryProps {
  results: Option[];
  clearHistory: () => void;
  isSpinning: boolean;
  translations: Partial<Translations>;
}

const defaultTranslations: { [key: string]: Partial<Translations> } = {
    fr: {
        clear: "Vider",
        draw: "Tirage",
        noResults: "Aucun résultat pour le moment. Lancez la roue !"
    },
    en: {
        clear: "Clear",
        draw: "Draw",
        noResults: "No results yet. Spin the wheel!"
    },
    es: {
        clear: "Limpiar",
        draw: "Sorteo",
        noResults: "Aún no hay resultados. ¡Gira la ruleta!"
    },
    de: {
        clear: "Leeren",
        draw: "Ziehung",
        noResults: "Noch keine Ergebnisse. Drehen Sie das Rad!"
    },
    pt: {
        clear: "Limpar",
        draw: "Sorteio",
        noResults: "Ainda não há resultados. Gire a roda!"
    }
}

export default function ResultsHistory({ results, clearHistory, isSpinning, translations }: ResultsHistoryProps) {
  const params = useParams();
  const lang = params.lang as string;
  const t = { ...defaultTranslations[lang] || defaultTranslations.fr, ...translations };

  return (
    <CardContent>
        <div className="flex justify-end mb-4">
            <Button
                onClick={clearHistory}
                disabled={isSpinning || results.length === 0}
                variant="destructive"
                size="sm"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                {t.clear}
            </Button>
        </div>
      <ScrollArea className="h-[20.5rem] pr-4 -mr-4">
        <div className="flex flex-col gap-2">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={`${result.id}-${index}`} className="flex items-center justify-between gap-2 rounded-lg p-2.5 bg-muted/60">
                <div className="flex-1 min-w-0">
                  <span className="font-medium truncate block">{result.name}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{t.draw} #{results.length - index}</span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center p-8">{t.noResults}</p>
          )}
        </div>
      </ScrollArea>
    </CardContent>
  );
}
