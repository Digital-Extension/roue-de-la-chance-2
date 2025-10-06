
"use client";

import { useState } from "react";
import { type Option } from "@/components/wheel-page-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


interface OptionsEditorProps {
  options: Option[];
  addOption: (name: string) => void;
  removeOption: (id: string) => void;
  updateOption: (id: string, newName: string) => void;
  isSpinning: boolean;
  highlightInput?: boolean;
}

const translations: { [key: string]: any } = {
    fr: {
        addPlaceholder: "Ajouter une option...",
        addButton: "Ajouter",
        emptyText: "Ajoutez des options pour commencer !",
        minOptionsMessage: "Il faut au moins 1 option."
    },
    en: {
        addPlaceholder: "Add an option...",
        addButton: "Add",
        emptyText: "Add options to get started!",
        minOptionsMessage: "You need at least 1 option."
    },
    es: {
        addPlaceholder: "Añadir una opción...",
        addButton: "Añadir",
        emptyText: "¡Añade opciones para empezar!",
        minOptionsMessage: "Necesitas al menos 1 opción."
    },
    de: {
        addPlaceholder: "Option hinzufügen...",
        addButton: "Hinzufügen",
        emptyText: "Fügen Sie Optionen hinzu, um loszulegen!",
        minOptionsMessage: "Sie benötigen mindestens 1 Option."
    },
    pt: {
        addPlaceholder: "Adicionar uma opção...",
        addButton: "Adicionar",
        emptyText: "Adicione opções para começar!",
        minOptionsMessage: "Você precisa de pelo menos 1 opção."
    }
}

const OptionItem = ({ option, removeOption, updateOption, isSpinning, canBeDeleted, disabledMessage }: { option: Option; removeOption: (id: string) => void; updateOption: (id: string, newName: string) => void; isSpinning: boolean; canBeDeleted: boolean; disabledMessage: string; }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(option.name);
  const { toast } = useToast();

  const handleUpdate = () => {
    if (editedName.trim()) {
      updateOption(option.id, editedName.trim());
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleUpdate();
    } else if (e.key === 'Escape') {
        setIsEditing(false);
        setEditedName(option.name);
    }
  };

  const handleRemoveClick = () => {
    if (canBeDeleted) {
        removeOption(option.id);
    } else {
        toast({
            title: "Action impossible",
            description: disabledMessage,
            duration: 2000,
            variant: "destructive",
        });
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-2.5 hover:bg-muted/60">
      {isEditing ? (
        <>
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleUpdate}
            className="h-9"
            disabled={isSpinning}
            autoFocus
          />
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700" onClick={handleUpdate} disabled={isSpinning}>
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={() => setIsEditing(false)} disabled={isSpinning}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div 
            className="min-w-0 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <span className="font-medium truncate block" title={option.name}>{option.name}</span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setIsEditing(true)} disabled={isSpinning}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive" onClick={handleRemoveClick} disabled={isSpinning}>
                <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default function OptionsEditor({
  options,
  addOption,
  removeOption,
  updateOption,
  isSpinning,
  highlightInput,
}: OptionsEditorProps) {
  const [newOption, setNewOption] = useState("");
  const params = useParams();
  const lang = params.lang as string;
  const t = translations[lang] || translations.fr;

  const handleAddOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOption.trim()) {
      addOption(newOption);
      setNewOption("");
    }
  };

  const canDeleteOptions = options.length > 1;

  return (
      <CardContent>
        <form onSubmit={handleAddOption} className="flex gap-3 mb-4">
          <Input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder={t.addPlaceholder}
            disabled={isSpinning}
            className={cn(
              "h-11 text-base",
              highlightInput && "animate-pulse-focus"
            )}
          />
          <Button type="submit" disabled={isSpinning || !newOption.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-5 font-bold">
            {t.addButton}
          </Button>
        </form>
        <ScrollArea className="h-[18rem] pr-4 -mr-4">
          <div className="flex flex-col gap-1">
            {options.length > 0 ? (
                options.map((option) => (
                  <OptionItem 
                    key={option.id} 
                    option={option} 
                    removeOption={removeOption} 
                    updateOption={updateOption} 
                    isSpinning={isSpinning} 
                    canBeDeleted={canDeleteOptions}
                    disabledMessage={t.minOptionsMessage}
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
