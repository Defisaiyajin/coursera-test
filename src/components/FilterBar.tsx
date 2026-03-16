'use client';

import { useState } from 'react';
import { categories, formats as allFormats } from '@/data/products';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
}

export interface FilterState {
  category: string;
  format: string;
  priceRange: string;
}

const priceRanges = [
  { label: 'Tous les prix', value: '' },
  { label: 'Moins de 15€', value: '0-15' },
  { label: '15€ - 20€', value: '15-20' },
  { label: '20€ - 25€', value: '20-25' },
  { label: 'Plus de 25€', value: '25-999' },
];

const sortOptions = [
  { label: 'Best-sellers', value: 'best-sellers' },
  { label: 'Nouveautés', value: 'nouveautes' },
  { label: 'Prix croissant', value: 'prix-asc' },
  { label: 'Prix décroissant', value: 'prix-desc' },
];

export default function FilterBar({ onFilterChange, onSortChange, currentSort }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    format: '',
    priceRange: '',
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const selectClass =
    'px-3 py-2 text-sm border border-stone-300 rounded-md bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent';

  return (
    <div className="mb-8">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-sm text-stone-600 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          Filtres
        </button>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClass}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Filters (desktop always visible, mobile toggle) */}
      <div className={`${mobileOpen ? 'block' : 'hidden'} lg:flex items-center gap-4 flex-wrap`}>
        <select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className={selectClass}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>

        <select
          value={filters.format}
          onChange={(e) => handleChange('format', e.target.value)}
          className={selectClass}
        >
          <option value="">Tous les formats</option>
          {allFormats.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <select
          value={filters.priceRange}
          onChange={(e) => handleChange('priceRange', e.target.value)}
          className={selectClass}
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>

        {/* Sort (desktop) */}
        <div className="hidden lg:block ml-auto">
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className={selectClass}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
