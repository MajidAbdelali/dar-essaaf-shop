'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B4F8C]/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-white font-serif text-xl font-bold tracking-wide">Dar-Essaaf</span>
            <span className="text-[#C8963E] text-sm font-arabic" dir="rtl">دار السعف</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium">Accueil</Link>
            <Link href="/boutique" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium">Boutique</Link>
            <Link href="/notre-histoire" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium">Notre Histoire</Link>
            <Link href="/contact" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium">Contact</Link>
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/panier" className="relative text-white hover:text-[#C8963E] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C8963E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium" onClick={() => setMenuOpen(false)}>Accueil</Link>
              <Link href="/boutique" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium" onClick={() => setMenuOpen(false)}>Boutique</Link>
              <Link href="/notre-histoire" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium" onClick={() => setMenuOpen(false)}>Notre Histoire</Link>
              <Link href="/contact" className="text-white/90 hover:text-[#C8963E] transition-colors text-sm font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
