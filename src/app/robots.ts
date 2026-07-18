import type { MetadataRoute } from 'next';

// Required for Next.js static export: this route has no request-time data.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://docs.fabricator.site/sitemap.xml',
  };
}
