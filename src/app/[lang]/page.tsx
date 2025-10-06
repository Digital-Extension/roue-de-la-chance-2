
import type { Metadata } from 'next';
import HomePageClient from '@/components/home-page-client';

type Lang = 'fr' | 'en' | 'es' | 'de' | 'pt';
const SITE_URL = 'https://larouedelachance.com';

const homePageTranslations = {
  fr: {
    metaTitle: "Roue de la Chance | Roulette Aléatoire & Personnalisable",
    metaDescription: "Créez votre roue de la chance personnalisable en quelques secondes ! Notre roue du hasard 100% gratuite est l'outil parfait pour vos tirages au sort (choisir des noms, des couleurs) ou pour prendre une décision (Oui ou Non ?). Lancez cette roulette aléatoire et créez votre propre roue de la chance dès maintenant !",
    pageTitle: "Roue de la Chance : Roulette Aléatoire en Ligne",
    pageDescription: "Créez une roue de la chance personnalisable en quelques secondes. Simple, rapide et 100% gratuit.",
    defaultOptions: [
      { id: '1', name: 'Oui' }, { id: '2', name: 'Non' }, { id: '3', name: 'Peut-être' },
      { id: '4', name: 'Jamais' }, { id: '5', name: 'Toujours' }, { id: '6', name: 'Demain' },
      { id: '7', name: 'Ressayer' }, { id: '8', name: 'Chance' },
    ],
    storageWarning: "Sauvegarde automatique : Vos options de roue et l'historique sont enregistrés dans votre navigateur.",
    spinButton: "LANCER", customizeTooltip: "Personnaliser", shuffleTooltip: "Mélanger",
    resultsTooltip: "Historique", hideTooltip: "Masquer le panneau", showTooltip: "Afficher le panneau",
    openPanelToCustomizeTitle: "Panneau masqué",
    openPanelToCustomizeDescription: "Affichez le panneau pour personnaliser la roue.",
    whyUseTitle: "Pourquoi utiliser notre Roue de la Chance ?",
    whyUseDescription: "Découvrez pourquoi notre roue aléatoire est l'outil parfait pour vous amuser et prendre des décisions.",
    feature1Title: "Simple et Rapide", feature1Description: "Créez et lancez votre roue en quelques secondes. Aucune inscription requise.",
    feature2Title: "Entièrement Personnalisable", feature2Description: "Ajoutez, modifiez ou supprimez des options. Créez une roue de la chance personnalisable pour tous vos besoins.",
    feature3Title: "100% Gratuit", feature3Description: "Profitez de toutes les fonctionnalités de notre roue en ligne gratuitement. Notre outil est et restera gratuit.",
    discoverTitle: "Découvrez la Roue de la Chance, votre Roue du Hasard en ligne",
    discoverDescription: "Un outil polyvalent pour les tirages, le hasard et la prise de décision.",
    whatIsTitle: "Qu'est-ce que la Roue de la Chance ?",
    whatIsDescription: "C'est une roue virtuelle personnalisable qui permet de faire des tirages au sort de manière simple et visuelle. Entrez vos options dans notre générateur de roue aléatoire, lancez la roue et laissez le hasard décider !",
    howToTitle: "Comment fonctionne notre roulette aléatoire ?",
    howToSteps: [
        "<strong>Personnalisez vos options :</strong> Ajoutez les noms, tâches, ou choix que vous souhaitez dans la section 'Personnaliser' de la roue de la chance.",
        "<strong>Lancez la roue du hasard :</strong> Cliquez sur le gros bouton central pour la faire tourner.",
        "<strong>Obtenez votre résultat :</strong> La roue s'arrêtera sur l'une des options, désignant le 'gagnant' de manière totalement aléatoire.",
        "<strong>Consultez l'historique :</strong> Retrouvez tous vos tirages précédents dans l'onglet 'Résultats'."
    ],
    unlimitedUsesTitle: "Des usages illimités pour la Roue Aléatoire",
    unlimitedUsesItems: [
        "<strong>Pour les enseignants :</strong> Utilisez une roue de la chance pour désigner un élève au hasard.",
        "<strong>En famille :</strong> Qui choisit le film ce soir ? La roue du hasard décide !",
        "<strong>Entre amis :</strong> Quel défi lancer lors de votre prochaine soirée ? Laissez la roulette aléatoire choisir.",
        "<strong>Pour les concours :</strong> Tirez au sort le gagnant d'un cadeau en direct avec notre roue en ligne."
    ],
    multipleWheelsPowerTitle: "La puissance de plusieurs roues de la chance",
    multipleWheelsPowerDescription: "Bientôt, vous pourrez faire tourner plusieurs roues en même temps. Imaginez les possibilités :",
    examplesTitle: "Exemples :",
    examplesItems: [
        "<strong>Repas :</strong> Une roue aléatoire pour l'entrée, une pour le plat, une pour le dessert.",
        "<strong>Jeu de rôle :</strong> Une roue du hasard pour le personnage, une pour l'action, une pour le lieu.",
        "<strong>Workouts :</strong> Une roue de la chance pour l'exercice, une pour le nombre de répétitions."
    ],
    libraryTitle: "Découvrez nos autres roues de la chance",
    libraryDescription: "Découvrez notre collection de roues du hasard thématiques prêtes à l'emploi. Voici quelques favoris de nos utilisateurs :",
    libraryLaunch: "Lancer la roue",
    librarySeeAll: "Voir toute la bibliothèque",
    libraryWheels: [
        { title: "Roue de la chance des Couleurs", description: "Tirez une couleur au hasard. Idéal pour les jeux, les défis artistiques ou pour choisir des thèmes visuels.", slugKey: 'color-wheel', image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/roue-des-couleurs.webp', aiHint: 'color palette' },
        { title: "Roue de la chance : Oui, Non, Peut-être", description: "Pour les décisions nuancées, ajoutez une troisième option. Idéal quand un simple oui/non ne suffit pas.", slugKey: "yes-no-maybe", image: "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/yes-non-maybe-spin-wheel.webp", aiHint: "thinking person" },
        { title: "Roue de la chance : Top 10 Films d'Action", description: "Indécis sur le film à regarder ce soir ? Lancez la roue pour choisir un classique parmi notre top 10.", slugKey: "top-10-action-movies", image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/Top-10-films.png', aiHint: "action movie explosion" }
    ],
    faqTitle: "Questions Fréquemment Posées",
    faqDescription: "Vous avez des questions sur la roue de la chance ? Nous avons les réponses.",
    faqItems: [
      { q: "La roue est-elle vraiment aléatoire ?", a: "<strong>Absolument.</strong> Notre roue du hasard utilise un algorithme de génération de nombres aléatoires pour garantir que chaque résultat est <strong>imprévisible et indépendant</strong> des tours précédents. Chaque segment a une probabilité égale d'être sélectionné, assurant un tirage 100% équitable." },
      { q: "Est-ce que la roue en ligne est gratuite ?", a: "<strong>Oui, notre outil est 100% gratuit</strong> et le restera. Toutes les fonctionnalités de notre roulette aléatoire, comme la personnalisation des options et des couleurs, sont accessibles sans aucun coût ni inscription." },
      { q: "Puis-je sauvegarder mes roues ?", a: "Oui. Votre configuration de roue (options et couleurs) est <strong>automatiquement sauvegardée dans votre navigateur</strong>. Cela signifie que lorsque vous revenez, vous retrouvez votre roue de la chance telle que vous l'avez laissée. Pas besoin de tout recommencer à chaque visite !" },
      { q: "Comment partager ma roue de la chance personnalisable ?", a: "C'est très simple. Utilisez le bouton <strong>'Partager'</strong> situé en haut de la page. Cela générera un lien unique que vous pourrez copier et envoyer à vos amis pour qu'ils puissent utiliser la même roue en ligne hasard que vous." },
      { q: "Dans quels contextes peut-on utiliser une roue aléatoire ?", a: "Les possibilités sont infinies ! Utilisez-la pour des <strong>jeux</strong> (défis, gages), des <strong>tirages au sort</strong> équitables avec la roue du hasard, des <strong>décisions quotidiennes</strong> (quel film regarder, où manger) ou même dans un contexte <strong>professionnel</strong>." }
    ],
    faqSeeAll: "Voir toutes les questions",
    quizTitle: "Testez vos connaissances sur la Chance !",
    quizDescription: "Un petit quiz amusant pour voir si vous êtes un expert du hasard. Bonne chance !",
    quizQuestions: [
      { q: "Quelle est la probabilité d'obtenir \"Pile\" en lançant une pièce équilibrée ?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
      { q: "Combien de faces a un dé standard ?", options: ["4", "6", "8", "12"], answer: "6" },
      { q: "Lequel de ces jeux n'est PAS un jeu de pur hasard ?", options: ["La Bataille", "Pile ou Face", "Le Poker", "La Roulette"], answer: "Le Poker" },
      { q: "En Italie, comment appelle-t-on la chance ?", options: ["Fortuna", "Suerte", "Glück", "Chance"], answer: "Fortuna" },
      { q: "Quel animal est souvent considéré comme un porte-bonheur au Japon ?", options: ["Le Chien", "Le Panda", "Le Chat (Maneki-neko)", "Le Poisson rouge"], answer: "Le Chat (Maneki-neko)" }
    ],
    quizResultTitle: "Votre Résultat",
    quizScore: "Votre score : {score} sur {total}",
    quizRestart: "Recommencer le quiz",
    quizCongrats: [
        "Pas mal, mais la chance sourit aux audacieux ! Réessayez !",
        "Bon début ! La chance commence à vous sourire.",
        "Pas mal du tout ! Vous avez une bonne étoile.",
        "Excellent ! Vous et la chance, c'est une grande histoire d'amour.",
        "Parfait ! Vous êtes un véritable maître de la chance !"
    ],
    ctaTitle: "Prêt à faire tourner la roue de la chance ?", ctaDescription: "C'est gratuit, rapide et amusant.", ctaLink: "Créez votre première Roue Aléatoire dès maintenant !"
  },
  en: {
    metaTitle: "Spin Wheel | Random Picker & Custom Wheel Online",
    metaDescription: "Create a custom spin wheel with our online generator! The ultimate spin wheel of names for prize draws, a random spin wheel picker for decisions, or your own custom spin wheel design. It's fast, free, and easy to use. Spin the wheel now!",
    pageTitle: "The Ultimate Spin Wheel Generator",
    pageDescription: "Create a custom spin wheel in seconds. Simple, fast, and 100% free.",
    defaultOptions: [
      { id: '1', name: 'Yes' }, { id: '2', name: 'No' }, { id: '3', name: 'Maybe' },
      { id: '4', name: 'Never' }, { id: '5', name: 'Always' }, { id: '6', name: 'Tomorrow' },
      { id: '7', name: 'Spin Again' }, { id: '8', name: 'Lucky' },
    ],
    storageWarning: "Automatic saving: Your wheel options and history are saved in your browser.",
    spinButton: "SPIN", customizeTooltip: "Customize", shuffleTooltip: "Shuffle",
    resultsTooltip: "History", hideTooltip: "Hide panel", showTooltip: "Show panel",
    openPanelToCustomizeTitle: "Panel hidden",
    openPanelToCustomizeDescription: "Show the panel to customize the wheel.",
    whyUseTitle: "Why Use Our Spin Wheel?", whyUseDescription: "Discover why our random spin wheel is the perfect tool for fun and decision-making.",
    feature1Title: "Simple and Fast", feature1Description: "Create and launch your spin wheel in seconds. No registration required.",
    feature2Title: "Fully Customizable", feature2Description: "Add, edit, or delete options. You can create a fully custom spin wheel for any purpose.",
    feature3Title: "100% Free", feature3Description: "Enjoy all features at no cost. Our spin wheel generator is and will always be free.",
    discoverTitle: "Discover the Random Spin Wheel",
    discoverDescription: "A versatile spin wheel picker for chance and decision-making.",
    whatIsTitle: "What is a Spin Wheel?",
    whatIsDescription: "It's a customizable virtual wheel that allows you to make random draws in a simple and visual way. Enter your options into our spin wheel generator, spin the wheel, and let chance decide!",
    howToTitle: "How does it work?",
    howToSteps: [
        "<strong>Customize your options:</strong> Add names, tasks, or choices to the spin wheel of names in the 'Customize' section.",
        "<strong>Spin the wheel:</strong> Click the large central button to make it spin.",
        "<strong>Get your result:</strong> The wheel will stop on one of the options, designating the 'winner' completely at random.",
        "<strong>Check the history:</strong> Find all your previous draws in the 'Results' tab."
    ],
    unlimitedUsesTitle: "Unlimited uses for the Spin Wheel Picker",
    unlimitedUsesItems: [
        "<strong>For teachers:</strong> Use a spin wheel of names to designate a student to answer a question.",
        "<strong>With family:</strong> Who chooses the movie tonight? The spin wheel picker decides!",
        "<strong>With friends:</strong> What challenge to set at your next party? Let the random spin wheel choose.",
        "<strong>For contests:</strong> Randomly draw the winner of a prize live with our spin wheel generator."
    ],
    multipleWheelsPowerTitle: "The power of multiple wheels",
    multipleWheelsPowerDescription: "Soon, you'll be able to spin multiple wheels at the same time. Imagine the possibilities:",
    examplesTitle: "Examples:",
    examplesItems: [
        "<strong>Meal:</strong> One wheel for the appetizer, one for the main course, one for the dessert.",
        "<strong>Role-playing game:</strong> One wheel for the character, one for the action, one for the location.",
        "<strong>Workouts:</strong> One wheel for the exercise, one for the number of reps."
    ],
    libraryTitle: "Some Wheels to Try",
    libraryDescription: "Explore our collection of ready-to-use themed wheels. Here are a few user favorites:",
    libraryLaunch: "Launch the wheel",
    librarySeeAll: "See the full library",
    libraryWheels: [
        { title: "Color Spin Wheel", description: "Randomly pick a color. Ideal for games, art challenges, or for choosing visual themes.", slugKey: 'color-wheel', image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/roue-des-couleurs.webp', aiHint: 'color palette' },
        { title: "Yes, No, Maybe Spin Wheel", description: "For nuanced decisions, add a third option. Ideal when a simple yes/no is not enough.", slugKey: "yes-no-maybe", image: "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/yes-non-maybe-spin-wheel.webp", aiHint: "thinking person" },
        { title: "Top 10 Action Movies Spin Wheel", description: "Undecided on what movie to watch tonight? Spin the wheel to pick a classic from our top 10.", slugKey: "top-10-action-movies", image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/Top-10-films.png', aiHint: "action movie explosion" }
    ],
    faqTitle: "Frequently Asked Questions",
    faqDescription: "Got questions? We've got answers.",
    faqItems: [
      { q: "Is the wheel truly random?", a: "<strong>Absolutely.</strong> Our wheel uses a Random Number Generator (RNG) algorithm to ensure that every result is <strong>unpredictable and independent</strong> of previous spins. Each segment has an equal probability of being selected, guaranteeing a 100% fair draw." },
      { q: "Is it free?", a: "<strong>Yes, our tool is 100% free</strong> and will remain so. All core features, like customizing options and colors, are available at no cost and with no registration required. We want to provide a simple and accessible tool for everyone." },
      { q: "Can I save my wheels?", a: "Yes. Your wheel configuration (options and colors) is <strong>automatically saved in your browser</strong>. This means when you return, you'll find your wheel just as you left it. No need to start over every time!" },
      { q: "How do I share my custom wheel?", a: "It's very simple. Use the <strong>'Share' button</strong> at the top of the page. This will generate a unique link that you can copy and send to your friends, family, or audience so they can use the exact same wheel as you." },
      { q: "What can I use a wheel for?", a: "The possibilities are endless! Use it for <strong>games</strong> (challenges, dares), fair <strong>draws</strong> (contests, giveaways), <strong>daily decisions</strong> (which movie to watch, where to eat), or even in a <strong>professional</strong> context to assign tasks or liven up meetings." }
    ],
    faqSeeAll: "See all questions", 
    quizTitle: "Test your Luck Knowledge!",
    quizDescription: "A fun little quiz to see if you're an expert on chance. Good luck!",
    quizQuestions: [
        { q: "What is the probability of getting 'Heads' when flipping a fair coin?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
        { q: "How many faces does a standard die have?", options: ["4", "6", "8", "12"], answer: "6" },
        { q: "Which of these is NOT a game of pure chance?", options: ["War (card game)", "Coin Flip", "Poker", "Roulette"], answer: "Poker" },
        { q: "In Italy, what is the word for 'luck'?", options: ["Fortuna", "Suerte", "Glück", "Chance"], answer: "Fortuna" },
        { q: "Which animal is often considered a good luck charm in Japan?", options: ["Dog", "Panda", "Cat (Maneki-neko)", "Goldfish"], answer: "Cat (Maneki-neko)" }
    ],
    quizResultTitle: "Your Result",
    quizScore: "Your score: {score} out of {total}",
    quizRestart: "Restart Quiz",
    quizCongrats: [
        "Not bad, but fortune favors the bold! Try again!",
        "Good start! Luck is beginning to smile on you.",
        "Not bad at all! You have a lucky star.",
        "Excellent! You and luck are a great love story.",
        "Perfect! You are a true master of luck!"
    ],
    ctaTitle: "Ready to spin the wheel?", ctaDescription: "It's free, fast, and fun.", ctaLink: "Create your first Random Wheel now!"
  },
  es: {
    metaTitle: "Ruleta Giratoria | Rueda de la Fortuna Online y Personalizable",
    metaDescription: "¡Crea tu rueda de premios personalizada con nuestra ruleta giratoria online gratis! La mejor herramienta de rueda giratoria para eventos, sorteos y promociones. ¡Aprende cómo hacer una rueda giratoria interactiva ahora!",
    pageTitle: "La Mejor Ruleta Giratoria Online",
    pageDescription: "Crea una rueda de premios personalizada en segundos. Nuestra ruleta giratoria es simple, rápida y 100% gratis.",
    defaultOptions: [
      { id: '1', name: 'Sí' }, { id: '2', name: 'No' }, { id: '3', name: 'Quizás' },
      { id: '4', name: 'Nunca' }, { id: '5', name: 'Siempre' }, { id: '6', name: 'Mañana' },
      { id: '7', name: 'De nuevo' }, { id: '8', name: 'Suerte' },
    ],
    storageWarning: "Guardado automático: Las opciones de tu rueda de la fortuna y el historial se guardan en tu navegador.",
    spinButton: "GIRAR", customizeTooltip: "Personalizar", shuffleTooltip: "Mezclar",
    resultsTooltip: "Historial", hideTooltip: "Ocultar panel", showTooltip: "Mostrar panel",
    openPanelToCustomizeTitle: "Panel oculto",
    openPanelToCustomizeDescription: "Muestra el panel para personalizar la ruleta.",
    whyUseTitle: "¿Por qué usar nuestra Ruleta Giratoria?", whyUseDescription: "Descubre por qué nuestra rueda de la fortuna es la herramienta perfecta para divertirte y tomar decisiones.",
    feature1Title: "Simple y Rápido", feature1Description: "Crea y lanza tu ruleta giratoria en segundos. No es necesario registrarse.",
    feature2Title: "Rueda de Premios Personalizada", feature2Description: "Añade, edita o elimina opciones. Crea una rueda de premios personalizada para cualquier necesidad.",
    feature3Title: "100% Gratis", feature3Description: "Disfruta de todas las funciones de nuestra ruleta giratoria online gratis. Nuestra herramienta es y será siempre gratuita.",
    discoverTitle: "Descubre la Rueda de la Fortuna",
    discoverDescription: "Una herramienta versátil para el azar, sorteos y la toma de decisiones.",
    whatIsTitle: "¿Qué es una Ruleta Giratoria?",
    whatIsDescription: "Es una rueda virtual que puedes personalizar para realizar sorteos de manera visual. ¡Introduce tus opciones en nuestro generador de ruleta giratoria, hazla girar y deja que el azar decida!",
    howToTitle: "¿Cómo hacer una rueda giratoria interactiva?",
    howToSteps: [
        "<strong>Personaliza tus opciones:</strong> Añade nombres o premios en la sección 'Personalizar' de la rueda de la fortuna.",
        "<strong>Lanza la ruleta giratoria:</strong> Haz clic en el gran botón central para que gire.",
        "<strong>Obtén tu resultado:</strong> La rueda se detendrá en una opción, designando al 'ganador' de forma totalmente aleatoria.",
        "<strong>Consulta el historial:</strong> Encuentra todos tus sorteos anteriores en la pestaña 'Resultados'."
    ],
    unlimitedUsesTitle: "Usos ilimitados para la Rueda de Sorteos",
    unlimitedUsesItems: [
        "<strong>Para profesores:</strong> Usa una ruleta con nombres para designar a un alumno.",
        "<strong>En familia:</strong> ¿Quién elige la película? ¡La rueda de la fortuna decide!",
        "<strong>Herramienta de rueda giratoria para eventos:</strong> Es la mejor ruleta giratoria para promociones en ferias o activaciones de marca.",
        "<strong>Rueda giratoria para sorteos:</strong> Realiza sorteos en vivo en redes sociales de manera transparente y emocionante."
    ],
    multipleWheelsPowerTitle: "El poder de múltiples ruletas",
    multipleWheelsPowerDescription: "Pronto podrás girar varias ruedas de premios personalizadas al mismo tiempo. Imagina las posibilidades:",
    examplesTitle: "Ejemplos:",
    examplesItems: [
        "<strong>Comida:</strong> Una ruleta para el entrante, una para el plato principal, una para el postre.",
        "<strong>Juego de rol:</strong> Una rueda de la fortuna para el personaje, una para la acción, una para el lugar.",
        "<strong>Entrenamientos:</strong> Una ruleta para el ejercicio, una para el número de repeticiones."
    ],
    libraryTitle: "Algunas ruletas para probar",
    libraryDescription: "Explora nuestra colección de ruedas temáticas listas para usar. Aquí tienes algunas de las favoritas de nuestros usuarios:",
    libraryLaunch: "Lanzar la ruleta",
    librarySeeAll: "Ver toda la biblioteca",
    libraryWheels: [
        { title: "Ruleta de Colores en Línea", description: "Elige un color al azar. Ideal para juegos, desafíos artísticos o para seleccionar temas visuales.", slugKey: 'color-wheel', image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/roue-des-couleurs.webp', aiHint: 'color palette' },
        { title: "Ruleta en línea Sí, No, Quizás", description: "Para decisiones con matices, añade una tercera opción. Ideal cuando un simple sí/no no es suficiente.", slugKey: "yes-no-maybe", image: "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/yes-non-maybe-spin-wheel.webp", aiHint: "thinking person" },
        { title: "Ruleta en Línea: Top 10 Películas de Acción", description: "¿Indeciso sobre qué película ver esta noche? Gira la ruleta para elegir un clásico de nuestro top 10.", slugKey: "top-10-action-movies", image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/Top-10-films.png', aiHint: "action movie explosion" }
    ],
    faqTitle: "Preguntas Frecuentes",
    faqDescription: "¿Tienes preguntas? Nosotros tenemos las respuestas sobre nuestra rueda giratoria.",
    faqItems: [
      { q: "¿La ruleta giratoria es realmente aleatoria?", a: "<strong>Por supuesto.</strong> Nuestra rueda utiliza un algoritmo de generación de números aleatorios (RNG) para garantizar que cada resultado sea <strong>impredecible e independiente</strong> de los giros anteriores. Cada segmento tiene la misma probabilidad de ser seleccionado, asegurando un sorteo 100% justo." },
      { q: "¿Es gratis usar la rueda de la fortuna?", a: "<strong>Sí, nuestra herramienta es 100% gratuita</strong> y seguirá siéndolo. Todas las funciones principales, como la creación de una rueda de premios personalizada, están disponibles sin coste ni necesidad de registro. Queremos ofrecer una herramienta sencilla y accesible para todos." },
      { q: "¿Puedo guardar mis ruletas personalizadas?", a: "Sí. La configuración de tu ruleta se <strong>guarda automáticamente en tu navegador</strong>. Esto significa que cuando vuelvas, encontrarás tu rueda tal como la dejaste. ¡No es necesario empezar de cero cada vez!" },
      { q: "¿Cómo comparto mi rueda de premios personalizada?", a: "Es muy fácil. Utiliza el botón <strong>'Compartir'</strong> situado en la parte superior de la página. Esto generará un enlace único que podrás copiar y enviar a tus amigos o clientes para que puedan usar la misma ruleta que tú." },
      { q: "¿Dónde puedo comprar una rueda giratoria para negocios?", a: "¡No necesitas comprar nada! Nuestra <strong>ruleta giratoria online gratis</strong> es la solución perfecta para negocios. Úsala como una herramienta de rueda giratoria para eventos, ferias comerciales o como la mejor ruleta giratoria para promociones en tu tienda online." }
    ],
    faqSeeAll: "Ver todas las preguntas",
    quizTitle: "¡Pon a prueba tus conocimientos sobre la Suerte!",
    quizDescription: "Un pequeño y divertido cuestionario para ver si eres un experto en el azar. ¡Buena suerte!",
    quizQuestions: [
        { q: "¿Cuál es la probabilidad de obtener 'Cara' al lanzar una moneda equilibrada?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
        { q: "¿Cuántas caras tiene un dado estándar?", options: ["4", "6", "8", "12"], answer: "6" },
        { q: "¿Cuál de estos juegos NO es un juego de puro azar?", options: ["La Guerra (cartas)", "Cara o Cruz", "El Póker", "La Ruleta"], answer: "El Póker" },
        { q: "En italiano, ¿cómo se dice 'suerte'?", options: ["Fortuna", "Suerte", "Glück", "Chance"], answer: "Fortuna" },
        { q: "¿Qué animal se considera a menudo un amuleto de la buena suerte en Japón?", options: ["El Perro", "El Panda", "El Gato (Maneki-neko)", "El Pez Dorado"], answer: "El Gato (Maneki-neko)" }
    ],
    quizResultTitle: "Tu Resultado",
    quizScore: "Tu puntuación: {score} de {total}",
    quizRestart: "Reiniciar Cuestionario",
    quizCongrats: [
        "No está mal, ¡pero la fortuna sonríe a los audaces! ¡Inténtalo de nuevo!",
        "¡Buen comienzo! La suerte empieza a sonreírte.",
        "¡Nada mal! Tienes buena estrella.",
        "¡Excelente! Tú y la suerte sois una gran historia de amor.",
        "¡Perfecto! ¡Eres un verdadero maestro de la suerte!"
    ],
    ctaTitle: "¿Listo para girar la ruleta?", ctaDescription: "Es gratis, rápido y divertido.", ctaLink: "¡Crea tu primera Rueda de la Fortuna ahora!"
  },
  de: {
    metaTitle: "Online Glücksrad & Drehrad | Erstellen Sie Ihr Zufallsrad",
    metaDescription: "Erstellen Sie Ihr individuelles Glücksrad online! Unser 100% kostenloses Drehrad ist das perfekte Werkzeug für Gewinnspiele oder um eine Entscheidung zu treffen (Ja oder Nein?). Online Glücksrad erstellen und sofort loslegen!",
    pageTitle: "Online Glücksrad: Die interaktive Drehscheibe",
    pageDescription: "Das ideale Drehrad für Ihre Gewinnspiele und Entscheidungen. Einfach, schnell und 100% kostenlos.",
    defaultOptions: [
      { id: '1', name: 'Ja' }, { id: '2', name: 'Nein' }, { id: '3', name: 'Vielleicht' },
      { id: '4', name: 'Niemals' }, { id: '5', name: 'Immer' }, { id: '6', name: 'Morgen' },
      { id: '7', name: 'Nochmal' }, { id: '8', name: 'Glück' },
    ],
    storageWarning: "Automatische Speicherung: Ihre Glücksrad-Optionen und der Verlauf werden in Ihrem Browser gespeichert.",
    spinButton: "DREHEN", customizeTooltip: "Anpassen", shuffleTooltip: "Mischen",
    resultsTooltip: "Verlauf", hideTooltip: "Panel ausblenden", showTooltip: "Panel anzeigen",
    openPanelToCustomizeTitle: "Panel ausgeblendet",
    openPanelToCustomizeDescription: "Panel anzeigen, um das Rad anzupassen.",
    whyUseTitle: "Warum unser Online-Glücksrad nutzen?", whyUseDescription: "Entdecken Sie, warum unser Glücksrad die perfekte Drehscheibe für Spaß, Gewinnspiele und Entscheidungen ist.",
    feature1Title: "Einfach und Schnell", feature1Description: "Online Glücksrad erstellen und in Sekunden drehen. Keine Anmeldung erforderlich.",
    feature2Title: "Vollständig anpassbar", feature2Description: "Fügen Sie Optionen hinzu, bearbeiten oder löschen Sie sie. Personalisieren Sie die Drehscheibe für ein einzigartiges Erlebnis.",
    feature3Title: "100% Kostenlos", feature3Description: "Genießen Sie alle Funktionen kostenlos. Unser Drehrad für Gewinnspiele ist und bleibt kostenlos.",
    discoverTitle: "Entdecken Sie das Glücksrad, Ihre Online-Drehscheibe",
    discoverDescription: "Ein vielseitiges Werkzeug für Zufall, Entscheidungen und als Drehrad für Veranstaltungen.",
    whatIsTitle: "Was ist ein Glücksrad?",
    whatIsDescription: "Es ist eine anpassbare virtuelle Drehscheibe, die es ermöglicht, auf einfache und visuelle Weise zufällige Ziehungen durchzuführen. Geben Sie Ihre Optionen ein, drehen Sie das Glücksrad und lassen Sie den Zufall entscheiden!",
    howToTitle: "Wie funktioniert es?",
    howToSteps: [
        "<strong>Passen Sie Ihre Optionen an:</strong> Fügen Sie die gewünschten Namen, Aufgaben oder Auswahlmöglichkeiten im Abschnitt 'Anpassen' der Drehscheibe hinzu.",
        "<strong>Drehen Sie das Glücksrad:</strong> Klicken Sie auf den großen zentralen Knopf, um es zu drehen.",
        "<strong>Erhalten Sie Ihr Ergebnis:</strong> Das Rad hält bei einer der Optionen an und bestimmt den 'Gewinner' völlig zufällig.",
        "<strong>Überprüfen Sie den Verlauf:</strong> Finden Sie alle Ihre vorherigen Ziehungen im Tab 'Ergebnisse'."
    ],
    unlimitedUsesTitle: "Unbegrenzte Einsatzmöglichkeiten für das Drehrad",
    unlimitedUsesItems: [
        "<strong>Für Lehrer:</strong> Bestimmen Sie einen Schüler per Zufallsprinzip mit dem Glücksrad.",
        "<strong>In der Familie:</strong> Wer wählt heute Abend den Film aus? Das Glücksrad entscheidet!",
        "<strong>Unter Freunden:</strong> Welche Herausforderung soll bei eurer nächsten Party gestellt werden? Lassen Sie das Drehrad wählen.",
        "<strong>Drehrad für Gewinnspiele:</strong> Ziehen Sie den Gewinner eines Preises live mit unserem kostenlosen Glücksrad für Werbung."
    ],
    multipleWheelsPowerTitle: "Die Macht mehrerer Glücksräder",
    multipleWheelsPowerDescription: "Bald können Sie mehrere Glücksräder gleichzeitig drehen. Stellen Sie sich die Möglichkeiten vor:",
    examplesTitle: "Beispiele:",
    examplesItems: [
        "<strong>Mahlzeit:</strong> Ein Glücksrad für die Vorspeise, eines für das Hauptgericht, eines für das Dessert.",
        "<strong>Rollenspiel:</strong> Ein Drehrad für den Charakter, eines für die Aktion, eines für den Ort.",
        "<strong>Workouts:</strong> Eine Drehscheibe für die Übung, eine für die Anzahl der Wiederholungen."
    ],
    libraryTitle: "Einige Glücksräder zum Ausprobieren",
    libraryDescription: "Entdecken Sie unsere Sammlung von fertigen thematischen Glücksrädern. Hier sind einige Favoriten unserer Benutzer:",
    libraryLaunch: "Glücksrad starten",
    librarySeeAll: "Gesamte Bibliothek ansehen",
    libraryWheels: [
        { title: "Farben-Glücksrad", description: "Wählen Sie eine zufällige Farbe aus. Ideal für Spiele, künstlerische Herausforderungen oder zur Auswahl visueller Themen.", slugKey: 'color-wheel', image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/roue-des-couleurs.webp', aiHint: 'color palette' },
        { title: "Ja-Nein-Vielleicht-Glücksrad", description: "Für nuancierte Entscheidungen fügen Sie eine dritte Option hinzu. Ideal, wenn ein einfaches Ja/Nein nicht ausreicht.", slugKey: "yes-no-maybe", image: "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/yes-non-maybe-spin-wheel.webp", aiHint: "thinking person" },
        { title: "Actionfilme-Glücksrad", description: "Unentschlossen, welchen Film Sie heute Abend sehen sollen? Drehen Sie das Glücksrad, um einen Klassiker aus unseren Top 10 auszuwählen.", slugKey: "top-10-action-movies", image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/Top-10-films.png', aiHint: "action movie explosion" }
    ],
    faqTitle: "Häufig gestellte Fragen zum Glücksrad",
    faqDescription: "Haben Sie Fragen zum Glücksrad oder zum Drehrad? Wir haben die Antworten.",
    faqItems: [
      { q: "Ist das Glücksrad wirklich zufällig?", a: "<strong>Absolut.</strong> Unser Glücksrad verwendet einen Zufallszahlengenerator (RNG), um sicherzustellen, dass jedes Ergebnis <strong>unvorhersehbar und unabhängig</strong> von früheren Drehungen ist. Jedes Segment hat die gleiche Auswahlwahrscheinlichkeit, was eine 100% faire Ziehung garantiert." },
      { q: "Ist die Nutzung kostenlos?", a: "<strong>Ja, unser Tool ist 100% kostenlos</strong> und wird es auch bleiben. Alle Kernfunktionen, wie das Anpassen von Optionen, sind ohne Kosten und ohne Registrierung verfügbar. Unser kostenloses Glücksrad für Werbung ist für alle da." },
      { q: "Kann ich meine Glücksräder speichern?", a: "Ja. Ihre Glücksrad-Konfiguration wird <strong>automatisch in Ihrem Browser gespeichert</strong>. Das bedeutet, wenn Sie zurückkehren, finden Sie Ihr Drehrad so vor, wie Sie es verlassen haben. Sie müssen nicht jedes Mal von vorne anfangen!" },
      { q: "Wie teile ich mein personalisiertes Glücksrad?", a: "Es ist ganz einfach. Verwenden Sie die Schaltfläche <strong>'Teilen'</strong> oben auf der Seite. Dadurch wird ein eindeutiger Link generiert, den Sie kopieren und an Ihre Freunde senden können, damit diese dieselbe Drehscheibe wie Sie verwenden können." },
      { q: "Muss ich ein Drehrad für mein Unternehmen kaufen?", a: "Nein, ein Drehrad kaufen für Unternehmen ist nicht nötig! Unsere Online-App ist die beste Glücksrad-App für Marketing und Veranstaltungen. Sie können sie für Werbeaktionen, Messen oder als interaktives Element auf Ihrer Website verwenden." }
    ],
    faqSeeAll: "Alle Fragen sehen",
    quizTitle: "Testen Sie Ihr Wissen über das Glück!",
    quizDescription: "Ein kleines, lustiges Quiz, um zu sehen, ob Sie ein Experte für den Zufall sind. Viel Glück!",
    quizQuestions: [
        { q: "Wie hoch ist die Wahrscheinlichkeit, bei einem fairen Münzwurf 'Kopf' zu erhalten?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
        { q: "Wie viele Seiten hat ein Standardwürfel?", options: ["4", "6", "8", "12"], answer: "6" },
        { q: "Welches dieser Spiele ist KEIN reines Glücksspiel?", options: ["Krieg (Kartenspiel)", "Kopf oder Zahl", "Poker", "Roulette"], answer: "Poker" },
        { q: "Wie sagt man auf Italienisch 'Glück'?", options: ["Fortuna", "Suerte", "Glück", "Chance"], answer: "Fortuna" },
        { q: "Welches Tier wird in Japan oft als Glücksbringer angesehen?", options: ["Der Hund", "Der Panda", "Die Katze (Maneki-neko)", "Der Goldfisch"], answer: "Die Katze (Maneki-neko)" }
    ],
    quizResultTitle: "Ihr Ergebnis",
    quizScore: "Ihre Punktzahl: {score} von {total}",
    quizRestart: "Quiz neu starten",
    quizCongrats: [
        "Nicht schlecht, aber das Glück ist mit den Mutigen! Versuchen Sie es noch einmal!",
        "Guter Anfang! Das Glück beginnt, Ihnen zu lächeln.",
        "Gar nicht schlecht! Sie stehen unter einem guten Stern.",
        "Ausgezeichnet! Sie und das Glück, das ist eine große Liebesgeschichte.",
        "Perfekt! Sie sind ein wahrer Meister des Glücks!"
    ],
    ctaTitle: "Bereit, das Glücksrad zu drehen?", ctaDescription: "Online Glücksrad erstellen - kostenlos, schnell und mit Spaß.", ctaLink: "Erstellen Sie jetzt Ihr erstes Glücksrad!"
  },
  pt: {
    metaTitle: "Roda da Sorte | Roleta Giratória Online Grátis & Personalizável",
    metaDescription: "Crie sua roda de prêmios personalizada com nossa roleta giratória online grátis! A melhor ferramenta de roda giratória para sorteios, promoções e eventos. Aprenda como criar uma roda giratória interativa agora!",
    pageTitle: "Roda da Sorte: Sua Roleta Giratória Online",
    pageDescription: "A sua roleta giratória online grátis. A ferramenta ideal para sorteios e para criar uma roda personalizada para promoções. Simples, rápida e 100% grátis.",
    defaultOptions: [
      { id: '1', name: 'Sim' }, { id: '2', name: 'Não' }, { id: '3', name: 'Talvez' },
      { id: '4', name: 'Nunca' }, { id: '5', name: 'Sempre' }, { id: '6', name: 'Amanhã' },
      { id: '7', name: 'De novo' }, { id: '8', name: 'Sorte' },
    ],
    storageWarning: "Gravação automática: As opções da sua roda da sorte e o histórico são guardados no seu navegador.",
    spinButton: "GIRAR", customizeTooltip: "Personalizar", shuffleTooltip: "Baralhar",
    resultsTooltip: "Histórico", hideTooltip: "Ocultar painel", showTooltip: "Mostrar painel",
    openPanelToCustomizeTitle: "Painel oculto",
    openPanelToCustomizeDescription: "Mostre o painel para personalizar a roda.",
    whyUseTitle: "Por que usar a nossa Roda da Sorte?", whyUseDescription: "Descubra por que a nossa roleta giratória é a ferramenta perfeita para se divertir e tomar decisões.",
    feature1Title: "Simples e Rápido", feature1Description: "Crie e gire a sua roda da sorte em segundos. Não é necessário registo.",
    feature2Title: "Totalmente Personalizável", feature2Description: "Adicione, edite ou remova opções. Crie uma roda personalizada para promoções ou qualquer outra necessidade.",
    feature3Title: "100% Grátis", feature3Description: "Desfrute de todas as funcionalidades da nossa roleta giratória online grátis. A nossa ferramenta é e será sempre gratuita.",
    discoverTitle: "Descubra a Roda da Sorte, a sua Roda Giratória para Sorteios",
    discoverDescription: "Uma ferramenta versátil para o acaso, sorteios e tomada de decisões.",
    whatIsTitle: "O que é a Roda da Sorte?",
    whatIsDescription: "É uma roda giratória virtual que pode personalizar para fazer sorteios de forma simples e visual. Insira as suas opções na nossa roleta, gire a roda e deixe o acaso decidir!",
    howToTitle: "Como criar uma roda giratória interativa?",
    howToSteps: [
        "<strong>Personalize as suas opções:</strong> Adicione nomes, tarefas ou prémios na secção 'Personalizar' da roda da sorte.",
        "<strong>Gire a roleta giratória:</strong> Clique no grande botão central para a fazer girar.",
        "<strong>Obtenha o seu resultado:</strong> A roda irá parar numa das opções, designando o 'vencedor' de forma totalmente aleatória.",
        "<strong>Consulte o histórico:</strong> Encontre todos os seus sorteios anteriores no separador 'Resultados'."
    ],
    unlimitedUsesTitle: "Usos ilimitados para a Roda Giratória para Sorteios",
    unlimitedUsesItems: [
        "<strong>Para professores:</strong> Use uma roda da sorte com nomes para designar um aluno.",
        "<strong>Em família:</strong> Quem escolhe o filme esta noite? A roda da sorte decide!",
        "<strong>Para empresas:</strong> Use-a como uma ferramenta de roda giratória para eventos. Não precisa de comprar uma roda giratória para negócios!",
        "<strong>Para concursos:</strong> Use-a como a melhor roleta giratória para marketing e sorteie o vencedor de um prémio ao vivo."
    ],
    multipleWheelsPowerTitle: "O poder de várias rodas da sorte",
    multipleWheelsPowerDescription: "Em breve, poderá girar várias rodas ao mesmo tempo. Imagine as possibilidades:",
    examplesTitle: "Exemplos:",
    examplesItems: [
        "<strong>Refeição:</strong> Uma roda para a entrada, uma para o prato principal, uma para a sobremesa.",
        "<strong>Jogo de RPG:</strong> Uma roda da sorte para a personagem, uma para a ação, uma para o local.",
        "<strong>Treinos:</strong> Uma roda giratória para o exercício, uma para o número de repetições."
    ],
    libraryTitle: "Algumas Rodas da Sorte para Experimentar",
    libraryDescription: "Explore a nossa coleção de roletas temáticas prontas a usar. Aqui estão alguns dos favoritos dos nossos utilizadores:",
    libraryLaunch: "Lançar a roda",
    librarySeeAll: "Ver a biblioteca completa",
    libraryWheels: [
        { title: "Roda da Sorte das Cores", description: "Escolha uma cor aleatoriamente. Ideal para jogos, desafios artísticos ou para selecionar temas visuais.", slugKey: 'color-wheel', image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/roue-des-couleurs.webp', aiHint: 'color palette' },
        { title: "Roda da Sorte: Sim, Não, Talvez", description: "Para decisões com nuances, adicione uma terceira opção. Ideal quando um simples sim/não não é suficiente.", slugKey: "yes-no-maybe", image: "https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/yes-non-maybe-spin-wheel.webp", aiHint: "thinking person" },
        { title: "Roda da Sorte: Top 10 Filmes de Ação", description: "Indeciso sobre que filme ver esta noite? Gire a roleta para escolher um clássico do nosso top 10.", slugKey: "top-10-action-movies", image: 'https://avisclients.digitalextension.fr/wp-content/uploads/2025/07/Top-10-films.png', aiHint: "action movie explosion" }
    ],
    faqTitle: "Perguntas Frequentes sobre a Roda da Sorte",
    faqDescription: "Tem perguntas sobre a nossa roda giratória? Nós temos as respostas.",
    faqItems: [
      { q: "A roda da sorte é realmente aleatória?", a: "<strong>Com certeza.</strong> A nossa roda giratória usa um algoritmo de Geração de Números Aleatórios (RNG) para garantir que cada resultado seja <strong>imprevisível e independente</strong> das rotações anteriores. Cada segmento tem a mesma probabilidade de ser selecionado, garantindo um sorteio 100% justo." },
      { q: "É grátis usar a roleta giratória online?", a: "<strong>Sim, a nossa ferramenta é 100% gratuita</strong> e assim permanecerá. Todas as funcionalidades principais, como criar uma roda personalizada para promoções, estão disponíveis sem custo e sem necessidade de registo." },
      { q: "Posso guardar as minhas rodas personalizadas?", a: "Sim. A configuração da sua roda da sorte é <strong>automaticamente guardada no seu navegador</strong>. Isto significa que, quando regressar, encontrará a sua roleta tal como a deixou. Não precisa de recomeçar de cada vez!" },
      { q: "Como partilho a minha roda da sorte?", a: "É muito simples. Use o botão <strong>'Partilhar'</strong> no topo da página. Isto irá gerar um link único que pode copiar e enviar aos seus amigos, família ou público para que possam usar exatamente a mesma roda que você." },
      { q: "Preciso de comprar uma roda giratória para negócios?", a: "Não! A nossa <strong>roleta giratória online grátis</strong> é a solução perfeita para empresas. Use-a como uma ferramenta de roda giratória para eventos ou como a melhor roleta giratória para marketing na sua loja online." }
    ],
    faqSeeAll: "Ver todas as perguntas",
    quizTitle: "Teste os seus conhecimentos sobre a Sorte!",
    quizDescription: "Um pequeno e divertido questionário para ver se é um especialista no acaso. Boa sorte!",
    quizQuestions: [
        { q: "Qual é a probabilidade de obter 'Cara' ao lançar uma moeda honesta?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
        { q: "Quantas faces tem um dado padrão?", options: ["4", "6", "8", "12"], answer: "6" },
        { q: "Qual destes jogos NÃO é um jogo de puro azar?", options: ["Guerra (cartas)", "Cara ou Coroa", "Póquer", "Roleta"], answer: "Póquer" },
        { q: "Em italiano, como se diz 'sorte'?", options: ["Fortuna", "Suerte", "Glück", "Chance"], answer: "Fortuna" },
        { q: "Que animal é frequentemente considerado um amuleto da sorte no Japão?", options: ["O Cão", "O Panda", "O Gato (Maneki-neko)", "O Peixe Dourado"], answer: "O Gato (Maneki-neko)" }
    ],
    quizResultTitle: "O Seu Resultado",
    quizScore: "A sua pontuação: {score} de {total}",
    quizRestart: "Reiniciar Questionário",
    quizCongrats: [
        "Nada mau, mas a sorte favorece os audazes! Tente novamente!",
        "Bom começo! A sorte está a começar a sorrir-lhe.",
        "Nada mau! Você tem uma boa estrela.",
        "Excelente! Você e a sorte, é uma grande história de amor.",
        "Perfeito! Você é um verdadeiro mestre da sorte!"
    ],
    ctaTitle: "Pronto para girar a roda da sorte?", ctaDescription: "É grátis, rápido e divertido.", ctaLink: "Crie a sua primeira Roda da Sorte agora!"
  }
};

type Props = {
  params: { lang: Lang };
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const lang = params.lang || 'fr';
  const t = homePageTranslations[lang as keyof typeof homePageTranslations] || homePageTranslations.fr;
  const canonicalUrl = `${SITE_URL}/${lang}`;
 
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
        canonical: canonicalUrl,
        languages: {
          'fr': `${SITE_URL}/fr`,
          'en': `${SITE_URL}/en`,
          'es': `${SITE_URL}/es`,
          'de': `${SITE_URL}/de`,
          'pt': `${SITE_URL}/pt`,
          'x-default': `${SITE_URL}/fr`,
        }
    },
  }
}

export default function Home({ params }: Props) {
  const lang = params.lang || 'fr';
  const t = homePageTranslations[lang as keyof typeof homePageTranslations] || homePageTranslations.fr;
  return <HomePageClient lang={lang} t={t} />;
}
