import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StoreAssistant from '@/components/layout/StoreAssistant';

export const metadata = {
  metadataBase: new URL('https://www.99storepe.in'),
  title: {
    default: '99StorePe - Best Deals & Discounts in India',
    template: '%s | 99StorePe',
  },
  description: 'Discover affordable products, deals and discounts from trusted online stores at 99StorePe.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://www.99storepe.in/',
    siteName: '99StorePe',
    title: '99StorePe - Best Deals & Discounts in India',
    description: 'Discover affordable products, deals and discounts from trusted online stores at 99StorePe.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '99StorePe - Best Deals & Discounts in India',
    description: 'Discover affordable products, deals and discounts from trusted online stores at 99StorePe.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <StoreAssistant />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
