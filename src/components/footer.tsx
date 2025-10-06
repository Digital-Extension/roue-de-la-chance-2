
import Link from 'next/link';
import { getSlug } from '@/lib/slugs';
import { Badge } from './ui/badge';
import { Dices } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  lang: string;
}

const translations = {
  fr: {
    copyright: "Tous droits réservés.",
    createdBy: "crée par",
    navigation: "Navigation",
    home: "Accueil",
    library: "Bibliothèque",
    blog: "Blog",
    ourWheels: "Nos Roues",
    yesNoWheel: "Roue Oui ou Non",
    colorWheel: "Roue des Couleurs",
    alphabetWheel: "Roue de l'Alphabet",
    coinFlip: "Pile ou Face",
    diceRoller: "Dé en ligne",
    resources: "Ressources",
    guide: "Guide d'utilisation",
    faq: "FAQ",
    legal: "Légal & Contact",
    contact: "Contact & Partenariats",
    privacy: "Politique de confidentialité",
    new: "Nouveau",
    whatsNew: "Nouveautés"
  },
  en: {
    copyright: "All rights reserved.",
    createdBy: "created by",
    navigation: "Navigation",
    home: "Home",
    library: "Library",
    blog: "Blog",
    ourWheels: "Our Wheels",
    yesNoWheel: "Yes or No Wheel",
    colorWheel: "Color Wheel",
    alphabetWheel: "Alphabet Wheel",
    coinFlip: "Coin Flip",
    diceRoller: "Dice Roller",
    resources: "Resources",
    guide: "User Guide",
    faq: "FAQ",
    legal: "Legal & Contact",
    contact: "Contact & Partnerships",
    privacy: "Privacy Policy",
    new: "New",
    whatsNew: "What's New"
  },
  es: {
    copyright: "Todos los derechos reservados.",
    createdBy: "creado por",
    navigation: "Navegación",
    home: "Inicio",
    library: "Biblioteca",
    blog: "Blog",
    ourWheels: "Nuestras Ruletas",
    yesNoWheel: "Ruleta Sí o No",
    colorWheel: "Ruleta de Colores",
    alphabetWheel: "Ruleta del Alfabeto",
    coinFlip: "Cara o Cruz",
    diceRoller: "Dado en Línea",
    resources: "Recursos",
    guide: "Guía de usuario",
    faq: "FAQ",
    legal: "Legal y Contacto",
    contact: "Contacto y Colaboraciones",
    privacy: "Política de Privacidad",
    new: "Nuevo",
    whatsNew: "Novedades"
  },
  de: {
    copyright: "Alle Rechte vorbehalten.",
    createdBy: "erstellt von",
    navigation: "Navigation",
    home: "Startseite",
    library: "Bibliothek",
    blog: "Blog",
    ourWheels: "Unsere Glücksräder",
    yesNoWheel: "Ja oder Nein Rad",
    colorWheel: "Farbrad",
    alphabetWheel: "Alphabet-Rad",
    coinFlip: "Münzwurf",
    diceRoller: "Online Würfel",
    resources: "Ressourcen",
    guide: "Anleitung",
    faq: "FAQ",
    legal: "Rechtliches & Kontakt",
    contact: "Kontakt & Partnerschaften",
    privacy: "Datenschutzrichtlinie",
    new: "Neu",
    whatsNew: "Neuigkeiten"
  },
  pt: {
    copyright: "Todos os direitos reservados.",
    createdBy: "criado por",
    navigation: "Navegação",
    home: "Início",
    library: "Biblioteca",
    blog: "Blog",
    ourWheels: "Nossas Rodas",
    yesNoWheel: "Roda Sim ou Não",
    colorWheel: "Roda das Cores",
    alphabetWheel: "Roda do Alfabeto",
    coinFlip: "Cara ou Coroa",
    diceRoller: "Dado Online",
    resources: "Recursos",
    guide: "Guia do usuário",
    faq: "FAQ",
    legal: "Legal & Contato",
    contact: "Contato e Parcerias",
    privacy: "Política de Privacidade",
    new: "Novo",
    whatsNew: "Novidades"
  }
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = (translations[lang as keyof typeof translations] || translations.fr);
  
  const footerLinks = {
      navigation: [
          { href: `/${lang}`, label: t.home },
          { href: `/${lang}/${getSlug('library', lang)}`, label: t.library },
          { href: `/${lang}/${getSlug('blog', lang)}`, label: t.blog },
      ],
      ourWheels: [
          { href: `/${lang}/${getSlug('yes-no', lang)}`, label: t.yesNoWheel },
          { href: `/${lang}/${getSlug('coin-flip', lang)}`, label: t.coinFlip, isNew: true },
          { href: `/${lang}/${getSlug('dice-roller', lang)}`, label: t.diceRoller, isNew: true },
          { href: `/${lang}/${getSlug('color-wheel', lang)}`, label: t.colorWheel },
          { href: `/${lang}/${getSlug('alphabet', lang)}`, label: t.alphabetWheel },
      ],
      resources: [
          { href: `/${lang}/${getSlug('guide', lang)}`, label: t.guide },
          { href: `/${lang}/${getSlug('faq', lang)}`, label: t.faq },
          { href: `/${lang}/${getSlug('whats-new', lang)}`, label: t.whatsNew },
      ],
      legal: [
          { href: `/${lang}/${getSlug('contact', lang)}`, label: t.contact },
          { href: `/${lang}/${getSlug('privacy', lang)}`, label: t.privacy },
      ]
  };

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="w-full max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{t.navigation}</h3>
              <ul className="space-y-3">
                  {footerLinks.navigation.map(link => (
                      <li key={link.href}>
                          <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-base">
                              {link.label}
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>
          
          <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{t.ourWheels}</h3>
              <ul className="space-y-3">
                  {footerLinks.ourWheels.map(link => (
                     <li key={link.href}>
                        <Link href={link.href} className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-base">
                          <span>{link.label}</span>
                          {link.isNew && (
                            <Badge variant="destructive" className="ml-2 animate-pulse">{t.new}</Badge>
                          )}
                        </Link>
                    </li>
                  ))}
              </ul>
          </div>

          <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{t.resources}</h3>
              <ul className="space-y-3">
                  {footerLinks.resources.map(link => (
                      <li key={link.href}>
                          <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-base">
                              {link.label}
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>

          <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{t.legal}</h3>
              <ul className="space-y-3">
                  {footerLinks.legal.map(link => (
                      <li key={link.href}>
                          <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-base">
                              {link.label}
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href={`/${lang}`} className="flex items-center text-xl font-bold text-foreground/90 font-headline tracking-wider">
              <Dices className="mr-2.5 h-6 w-6 text-primary" />
              <span>Roue de la Chance</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center sm:text-right">
              &copy; {currentYear} Roue de la Chance. {t.copyright}
              <span className="hidden sm:inline"> | </span>
              <span className="block sm:inline mt-1 sm:mt-0">{t.createdBy}{' '}
                <a href="https://agence.digitalextension.fr/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Digital Extension
                </a>
              </span>
            </p>
        </div>
      </div>
    </footer>
  );
}
