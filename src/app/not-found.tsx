
"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Dices } from 'lucide-react';

const translations = {
    fr: {
        title: "Redirection en cours...",
        message: "Cette page n'existe pas. Vous allez être redirigé vers l'accueil.",
    },
    en: {
        title: "Redirecting...",
        message: "This page does not exist. You will be redirected to the homepage.",
    },
    es: {
        title: "Redireccionando...",
        message: "Esta página no existe. Serás redirigido a la página de inicio.",
    },
    de: {
        title: "Weiterleitung...",
        message: "Diese Seite existiert nicht. Sie werden zur Startseite weitergeleitet.",
    },
    pt: {
        title: "Redirecionando...",
        message: "Esta página não existe. Você será redirecionado para a página inicial.",
    }
}

type Lang = keyof typeof translations;

export default function NotFound() {
    const router = useRouter();
    const pathname = usePathname();
    const [lang, setLang] = useState<Lang>('fr');

    useEffect(() => {
        const detectedLang = pathname.split('/')[1];
        const validLang = ['fr', 'en', 'es', 'de', 'pt'].includes(detectedLang) ? detectedLang as Lang : 'fr';
        setLang(validLang);
        router.replace(`/${validLang}`);
    }, [pathname, router]);

    const t = translations[lang];

    return (
        <div className="w-full h-full flex-grow flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center bg-card text-card-foreground p-8 rounded-xl border shadow-lg">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-4 rounded-full animate-spin">
                        <Dices className="h-12 w-12 text-primary" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold font-headline mb-4">{t.title}</h1>
                <p className="text-muted-foreground text-lg mb-8">{t.message}</p>
            </div>
        </div>
    );
}
