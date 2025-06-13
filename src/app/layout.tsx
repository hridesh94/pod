import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { SITE_CONFIG } from '@/lib/constants';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans', 
  display: 'swap'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  keywords: ['podcast producer', 'audio editing', 'video editing', 'podcast marketing', 'Nepal podcast'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hrideshsapkota.com',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: '@hrideshsapkota',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased selection:bg-primary-500 selection:text-white">
        {/* Analytics provider is conditionally rendered only when GA ID is available */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && 
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'undefined' && (
          <AnalyticsProvider gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <Header />
        <div className="pt-16 md:pt-20">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}