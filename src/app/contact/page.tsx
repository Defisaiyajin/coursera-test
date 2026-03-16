'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Contact & À propos</h1>
      <p className="text-stone-500 mb-8">
        Une question, une demande ? N&apos;hésitez pas à nous écrire.
      </p>

      {/* About */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">À propos de POSTER.shop</h2>
        <p className="text-stone-600 leading-relaxed">
          Nous sélectionnons avec soin des affiches vintage et décoratives pour vous aider à créer un intérieur
          qui vous ressemble. Qualité d&apos;impression premium, envoi soigné, et un service client à votre écoute.
        </p>
        <p className="text-stone-600 leading-relaxed mt-3">
          Basés en France, nous travaillons avec des imprimeurs locaux pour garantir une qualité irréprochable
          sur papier mat épais 200g.
        </p>
      </div>

      {/* Contact info */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">Nous contacter</h2>
        <p className="text-stone-600">
          Email : <a href="mailto:hello@poster.shop" className="text-amber-700 hover:underline">hello@poster.shop</a>
        </p>
        <p className="text-stone-500 text-sm mt-1">Réponse sous 24h en jours ouvrés.</p>
      </div>

      {/* Form */}
      <div>
        <h2 className="text-xl font-semibold text-stone-900 mb-6">Envoyer un message</h2>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-green-800 font-medium">Merci pour votre message !</p>
            <p className="text-green-600 text-sm mt-1">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                Nom
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent resize-none"
                placeholder="Votre message..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors"
            >
              Envoyer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
