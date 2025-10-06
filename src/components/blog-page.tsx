
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getAllPosts, BlogPost } from '@/lib/blog-posts';
import { translations } from '@/content/pages/blog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Search, Rss, Dices } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getSlug } from '@/lib/slugs';
import Image from 'next/image';

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  lang: string;
  currentPage: number;
}

export default function BlogPage({ lang, currentPage }: BlogPageProps) {
  const t = (translations as any)[lang];
  const allPosts = getAllPosts(lang);
  
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const postsToShow = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground/90 font-headline tracking-wider">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl mt-2 max-w-3xl mx-auto">
          {t.description}
        </p>
      </div>

      <div className="mb-12 max-w-lg mx-auto">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="search"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 py-6 text-lg"
            />
        </div>
      </div>

      {postsToShow.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToShow.map((post: BlogPost) => (
              <Link href={`/${lang}/${post.slug}`} key={post.slug} className="group block">
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={post.aiHint}
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <h2 className="font-headline text-xl sm:text-2xl mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <CardDescription className="text-base text-muted-foreground mb-4">
                      {post.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                     <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{t.by} {post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Calendar className="h-4 w-4" />
                             <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(lang)}</time>
                        </div>
                     </div>
                     <div className="flex items-center text-primary font-semibold">
                        {t.readMore}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                     </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-12">
                <PaginationContent>
                    <PaginationItem>
                        {currentPage > 1 ? (
                            <PaginationPrevious href={`/${lang}/${getSlug('blog', lang)}?page=${currentPage - 1}`}>
                                {t.previous}
                            </PaginationPrevious>
                        ) : (
                            <Button variant="outline" disabled>{t.previous}</Button>
                        )}
                    </PaginationItem>
                    <PaginationItem>
                        {currentPage < totalPages ? (
                            <PaginationNext href={`/${lang}/${getSlug('blog', lang)}?page=${currentPage + 1}`}>
                               {t.next}
                            </PaginationNext>
                        ) : (
                            <Button variant="outline" disabled>{t.next}</Button>
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center bg-card border rounded-lg p-12">
            <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                    <Rss className="h-12 w-12 text-primary" />
                </div>
            </div>
            <h2 className="text-2xl font-bold font-headline mb-4">{t.noArticlesTitle}</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">{t.noArticlesDescription}</p>
            <Button asChild size="lg" className="font-bold text-lg">
                <Link href={`/${lang}/${getSlug('yes-no', lang)}`}>
                    <Dices className="mr-2 h-5 w-5" />
                    {t.noArticlesButton}
                </Link>
            </Button>
        </div>
      )}
    </div>
  );
}
