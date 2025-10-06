import * as z from "zod";

const formSchemas = {
  fr: z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
    subject: z.string({ required_error: "Veuillez sélectionner un sujet."}).min(1, { message: "Veuillez sélectionner un sujet." }),
    message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }).max(500, { message: "Le message ne peut pas dépasser 500 caractères." }),
  }),
  en: z.object({
      name: z.string().min(2, { message: "Name must be at least 2 characters." }),
      email: z.string().email({ message: "Please enter a valid email address." }),
      subject: z.string({ required_error: "Please select a subject."}).min(1, { message: "Please select a subject." }),
      message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message cannot exceed 500 characters." }),
  }),
  es: z.object({
      name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
      email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
      subject: z.string({ required_error: "Por favor, selecciona un asunto." }).min(1, { message: "Por favor, selecciona un asunto." }),
      message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500, { message: "El mensaje no puede exceder los 500 caracteres." }),
  }),
  de: z.object({
      name: z.string().min(2, { message: "Der Name muss mindestens 2 Zeichen lang sein." }),
      email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
      subject: z.string({ required_error: "Bitte wählen Sie einen Betreff aus." }).min(1, { message: "Bitte wählen Sie einen Betreff aus." }),
      message: z.string().min(10, { message: "Die Nachricht muss mindestens 10 Zeichen lang sein." }).max(500, { message: "Die Nachricht darf 500 Zeichen nicht überschreiten." }),
  }),
  pt: z.object({
      name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
      email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
      subject: z.string({ required_error: "Por favor, selecione um assunto." }).min(1, { message: "Por favor, selecione um assunto." }),
      message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." }).max(500, { message: "A mensagem não pode exceder 500 caracteres." }),
  }),
};

type LanguageKey = keyof typeof formSchemas;

export const getContactFormSchema = (lang: string) => {
    return formSchemas[lang as LanguageKey] || formSchemas.fr;
};
