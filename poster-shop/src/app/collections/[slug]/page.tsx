'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import FilterBar, { type FilterState } from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import { getCategoryBySlug, getProductsByCategory } from '@/data/products';

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const allProducts = getProductsByCategory(slug);

  const [filters, setFilters] = useState<FilterState>({ category: '', format: '', priceRange: '' });
  const [sort, setSort] = useState('best-sellers');

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (filters.format) {
      result = result.filter((p) => p.formats.includes(filters.format));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    switch (sort) {
      case 'best-sellers':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'nouveautes':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'prix-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'prix-desc':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [allProducts, filters, sort]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Collection introuvable</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: 'Affiches', href: '/affiches' }, { label: category.name }]} />
      <h1 className="text-3xl font-bold text-stone-900 mb-2">{category.name}</h1>
      <p className="text-stone-500 mb-8">{category.description}</p>
      <FilterBar onFilterChange={setFilters} onSortChange={setSort} currentSort={sort} />
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <p className="text-center text-stone-400 py-16">Aucune affiche dans cette collection.</p>
      )}
    </div>
  );
}
