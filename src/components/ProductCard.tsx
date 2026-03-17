'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const badgeColors: Record<string, string> = {
    'Nouveau': 'bg-blue-600',
    'Bestseller': 'bg-[#C8963E]',
    'Artisanal': 'bg-green-700',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/boutique/${product.id}`} className="relative block overflow-hidden aspect-square bg-[#F5F0E8]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 ${badgeColors[product.badge] || 'bg-gray-600'} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
            {product.badge}
          </span>
        )}
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-full text-sm">Épuisé</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-[#4A90D9] font-semibold uppercase tracking-wider mb-1">{product.category}</span>
        <Link href={`/boutique/${product.id}`}>
          <h3 className="font-serif text-gray-900 font-semibold text-base leading-snug hover:text-[#1B4F8C] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[#C8963E] text-xs mt-0.5" dir="rtl">{product.nameAr}</p>
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-[#1B4F8C] font-bold text-lg">{product.price} <span className="text-sm font-normal text-gray-500">TND</span></span>
          <button
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
            className="bg-[#1B4F8C] hover:bg-[#C8963E] disabled:bg-gray-300 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
