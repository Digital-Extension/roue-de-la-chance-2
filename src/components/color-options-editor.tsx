
"use client";

import React, { useState } from "react";
import { type ColorOption } from "@/components/color-wheel-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Paintbrush } from "lucide-react";
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

interface ColorOptionsEditorProps {
  options: ColorOption[];
  setOptions: React.Dispatch<React.SetStateAction<ColorOption[]>>;
}

const translations: { [key: string]: any } = {
    fr: {
        addPlaceholder: "Nom de la couleur...",
        addButton: "Ajouter",
        emptyText: "Ajoutez des couleurs pour commencer !",
        minOptionsMessage: "Il faut au moins 2 options pour lancer la roue.",
        deleteDisabledMessage: "Il faut au moins 1 option.",
        colorName: "Nom",
        colorValue: "Couleur",
    },
    en: {
        addPlaceholder: "Color name...",
        addButton: "Add",
        emptyText: "Add colors to get started!",
        minOptionsMessage: "You need at least 2 options to spin the wheel.",
        deleteDisabledMessage: "You need at least 1 option.",
        colorName: "Name",
        colorValue: "Color",
    },
    es: {
        addPlaceholder: "Nombre del color...",
        addButton: "Añadir",
        emptyText: "¡Añade colores para empezar!",
        minOptionsMessage: "Necesitas al menos 2 opciones para girar la ruleta.",
        deleteDisabledMessage: "Necesitas al menos 1 opción.",
        colorName: "Nombre",
        colorValue: "Color",
    },
    de: {
        addPlaceholder: "Farbname...",
        addButton: "Hinzufügen",
        emptyText: "Fügen Sie Farben hinzu, um loszulegen!",
        minOptionsMessage: "Sie benötigen mindestens 2 Optionen, um das Rad zu drehen.",
        deleteDisabledMessage: "Sie benötigen mindestens 1 Option.",
        colorName: "Name",
        colorValue: "Farbe",
    },
    pt: {
        addPlaceholder: "Nome da cor...",
        addButton: "Adicionar",
        emptyText: "Adicione cores para começar!",
        minOptionsMessage: "Você precisa de pelo menos 2 opções para girar a roda.",
        deleteDisabledMessage: "Você precisa de pelo menos 1 opção.",
        colorName: "Nome",
        colorValue: "Cor",
    }
}

const ColorOptionItem = ({ option, removeOption, updateOption, canBeDeleted, disabledMessage }: { option: ColorOption; removeOption: (id: string) => void; updateOption: (id: string, newName: string, newColor: string) => void; canBeDeleted: boolean; disabledMessage: string; }) => {
  const { toast } = useToast();

  const handleRemoveClick = () => {
    if (canBeDeleted) {
        removeOption(option.id);
    } else {
        toast({
            variant: "destructive",
            title: "Action impossible",
            description: disabledMessage,
            duration: 2000,
        });
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-lg p-2.5 hover:bg-muted/60">
        <Input
            type="text"
            value={option.name}
            onChange={(e) => updateOption(option.id, e.target.value, option.color)}
            className="h-9 flex-1"
        />
        <div className="relative">
            <Input
                type="color"
                value={option.color}
                onChange={(e) => updateOption(option.id, option.name, e.target.value)}
                className="h-9 w-12 p-1 appearance-none bg-transparent border-input border cursor-pointer"
            />
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive" onClick={handleRemoveClick}>
            <Trash2 className="h-4 w-4" />
        </Button>
    </div>
  );
};

export default function ColorOptionsEditor({
  options,
  setOptions
}: ColorOptionsEditorProps) {
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionColor, setNewOptionColor] = useState("#000000");
  const params = useParams();
  const lang = params.lang as string;
  const t = translations[lang] || translations.fr;

  const addOption = (name: string, color: string) => {
    const newOption: ColorOption = { id: crypto.randomUUID(), name, color };
    setOptions(prev => [...prev, newOption]);
  };
  
  const removeOption = (id: string) => {
      setOptions(prev => {
          if (prev.length <= 1) return prev;
          return prev.filter(option => option.id !== id)
      });
  };
  
  const updateOption = (id: string, newName: string, newColor: string) => {
      setOptions(prev => prev.map(option => option.id === id ? { ...option, name: newName, color: newColor } : option));
  };

  const handleAddOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOptionName.trim()) {
      addOption(newOptionName.trim(), newOptionColor);
      setNewOptionName("");
      setNewOptionColor("#000000");
    }
  };

  const canDeleteOptions = options.length > 1;

  return (
      <CardContent>
        <form onSubmit={handleAddOption} className="flex gap-2 mb-4 items-end">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">{t.colorName}</label>
            <Input
                type="text"
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
                placeholder={t.addPlaceholder}
                className="h-10 text-base"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">{t.colorValue}</label>
            <Input
                type="color"
                value={newOptionColor}
                onChange={(e) => setNewOptionColor(e.target.value)}
                className="h-10 w-14 p-1 appearance-none bg-transparent border-input border cursor-pointer"
            />
          </div>
          <Button type="submit" disabled={!newOptionName.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 font-bold">
            {t.addButton}
          </Button>
        </form>
        <ScrollArea className="h-[18rem] pr-4 -mr-4">
          <div className="flex flex-col gap-1">
            {options.length > 0 ? (
                options.map((option) => (
                  <ColorOptionItem 
                    key={option.id} 
                    option={option} 
                    removeOption={removeOption} 
                    updateOption={updateOption} 
                    canBeDeleted={canDeleteOptions}
                    disabledMessage={t.deleteDisabledMessage}
                  />
                ))
            ) : (
                <p className="text-muted-foreground text-center p-8">{t.emptyText}</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
  );
}
