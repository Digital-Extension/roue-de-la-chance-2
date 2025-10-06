
"use client";

import { Mail, Briefcase, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { getContactFormSchema } from '@/lib/validation/contact-form';

interface ContactPageProps {
  translations: any;
  lang: string;
}

async function submitContactForm(values: z.infer<ReturnType<typeof getContactFormSchema>>) {
  try {
    const response = await fetch("https://n8n.coolify.webdigital-pro.ca/webhook/rouede-lachance-digitalex", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      return { success: true };
    } else {
      // Try to parse error message from n8n, otherwise use a generic one
      const errorData = await response.json().catch(() => ({ message: 'An unexpected error occurred.' }));
      return { success: false, message: errorData.message || "An error occurred on the server." };
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, message: "Could not connect to the server." };
  }
}


export default function ContactPage({ translations, lang }: ContactPageProps) {
  const t = translations[lang];
  const formSchema = getContactFormSchema(lang);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await submitContactForm(values);

    if (result.success) {
      toast({
        title: t.toastSuccessTitle,
        description: t.toastSuccessDescription,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: t.toastErrorTitle,
        description: result.message || t.toastErrorDescription,
      });
    }
    setIsSubmitting(false);
  }


  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 lg:px-8">
      <div className="bg-card text-card-foreground rounded-lg border shadow-lg p-8 space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                        <Mail className="h-6 w-6 text-primary" />
                        {t.formTitle}
                    </CardTitle>
                    <CardDescription>{t.formDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                   <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.nameLabel}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.namePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.emailLabel}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.emailPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.subjectLabel}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                               <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.subjectPlaceholder} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {t.subjects.map((subject: string) => (
                                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.messageLabel}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.messagePlaceholder}
                                className="resize-none h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isSubmitting} className="w-full font-bold text-lg py-6">
                         {isSubmitting ? t.submittingButton : <>{t.submitButton} <Send className="ml-2 h-5 w-5"/></>}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
            </Card>

            <Card className="sticky top-28">
                <CardHeader className="text-center">
                     <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="font-headline text-2xl">{t.partnershipTitle}</CardTitle>
                    <CardDescription>{t.partnershipDescription}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                        {t.partnershipText}
                    </p>
                    <Button asChild>
                        <a href={`mailto:${t.partnershipEmail}`}>{t.partnershipEmail}</a>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="text-center pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground/90 font-headline">{t.readyTitle}</h2>
            <p className="text-muted-foreground text-lg my-4">{t.readyText}</p>
            <Link href={`/${lang}`} className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
                {t.readyLink}
            </Link>
        </div>
      </div>
    </div>
  );
}
