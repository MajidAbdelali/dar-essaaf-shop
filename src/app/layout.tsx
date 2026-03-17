import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';

export const metadata: Metadata = {
  title: 'Dar-Essaaf | دار السعف',
  description:
    'Boutique en ligne de l\'artisanat tunisien et djerbien. Chapeaux Mdhilla, paniers en palme, décoration d\'intérieur. Maison de la palme – Djerba, Tunisie.',
  keywords: 'artisanat tunisien, chapeau mdhilla, Djerba, paniers palme, décoration berbère',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans bg-[#F5F0E8] min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
