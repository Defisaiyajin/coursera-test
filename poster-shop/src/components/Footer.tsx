'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-stone-900 mb-3">
              POSTER<span className="text-amber-700">.</span>shop
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Affiches vintage et décoratives pour sublimer votre intérieur.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-3">Collections</h4>
            <ul className="space-y-2">
              <li><Link href="/collections/villes-voyage" className="text-sm text-stone-500 hover:text-stone-900">Villes & Voyage</Link></li>
              <li><Link href="/collections/mer-surf" className="text-sm text-stone-500 hover:text-stone-900">Mer & Surf</Link></li>
              <li><Link href="/collections/botanique-nature" className="text-sm text-stone-500 hover:text-stone-900">Botanique & Nature</Link></li>
              <li><Link href="/collections/vintage-deco" className="text-sm text-stone-500 hover:text-stone-900">Vintage Déco</Link></li>
              <li><Link href="/collections/cartes-plans" className="text-sm text-stone-500 hover:text-stone-900">Cartes & Plans</Link></li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-3">Informations</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-sm text-stone-500 hover:text-stone-900">Contact</Link></li>
              <li><Link href="/contact" className="text-sm text-stone-500 hover:text-stone-900">À propos</Link></li>
              <li><span className="text-sm text-stone-500">Livraison & retours</span></li>
              <li><span className="text-sm text-stone-500">Mentions légales</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-3">Newsletter</h4>
            <p className="text-sm text-stone-500 mb-3">Recevez nos nouveautés et offres exclusives.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white text-sm rounded-md hover:bg-stone-800 transition-colors"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-200 text-center">
          <p className="text-xs text-stone-400">&copy; 2026 POSTER.shop — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
