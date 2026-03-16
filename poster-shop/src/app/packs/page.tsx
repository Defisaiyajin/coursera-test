'use client';

import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { packs } from '@/data/products';
import { useCart } from '@/lib/cart-context';

export default function PacksPage() {
  const { addItem } = useCart();

  const packTypes = [
    { type: '2-pour-10' as const, title: '2 pour 10€', subtitle: 'L\'offre idéale pour commencer.' },
    { type: 'set-de-3' as const, title: 'Sets de 3', subtitle: 'Créez un mur de cadres thématique.' },
    { type: 'set-de-6' as const, title: 'Sets de 6', subtitle: 'Pour les collectionneurs.' },
    { type: 'gallery-wall' as const, title: 'Gallery Walls', subtitle: 'Prêts à accrocher.' },
  ];

  const handleAddPack = (pack: typeof packs[0]) => {
    addItem({
      id: pack.id,
      name: pack.name,
      slug: pack.slug,
      price: pack.price,
      image: pack.image,
      format: 'Pack',
      type: 'pack',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: 'Packs' }]} />
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Nos packs</h1>
      <p className="text-stone-500 mb-12">
        Économisez en choisissant nos sets d&apos;affiches. Plus vous achetez, plus vous économisez.
      </p>

      {packTypes.map(({ type, title, subtitle }) => {
        const typePacks = packs.filter((p) => p.type === type);
        if (typePacks.length === 0) return null;

        return (
          <section key={type} id={type} className="mb-16">
            <h2 className="text-2xl font-bold text-stone-900 mb-1">{title}</h2>
            <p className="text-sm text-stone-500 mb-6">{subtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {typePacks.map((pack) => {
                const savings = pack.originalPrice - pack.price;
                const savingsPercent = Math.round((savings / pack.originalPrice) * 100);

                return (
                  <div
                    key={pack.id}
                    id={pack.slug}
                    className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[16/9] bg-stone-100">
                      <Image
                        src={pack.image}
                        alt={pack.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">
                        −{savingsPercent}%
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-stone-900">{pack.name}</h3>
                      <p className="text-sm text-stone-500 mt-1">{pack.description}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xl font-bold text-stone-900">{pack.price.toFixed(2)} €</span>
                        <span className="text-sm text-stone-400 line-through">{pack.originalPrice.toFixed(2)} €</span>
                        <span className="text-sm text-green-700 font-medium">
                          Économie : {savings.toFixed(2)} €
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddPack(pack)}
                        className="mt-4 w-full py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
