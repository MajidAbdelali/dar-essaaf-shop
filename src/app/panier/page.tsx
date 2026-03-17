'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function PanierPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <div className="w-24 h-24 bg-[#1B4F8C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#1B4F8C]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1B4F8C] mb-3">Votre panier est vide</h1>
          <p className="text-gray-500 mb-8">Découvrez nos créations artisanales djerbaites</p>
          <Link
            href="/boutique"
            className="bg-[#C8963E] hover:bg-[#1B4F8C] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            Découvrir la Boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="bg-[#1B4F8C] py-12 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-white">Mon Panier</h1>
        <p className="text-white/60 mt-2" dir="rtl">سلة التسوق</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#F5F0E8]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/boutique/${product.id}`} className="font-serif font-semibold text-gray-900 hover:text-[#1B4F8C] transition-colors text-sm leading-tight block truncate">
                    {product.name}
                  </Link>
                  <p className="text-[#C8963E] text-xs" dir="rtl">{product.nameAr}</p>
                  <p className="text-[#1B4F8C] font-bold mt-1">{product.price} TND</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors text-gray-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors text-gray-600"
                  >
                    +
                  </button>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-800">{(product.price * quantity)} TND</p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-400 hover:text-red-600 text-xs mt-1 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-gray-400 hover:text-red-500 text-sm transition-colors"
            >
              Vider le panier
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              <h2 className="font-serif text-xl font-bold text-[#1B4F8C] mb-6">Récapitulatif</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sous-total</span>
                  <span>{totalPrice} TND</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-[#1B4F8C]">
                  <span>Total</span>
                  <span>{totalPrice} TND</span>
                </div>
              </div>

              <button className="w-full bg-[#C8963E] hover:bg-[#1B4F8C] text-white font-semibold py-4 rounded-full transition-all duration-300 hover:shadow-lg mb-3">
                Passer la commande
              </button>

              <Link
                href="/boutique"
                className="block w-full text-center border-2 border-gray-200 text-gray-500 hover:border-[#1B4F8C] hover:text-[#1B4F8C] font-semibold py-3 rounded-full transition-all duration-300 text-sm"
              >
                Continuer les achats
              </Link>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Paiement 100% sécurisé
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
