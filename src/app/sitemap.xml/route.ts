import { NextResponse } from 'next/server';

export async function GET() {
  // Base URL of the site; adjust as needed or use env variable
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  // List of routes to include in the sitemap. Add more paths as necessary.
  const routes = ['/', '/about', '/contact'];
  const urls = routes
    .map((path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n  </url>`)
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
