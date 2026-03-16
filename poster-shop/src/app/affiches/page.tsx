'use client';

import { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import FilterBar, { type FilterState } from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

export default function AffichesPage() {
  const [filters, setFilters] = useState<FilterState>({ category: '', format: '', priceRange: '' });
  const [sort, setSort] = useState('best-sellers');

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.categorySlug === filters.category);
    }
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
  }, [filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: 'Affiches' }]} />
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Toutes nos affiches</h1>
      <p className="text-stone-500 mb-8">
        Découvrez notre collection complète d&apos;affiches vintage et décoratives.
      </p>
      <FilterBar onFilterChange={setFilters} onSortChange={setSort} currentSort={sort} />
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <p className="text-center text-stone-400 py-16">Aucune affiche ne correspond à vos critères.</p>
      )}
    </div>
  );
}
