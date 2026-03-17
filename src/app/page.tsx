'use client';

import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-[#1B4F8C] flex items-center justify-center overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #4A90D9 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C8963E 0%, transparent 40%)',
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Djerba, Tunisie</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-4">
            Djerbian<br />
            <span className="text-[#C8963E]">Craftsmanship</span>
          </h1>
          <p className="text-2xl text-white/80 font-serif italic mb-3">
            L&apos;art ancestral de la palme,<br />revisité pour aujourd&apos;hui
          </p>
          <p className="text-white/60 text-lg mb-2" dir="rtl">الحرف اليدوية الأصيلة من جربة</p>
          <p className="text-white/50 text-sm italic mb-10">
            &quot;Where the palm meets the sea. Authentic. Rustic. Djerbian.&quot;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/boutique"
              className="bg-[#C8963E] hover:bg-[#E8B86D] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg"
            >
              Découvrir la Boutique
            </Link>
            <Link
              href="/notre-histoire"
              className="border-2 border-white/50 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 text-lg"
            >
              Notre Histoire
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Brand Values Strip */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#1B4F8C]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#1B4F8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1B4F8C]">Artisanal</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Chaque pièce est unique, façonnée à la main par des artisans djerbiens selon des techniques ancestrales.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#C8963E]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#C8963E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1B4F8C]">Authentique</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Directement des mains des artisanes de Djerba, pour préserver un patrimoine culturel inestimable.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-green-600/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1B4F8C]">Durable</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Fabriqués avec des matériaux naturels et durables — les feuilles de palmier sont 100% écologiques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-2">Sélection de la semaine</p>
          <h2 className="font-serif text-4xl font-bold text-[#1B4F8C]">Nos Coups de Cœur</h2>
          <div className="w-16 h-1 bg-[#C8963E] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/boutique"
            className="inline-block border-2 border-[#1B4F8C] text-[#1B4F8C] hover:bg-[#1B4F8C] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            Voir toute la boutique
          </Link>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="bg-[#1B4F8C] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-3">Notre Histoire</p>
              <h2 className="font-serif text-4xl font-bold text-white mb-6">
                Le Sâf — L&apos;âme de Djerba
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Sur l&apos;île de Djerba, les palmeraies ont toujours été au cœur de la vie quotidienne. 
                Le sâf — la palme — est bien plus qu&apos;une matière première : c&apos;est un héritage vivant, 
                transmis de génération en génération par les femmes artisanes de l&apos;île.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Dar-Essaaf est née de la volonté de partager cet héritage avec le monde, 
                en offrant des créations authentiques qui racontent l&apos;histoire de Djerba.
              </p>
              <Link
                href="/notre-histoire"
                className="inline-block bg-[#C8963E] hover:bg-[#E8B86D] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                Découvrir notre histoire
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0D2B4E] rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl font-bold text-[#C8963E] font-serif">15+</div>
                  <div className="text-white/70 text-sm mt-2">années d&apos;artisanat</div>
                </div>
              </div>
              <div className="bg-[#0D2B4E] rounded-2xl aspect-square flex items-center justify-center mt-8">
                <div className="text-center p-6">
                  <div className="text-5xl font-bold text-[#C8963E] font-serif">50+</div>
                  <div className="text-white/70 text-sm mt-2">artisanes locales</div>
                </div>
              </div>
              <div className="bg-[#0D2B4E] rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl font-bold text-[#C8963E] font-serif">100%</div>
                  <div className="text-white/70 text-sm mt-2">naturel & éco</div>
                </div>
              </div>
              <div className="bg-[#0D2B4E] rounded-2xl aspect-square flex items-center justify-center mt-8">
                <div className="text-center p-6">
                  <div className="text-5xl font-bold text-[#C8963E] font-serif">∞</div>
                  <div className="text-white/70 text-sm mt-2">passion & amour</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-[#F5F0E8]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-2">Restez Connectés</p>
          <h2 className="font-serif text-3xl font-bold text-[#1B4F8C] mb-4">La lettre de Djerba</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Abonnez-vous pour recevoir nos nouvelles collections, les histoires de nos artisanes 
            et les actualités de Djerba directement dans votre boîte mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#1B4F8C] bg-white text-gray-800"
            />
            <button
              type="submit"
              className="bg-[#1B4F8C] hover:bg-[#C8963E] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 whitespace-nowrap"
            >
              S&apos;abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
