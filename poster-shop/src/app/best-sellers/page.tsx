import Breadcrumb from '@/components/Breadcrumb';
import ProductGrid from '@/components/ProductGrid';
import { getBestSellers } from '@/data/products';

export default function BestSellersPage() {
  const bestSellers = getBestSellers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: 'Best-sellers' }]} />
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Best-sellers</h1>
      <p className="text-stone-500 mb-8">Nos affiches les plus populaires, plébiscitées par nos clients.</p>
      <ProductGrid products={bestSellers} />
    </div>
  );
}
