import Hero from '@/components/Hero';
import CollectionCard from '@/components/CollectionCard';
import ProductGrid from '@/components/ProductGrid';
import BundleCard from '@/components/BundleCard';
import ReassuranceBlock from '@/components/ReassuranceBlock';
import { categories, getBestSellers, getNewProducts, packs } from '@/data/products';
import Link from 'next/link';

export default function Home() {
  const bestSellers = getBestSellers().slice(0, 6);
  const newProducts = getNewProducts().slice(0, 4);
  const featuredPacks = packs.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900">Nos collections</h2>
          <Link href="/affiches" className="text-sm text-amber-700 hover:text-amber-800 font-medium">
            Tout voir →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CollectionCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Best-sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900">Best-sellers</h2>
          <Link href="/best-sellers" className="text-sm text-amber-700 hover:text-amber-800 font-medium">
            Tout voir →
          </Link>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      {/* Packs */}
      <section className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Nos packs</h2>
              <p className="text-sm text-stone-500 mt-1">Économisez avec nos sets d&apos;affiches.</p>
            </div>
            <Link href="/packs" className="text-sm text-amber-700 hover:text-amber-800 font-medium">
              Tout voir →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPacks.map((pack) => (
              <BundleCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      {/* Nouveautés */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900">Nouveautés</h2>
          <Link href="/nouveautes" className="text-sm text-amber-700 hover:text-amber-800 font-medium">
            Tout voir →
          </Link>
        </div>
        <ProductGrid products={newProducts} />
      </section>

      {/* Reassurance */}
      <ReassuranceBlock />
    </>
  );
}
