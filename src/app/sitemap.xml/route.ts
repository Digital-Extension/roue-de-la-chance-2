
import { slugTranslations } from '@/lib/slugs';
import { getAllPosts } from '@/lib/blog-posts';

const URL = 'https://larouedelachance.com';
const langs = ['fr', 'en', 'es', 'de', 'pt'];

function generateUrlEntry(loc: string, priority: number, alternates: { lang: string; href: string }[], lastmod?: string) {
  const alternateLinks = alternates
      .map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>`)
          .join('\n');

            return `
              <url>
                  <loc>${loc}</loc>
                      <lastmod>${lastmod || new Date().toISOString()}</lastmod>
                          <changefreq>weekly</changefreq>
                              <priority>${priority.toFixed(1)}</priority>
                              ${alternateLinks}
                                </url>`;
                                }

                                export async function GET() {
                                  const urlEntries: string[] = [];
                                    const today = new Date().toISOString();

                                      // --- Generate URLs for static pages ---
                                        const pageKeys = Object.keys(slugTranslations);
                                          const processedPages = new Set<string>();

                                            for (const key of pageKeys) {
                                                if (processedPages.has(key)) continue;

                                                    const alternates: { lang: string; href: string }[] = [];
                                                        
                                                            // First, find all available language versions for this page key
                                                                for (const lang of langs) {
                                                                      const slug = slugTranslations[key]?.[lang];
                                                                            if (slug !== undefined) {
                                                                                    // Ensure href handles both empty and non-empty slugs correctly.
                                                                                            const href = (slug && slug.length > 0) ? `${URL}/${lang}/${slug}` : `${URL}/${lang}`;
                                                                                                    alternates.push({ lang, href });
                                                                                                          }
                                                                                                              }

                                                                                                                  // Now, create a <url> entry for EACH language version found
                                                                                                                      for (const alt of alternates) {
                                                                                                                              let priority = 0.8;
                                                                                                                                      if (key === 'home') priority = 1.0;
                                                                                                                                              else if (key === 'library' || key === 'blog') priority = 0.9;
                                                                                                                                                      else if (['yes-no', 'coin-flip', 'dice-roller', 'color-wheel', 'alphabet'].includes(key)) priority = 0.85;
                                                                                                                                                              else if (key === 'privacy' || key === 'contact') priority = 0.5;

                                                                                                                                                                      // Pass all other alternates to the entry
                                                                                                                                                                              urlEntries.push(generateUrlEntry(alt.href, priority, alternates, today));
                                                                                                                                                                                  }
                                                                                                                                                                                       processedPages.add(key);
                                                                                                                                                                                         }

                                                                                                                                                                                           // --- Generate URLs for blog posts ---
                                                                                                                                                                                             // Blog posts are language-specific and don't have alternates in this setup
                                                                                                                                                                                               for (const lang of langs) {
                                                                                                                                                                                                   const posts = getAllPosts(lang);
                                                                                                                                                                                                       for (const post of posts) {
                                                                                                                                                                                                             const loc = `${URL}/${lang}/${post.slug}`;
                                                                                                                                                                                                                   const lastmod = new Date(post.date).toISOString();
                                                                                                                                                                                                                         urlEntries.push(`
                                                                                                                                                                                                                           <url>
                                                                                                                                                                                                                               <loc>${loc}</loc>
                                                                                                                                                                                                                                   <lastmod>${lastmod}</lastmod>
                                                                                                                                                                                                                                       <changefreq>monthly</changefreq>
                                                                                                                                                                                                                                           <priority>0.7</priority>
                                                                                                                                                                                                                                             </url>`);
                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                   }

                                                                                                                                                                                                                                                     const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                                                                                                                                                                                                                                                     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlEntries.join('')}
                                                                                                                                                                                                                                                     </urlset>`;

                                                                                                                                                                                                                                                       return new Response(sitemap, {
                                                                                                                                                                                                                                                           headers: {
                                                                                                                                                                                                                                                                 'Content-Type': 'application/xml',
                                                                                                                                                                                                                                                                     },
                                                                                                                                                                                                                                                                       });
                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                       