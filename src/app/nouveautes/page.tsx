import Breadcrumb from '@/components/Breadcrumb';
import ProductGrid from '@/components/ProductGrid';
import { getNewProducts } from '@/data/products';

export default function NouveautesPage() {
  const newProducts = getNewProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: 'Nouveautés' }]} />
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Nouveautés</h1>
      <p className="text-stone-500 mb-8">Les dernières affiches ajoutées à notre collection.</p>
      <ProductGrid products={newProducts} />
    </div>
  );
}
