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
      <body className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased selection:bg-primary-500 selection:text-white overflow-x-hidden">
        {/* Analytics provider is conditionally rendered only when GA ID is available */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && 
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'undefined' && (
          <AnalyticsProvider gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary-50/70 to-transparent -z-10"></div>
        <div className="absolute top-[25%] right-[-15%] w-[500px] h-[500px] rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
        <div className="absolute top-[60%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
        <Header />
        <div className="pt-16 md:pt-20">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}