import Link from 'next/link';
import { BlogPost } from '@/lib/blog-posts';
import { translations as blogTranslations } from '@/content/pages/blog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, User, Clock, List, FileText } from 'lucide-react';
import { getSlug } from '@/lib/slugs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import Image from 'next/image';

interface BlogPostPageProps {
  lang: string;
  post: BlogPost;
  allPosts: BlogPost[];
}

export default function BlogPostPage({ lang, post, allPosts }: BlogPostPageProps) {
  const t = (blogTranslations as any)[lang];

  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const similarPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Roue de la Chance',
      url: 'https://larouedelachance.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Roue de la Chance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://larouedelachance.com/og-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://larouedelachance.com/${lang}/${post.slug}`,
    },
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-4xl mx-auto py-12 px-4 lg:px-8">
        <article>
          <header className="mb-8">
            <Link href={`/${lang}/${getSlug('blog', lang)}`} className="text-primary hover:underline flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4"/>
              {t.allPosts}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground/90 font-headline tracking-wider mb-4 scroll-m-28">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{t.by} {post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(lang)}</time>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min de lecture</span>
                </div>
              )}
            </div>
          </header>

          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-lg mb-8"
            data-ai-hint={post.aiHint}
            priority
          />
          
          <Card className="mb-8 bg-card/50 border-2 border-dashed">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-3">
                    <List className="h-6 w-6 text-primary"/>
                    Aperçu de l'article
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2 scroll-m-28">
                        <FileText className="h-5 w-5 text-muted-foreground"/>
                        Points clés
                    </h3>
                    <p className="text-muted-foreground pl-7">{post.description}</p>
                </div>
                {post.toc && post.toc.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2 scroll-m-28">
                            <List className="h-5 w-5 text-muted-foreground"/>
                            Table des matières
                        </h3>
                        <ul className="pl-7 space-y-1 list-disc list-inside">
                            {post.toc.map(item => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`} className="text-primary hover:underline underline-offset-2">
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
          </Card>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <nav className="mt-12 pt-8 border-t flex justify-between items-center">
          <div>
            {previousPost && (
              <Link href={`/${lang}/${previousPost.slug}`}>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4"/>
                  {t.previous}
                </Button>
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link href={`/${lang}/${nextPost.slug}`}>
                <Button variant="outline">
                  {t.next}
                  <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {similarPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 font-headline scroll-m-28">
              {t.similarPosts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarPosts.map((p) => (
                <Link href={`/${lang}/${p.slug}`} key={p.slug} className="group block">
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <Image
                        src={p.image}
                        alt={p.title}
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                        data-ai-hint={p.aiHint}
                      />
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="font-headline text-lg group-hover:text-primary transition-colors scroll-m-28">
                        {p.title}
                      </h3>
                      <CardDescription className="text-sm text-muted-foreground">
                        {p.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 justify-start">
                      <div className="flex items-center text-primary font-semibold">
                        {t.readMore}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
