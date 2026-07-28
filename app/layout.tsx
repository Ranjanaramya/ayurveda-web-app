import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { LayoutShell } from '../components/layout/LayoutShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ayurvedacare.lk'),
  title: {
    default: 'AyurVeda Care Hospital | Authentic Sri Lankan Ayurvedic Treatment & Wellness Retreat',
    template: '%s | AyurVeda Care Hospital',
  },
  description:
    'Experience authentic, NABH & Sri Lanka Department of Ayurveda approved healing protocols curated by legendary physicians. Panchakarma detox, spine rehabilitation, and wellness retreats.',
  keywords: [
    'Ayurveda Hospital Sri Lanka',
    'Authentic Panchakarma Detox',
    'Ayurvedic Treatment Sri Lanka',
    'Ayurvedic Wellness Retreat',
    'Spine and Joint Rehabilitation',
    'Deshiya Cikitsa Sri Lanka',
  ],
  authors: [{ name: 'AyurVeda Care Hospital' }],
  creator: 'AyurVeda Care Hospital',
  publisher: 'AyurVeda Care Hospital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ayurvedacare.lk',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayurvedacare.lk',
    title: 'AyurVeda Care Hospital - Restore Your Natural Harmony & Vitality',
    description:
      'Authentic Sri Lanka Department of Ayurveda approved clinical establishment representing the finest standards of purification and patient recovery.',
    siteName: 'AyurVeda Care Hospital',
    images: [
      {
        url: 'https://img.magnific.com/premium-photo/table-with-bowls-ayurvedic-spices_6751-66.jpg',
        width: 1200,
        height: 630,
        alt: 'AyurVeda Care Hospital Sri Lanka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AyurVeda Care Hospital Sri Lanka',
    description:
      'Experience authentic, NABH-certified healing protocols curated by legendary physicians in Sri Lanka.',
    images: ['https://img.magnific.com/premium-photo/table-with-bowls-ayurvedic-spices_6751-66.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#081c15',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: 'AyurVeda Care Hospital',
    url: 'https://ayurvedacare.lk',
    logo: 'https://ayurvedacare.lk/favicon.ico',
    description:
      'Authentic, NABH & Sri Lanka Department of Ayurveda approved clinical establishment for Panchakarma detox, spine rehabilitation, and traditional Deshiya Cikitsa.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressLocality: 'Colombo',
      addressRegion: 'Western Province',
    },
    medicalSpecialty: ['Ayurvedic', 'Panchakarma', 'Rehabilitation'],
  };

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://img.magnific.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.magnific.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-mint-50 text-neutral-800 dark:bg-mint-950 dark:text-neutral-100 flex flex-col justify-between selection:bg-mint-200 dark:selection:bg-mint-900 selection:text-mint-900 transition-colors duration-300">
        {/* NextTopLoader Added for smooth page transition bar */}
        <NextTopLoader
          color="#10B981"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #10B981,0 0 5px #10B981"
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}