
"use client";

import { useState } from "react";
import Link from "next/link";
import { Dices, Share2, Menu, Languages, Rss, ChevronDown, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { slugTranslations, getSlug, getSlugKeyFromSlug } from "@/lib/slugs";
import { getAllPosts } from "@/lib/blog-posts";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";


interface HeaderProps {
  lang: string;
}

const translations = {
    fr: {
        shareTitle: "Roue de la Chance - Gratuite et Personnalisable",
        shareText: "Découvrez la Roue en Ligne ! Un outil gratuit pour créer votre roue personnalisable pour les tirages, décisions et jeux.",
        linkCopied: "Message copié !",
        linkCopiedDescription: "Le message et le lien ont été copiés dans votre presse-papiers.",
        error: "Erreur",
        errorDescription: "Impossible de partager ou de copier le lien.",
        library: "Bibliothèque",
        guide: "Guide",
        faq: "FAQ",
        blog: "Blog",
        share: "Partager",
        openMenu: "Ouvrir le menu",
        menu: "Menu",
        shareApp: "Partager l'application",
        home: "Roue de la Chance",
        language: "Langue",
        coinFlip: "Pile ou Face",
        diceRoller: "Dé en ligne",
        colorWheel: "Roue Couleurs",
        yesNoWheel: "Roue Oui ou Non",
        alphabetWheel: "Roue Alphabet",
        new: "Nouveau",
        whatsNew: "Nouveautés"
    },
    en: {
        shareTitle: "Spin the Wheel - Free and Customizable",
        shareText: "Discover the Online Wheel! A free tool to create your custom wheel for draws, decisions, and games.",
        linkCopied: "Message copied!",
        linkCopiedDescription: "The message and link have been copied to your clipboard.",
        error: "Error",
        errorDescription: "Could not share or copy the link.",
        library: "Library",
        guide: "Guide",
        faq: "FAQ",
        blog: "Blog",
        share: "Share",
        openMenu: "Open menu",
        menu: "Menu",
        shareApp: "Share the app",
        home: "Wheel of Chance",
        language: "Language",
        coinFlip: "Coin Flip",
        diceRoller: "Dice Roller",
        colorWheel: "Color Wheel",
        yesNoWheel: "Yes No Wheel",
        alphabetWheel: "Alphabet Wheel",
        new: "New",
        whatsNew: "What's New"
    },
    es: {
        shareTitle: "Ruleta de la Suerte - Gratuita y Personalizable",
        shareText: "¡Descubre la Ruleta en Línea! Una herramienta gratuita para crear tu ruleta personalizable para sorteos, decisiones y juegos.",
        linkCopied: "¡Mensaje copiado!",
        linkCopiedDescription: "El mensaje y el enlace han sido copiados a tu portapapeles.",
        error: "Error",
        errorDescription: "No se pudo compartir o copiar el enlace.",
        library: "Biblioteca",
        guide: "Guía",
        faq: "FAQ",
        blog: "Blog",
        share: "Compartir",
        openMenu: "Abrir menú",
        menu: "Menú",
        shareApp: "Compartir la aplicación",
        home: "Ruleta de la Suerte",
        language: "Idioma",
        coinFlip: "Cara o Cruz",
        diceRoller: "Dado en Línea",
        colorWheel: "Rueda de Colores",
        yesNoWheel: "Rueda Sí o No",
        alphabetWheel: "Ruleta del Alfabeto",
        new: "Nuevo",
        whatsNew: "Novedades"
    },
    de: {
        shareTitle: "Zufallsrad - Kostenlos und anpassbar",
        shareText: "Entdecken Sie das Online-Zufallsrad! Ein kostenloses Werkzeug, um Ihr benutzerdefiniertes Rad für Verlosungen, Entscheidungen und Spiele zu erstellen.",
        linkCopied: "Nachricht kopiert!",
        linkCopiedDescription: "Die Nachricht und der Link wurden in Ihre Zwischenablage kopiert.",
        error: "Fehler",
        errorDescription: "Link konnte nicht geteilt oder kopiert werden.",
        library: "Bibliothek",
        guide: "Anleitung",
        faq: "FAQ",
        blog: "Blog",
        share: "Teilen",
        openMenu: "Menü öffnen",
        menu: "Menü",
        shareApp: "App teilen",
        home: "Zufallsrad",
        language: "Sprache",
        coinFlip: "Münzwurf",
        diceRoller: "Online Würfel",
        colorWheel: "Farbrad",
        yesNoWheel: "Ja Nein Rad",
        alphabetWheel: "Alphabet-Rad",
        new: "Neu",
        whatsNew: "Neuigkeiten"
    },
    pt: {
        shareTitle: "Roda da Sorte - Grátis e Personalizável",
        shareText: "Descubra a Roda Online! Uma ferramenta gratuita para criar a sua roda personalizável para sorteios, decisões e jogos.",
        linkCopied: "Mensagem copiada!",
        linkCopiedDescription: "A mensagem e o link foram copiados para a sua área de transferência.",
        error: "Erro",
        errorDescription: "Não foi possível compartilhar ou copiar o link.",
        library: "Biblioteca",
        guide: "Guia",
        faq: "FAQ",
        blog: "Blog",
        share: "Compartilhar",
        openMenu: "Abrir menu",
        menu: "Menu",
        shareApp: "Compartilhar o aplicativo",
        home: "Roda da Sorte",
        language: "Idioma",
        coinFlip: "Cara ou Coroa",
        diceRoller: "Dado Online",
        colorWheel: "Roda de Cores",
        yesNoWheel: "Roda Sim ou Não",
        alphabetWheel: "Roda do Alfabeto",
        new: "Novo",
        whatsNew: "Novidades"
    }
}

export default function Header({ lang }: HeaderProps) {
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const t = translations[lang as keyof typeof translations] || translations.fr;
  const pathname = usePathname();

  const handleShare = async () => {
    const shareUrl = window.location.origin + `/${lang}`;
    const shareText = t.shareText;
    const shareData = {
      title: t.shareTitle,
      text: `${shareText} ${shareUrl}`,
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
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
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
    setIsSheetOpen(false); // Close sheet after sharing
  };

  const getLocalizedPath = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;

    const pathSegments = pathname.split('/').filter(Boolean);
    const currentLang = pathSegments[0];
    const currentSlug = pathSegments.length > 1 ? pathSegments[1] : '';

    let slugKey = getSlugKeyFromSlug(currentSlug, currentLang);

    if (!slugKey) {
        const allPosts = getAllPosts(currentLang);
        const isBlogPost = allPosts.some(p => p.slug === currentSlug);

        if (isBlogPost) {
            slugKey = 'blog';
        } else {
            slugKey = 'home';
        }
    }

    const newSlug = getSlug(slugKey, targetLang);
    
    if (newSlug === undefined || newSlug === '') {
        return `/${targetLang}`;
    }
    
    return `/${targetLang}/${newSlug}`;
  };

  const mainNavLinks = [
    { href: `/${lang}/${getSlug('dice-roller', lang)}`, label: t.diceRoller, isNew: true },
    { href: `/${lang}/${getSlug('coin-flip', lang)}`, label: t.coinFlip, isNew: true },
    { href: `/${lang}/${getSlug('color-wheel', lang)}`, label: t.colorWheel, isNew: false },
    { href: `/${lang}/${getSlug('yes-no', lang)}`, label: t.yesNoWheel, isNew: false },
    { href: `/${lang}/${getSlug('alphabet', lang)}`, label: t.alphabetWheel, isNew: false },
    { href: `/${lang}/${getSlug('library', lang)}`, label: t.library },
  ];
  
  const secondaryNavLinks = [
    { href: `/${lang}/${getSlug('blog', lang)}`, label: t.blog },
    { href: `/${lang}/${getSlug('guide', lang)}`, label: t.guide },
    { href: `/${lang}/${getSlug('faq', lang)}`, label: t.faq },
    { href: `/${lang}/${getSlug('whats-new', lang)}`, label: t.whatsNew },
  ];

  const externalLinks = [
    { href: 'https://pileouface.net/', label: 'Pile ou Face', isNew: false },
    { href: 'https://jeu-2048.com/', label: 'Jeux 2048', isNew: false },
  ];

  const allNavLinks = [...mainNavLinks, ...secondaryNavLinks];

  const languageLinks = [
      { lang: 'fr', label: 'Français', flag: '🇫🇷' },
      { lang: 'en', label: 'English', flag: '🇬🇧' },
      { lang: 'es', label: 'Español', flag: '🇪🇸' },
      { lang: 'de', label: 'Deutsch', flag: '🇩🇪' },
      { lang: 'pt', label: 'Português', flag: '🇵🇹' },
  ];

  const currentLanguage = languageLinks.find(link => link.lang === lang) || languageLinks[0];

 const renderNavLink = (link: typeof allNavLinks[0] | typeof externalLinks[0], isMobile: boolean) => {
    const isExternal = 'href' in link && (link.href.startsWith('http') || link.href.startsWith('https'));

    if (isExternal) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "font-medium text-muted-foreground hover:text-primary transition-colors relative",
                    isMobile ? 'text-lg text-foreground flex items-center' : 'text-sm'
                )}
            >
                <span className="inline-flex items-center">{link.label}</span>
            </a>
        );
    }
  
    return (
    <Link
      href={link.href}
      onClick={() => isMobile && setIsSheetOpen(false)}
      className={cn(
        "font-medium text-muted-foreground hover:text-primary transition-colors relative",
        isMobile ? 'text-lg text-foreground flex items-center' : 'text-sm block py-2 px-1'
      )}
    >
      <span className="inline-flex items-center">{link.label}
        {link.isNew && isMobile && (
            <Badge variant="destructive" className="ml-2 text-xs px-1.5 h-4 animate-pulse">{t.new}</Badge>
        )}
      </span>
      {link.isNew && !isMobile && (
          <Badge variant="destructive" className={cn(
            "text-xs px-1.5 h-4 animate-pulse absolute -top-1 -right-4"
          )}>
          {t.new}
          </Badge>
      )}
    </Link>
  )};

  return (
    <header className="py-3 px-4 sm:px-6 lg:px-8 bg-background border-b sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center text-xl font-bold text-foreground/90 font-headline tracking-wider">
          <Dices className="mr-2.5 h-6 w-6 text-primary" />
          <span>{t.home}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <div key={link.href}>{renderNavLink(link, false)}</div>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                   <span className="sr-only">{t.openMenu}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {secondaryNavLinks.map((link) => (
                  <DropdownMenuItem asChild key={link.href}>
                    <Link href={link.href} className="font-medium">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator/>
                 {externalLinks.map((link) => (
                    <DropdownMenuItem asChild key={link.href}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium w-full">
                            {link.label}
                        </a>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleShare} className="gap-2">
                   <Share2 className="h-4 w-4" />
                   <span>{t.share}</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Languages className="mr-2 h-4 w-4" />
                        <span>{t.language}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        {languageLinks.map(link => (
                          <DropdownMenuItem asChild key={link.lang}>
                              <a href={getLocalizedPath(link.lang)} className="flex items-center gap-2">
                                <span>{link.flag}</span>
                                <span>{link.label}</span>
                              </a>
                          </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
        </nav>

        {/* Mobile and Tablet Navigation */}
        <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">{t.openMenu}</span>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-left flex items-center">
                          <Dices className="h-6 w-6 mr-2 text-primary" />
                          <span>{t.menu}</span>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 py-8">
                        {allNavLinks.map((link) => (
                          <div key={link.href}>{renderNavLink(link, true)}</div>
                        ))}
                        <Separator className="my-2"/>
                        {externalLinks.map((link) => (
                          <div key={link.href}>{renderNavLink(link, true)}</div>
                        ))}
                         <Button
                            onClick={handleShare}
                            variant="outline"
                            className="flex items-center gap-2 mt-4"
                          >
                            <Share2 className="h-4 w-4" />
                            <span>{t.shareApp}</span>
                          </Button>
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 mt-2">
                              <span>{currentLanguage.flag}</span>
                              <span>{t.language}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {languageLinks.map(link => (
                                <DropdownMenuItem asChild key={link.lang}>
                                    <a href={getLocalizedPath(link.lang)} onClick={() => setIsSheetOpen(false)} className="flex items-center gap-2">
                                      <span>{link.flag}</span>
                                      <span>{link.label}</span>
                                    </a>
                                </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}

    