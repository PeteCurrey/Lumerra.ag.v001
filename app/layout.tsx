import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { LoadingSplash } from '@/components/ui/LoadingSplash';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display-loaded',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lumerra — Light. Water. Stillness.',
    template: '%s | Lumerra',
  },
  description:
    'Hand-curated hot tubs, swim spas and saunas from Europe\'s leading wellness manufacturers. Direct to your door, across the UK. 0% finance. Free delivery. 5-year warranty.',
  keywords: ['hot tubs UK', 'swim spas UK', 'saunas UK', 'Platinum Spas', 'AquaSolus', 'Hekla', 'premium hot tubs'],
  authors: [{ name: 'Lumerra' }],
  creator: 'Lumerra',
  publisher: 'Lumerra',
  metadataBase: new URL(process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://lumerra.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://lumerra.co.uk',
    siteName: 'Lumerra',
    title: 'Lumerra — Light. Water. Stillness.',
    description: 'The UK\'s most refined online wellness destination.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Lumerra — Premium Wellness' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumerra — Light. Water. Stillness.',
    description: 'The UK\'s most refined online wellness destination.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

import { LiquidTransition } from '@/components/navigation/LiquidTransition';

// ... (existing imports)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        style={{
          fontFamily: 'var(--font-body-loaded, var(--font-body))',
        }}
        className="cursor-none lg:cursor-none"
      >
        <LenisProvider>
          <LoadingSplash />
          <CustomCursor />
          <LiquidTransition />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </LenisProvider>
      </body>
    </html>
  );
}
