'use client';

import { useCart } from '@/lib/cart-context';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CartItem } from '@/lib/cart-context';

export default function ConfirmationPage() {
  const { items, totalPrice, clearCart } = useCart();
  const savedItems = useRef<CartItem[]>([]);
  const savedTotal = useRef(0);
  const orderNumber = useRef(`PS-${Date.now().toString(36).toUpperCase()}`);

  useEffect(() => {
    if (items.length > 0) {
      savedItems.current = [...items];
      savedTotal.current = totalPrice;
      clearCart();
    }
  }, [items, totalPrice, clearCart]);

  const orderItems = savedItems.current;
  const orderTotal = savedTotal.current;

  if (orderItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-stone-300 mx-auto mb-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h1 className="text-2xl font-bold text-stone-900">Aucune commande en cours</h1>
        <p className="text-stone-500 mt-2">Votre panier est vide.</p>
        <Link href="/affiches" className="inline-block mt-6 px-6 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors">
          Parcourir les affiches
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {/* Success icon */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">Commande confirmee !</h1>
        <p className="text-stone-500 mt-2">Merci pour votre achat. Votre commande a bien ete enregistree.</p>
        <p className="text-sm text-stone-400 mt-1">Numero de commande : <span className="font-mono font-medium text-stone-600">{orderNumber.current}</span></p>
      </div>

      {/* Order summary */}
      <div className="bg-stone-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Recapitulatif</h2>
        <ul className="divide-y divide-stone-200">
          {orderItems.map((item) => (
            <li key={`${item.id}-${item.format}`} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="relative w-16 h-20 bg-stone-200 rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-stone-900">{item.name}</h3>
                <p className="text-xs text-stone-500">Format : {item.format} &mdash; Qte : {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-stone-900 whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} &euro;</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-200">
          <span className="font-medium text-stone-900">Total</span>
          <span className="text-lg font-bold text-stone-900">{orderTotal.toFixed(2)} &euro;</span>
        </div>
      </div>

      {/* Delivery info */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-semibold text-amber-900 mb-2">Livraison estimee</h3>
        <p className="text-sm text-amber-800">Vos affiches seront expediees sous 24 a 48h dans un emballage renforce.</p>
        <p className="text-sm text-amber-800 mt-1">Un email de confirmation avec le suivi vous sera envoye prochainement.</p>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link href="/affiches" className="inline-block px-8 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors">
          Continuer mes achats
        </Link>
        <Link href="/" className="block mt-3 text-sm text-stone-500 hover:text-stone-700">
          Retour a l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
