
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const siteUrl = 'https://larouedelachance.com';
  
  const robotsText = `
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
  `.trim();

  return new Response(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
