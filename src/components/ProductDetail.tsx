'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/products';
import { useCart } from './CartContext';
import ProductCard from './ProductCard';

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: Props) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const badgeColors: Record<string, string> = {
    'Nouveau': 'bg-blue-600',
    'Bestseller': 'bg-[#C8963E]',
    'Artisanal': 'bg-green-700',
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#1B4F8C]">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-[#1B4F8C]">Boutique</Link>
          <span>/</span>
          <span className="text-[#1B4F8C] font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-sm">
          {/* Image */}
          <div className="relative aspect-square bg-[#F5F0E8]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
            {product.badge && (
              <span className={`absolute top-4 left-4 ${badgeColors[product.badge] || 'bg-gray-600'} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-center">
            <span className="text-[#4A90D9] text-sm font-semibold uppercase tracking-wider mb-2">{product.category}</span>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-[#C8963E] text-xl mb-6" dir="rtl">{product.nameAr}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-[#1B4F8C]">{product.price}</span>
              <span className="text-gray-500 text-lg">TND</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : product.inStock
                    ? 'bg-[#C8963E] hover:bg-[#1B4F8C] text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {added ? '✓ Ajouté au panier' : product.inStock ? 'Ajouter au panier' : 'Épuisé'}
              </button>
              <Link
                href="/panier"
                className="w-full py-4 rounded-full font-semibold text-lg border-2 border-[#1B4F8C] text-[#1B4F8C] hover:bg-[#1B4F8C] hover:text-white transition-all duration-300 text-center"
              >
                Voir le panier
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fait à la main
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100% Naturel
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Djerba, Tunisie
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-[#1B4F8C] mb-6">Vous aimerez aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
