import type { Metadata } from 'next';
import Script from 'next/script';
import { Provider } from '@/components/provider';
import './global.css';

const siteDescription =
  'Self-hosted Minecraft server management for Fabric, Forge, NeoForge, Quilt, and Vanilla.';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.fabricator.site'),
  title: {
    default: 'Fabricator Docs',
    template: '%s | Fabricator Docs',
  },
  description: siteDescription,
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Fabricator Docs',
    title: 'Fabricator Docs',
    description: siteDescription,
    url: '/',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
        <Script
          defer
          src="https://umami.fabricator.site/script.js"
          data-website-id="8ea04109-fc8d-4790-9de6-68985399fe79"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
