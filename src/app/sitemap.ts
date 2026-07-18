import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

// The documentation tree is compiled at build time, so the sitemap is static.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: new URL(page.url, 'https://docs.fabricator.site').toString(),
    changeFrequency: 'weekly',
    priority: page.url === '/' ? 1 : 0.7,
  }));
}
