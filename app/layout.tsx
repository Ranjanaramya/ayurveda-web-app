import type { Metadata } from 'next';
import './globals.css';
import { LayoutShell } from '../components/layout/LayoutShell';

export const metadata: Metadata = {
  title: 'AyurVeda Care Hospital - Restore Your Natural Harmony & Vitality',
  description:
    'Experience authentic, NABH-certified healing protocols curated by legendary physicians. Customized therapies, organic herbal formulations, and calming retreat spaces designed to align your mind, body, and spirit.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen bg-mint-50 text-neutral-800 dark:bg-mint-950 dark:text-neutral-100 flex flex-col justify-between selection:bg-mint-200 dark:selection:bg-mint-900 selection:text-mint-900 transition-colors duration-300">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
