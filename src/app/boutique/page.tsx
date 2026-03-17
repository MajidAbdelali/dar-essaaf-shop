'use client';

import { useState } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const categories = ['Tous', 'Chapeaux', 'Paniers', 'Décoration', 'Accessoires'];

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = activeCategory === 'Tous'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Header */}
      <div className="bg-[#1B4F8C] py-16 px-4 text-center">
        <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-2">Collections Artisanales</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-3">La Boutique</h1>
        <p className="text-white/60 text-lg" dir="rtl">المتجر</p>
        <div className="w-16 h-1 bg-[#C8963E] mx-auto mt-4" />
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#1B4F8C] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1B4F8C] hover:text-[#1B4F8C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-gray-500 text-sm mb-6">{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
