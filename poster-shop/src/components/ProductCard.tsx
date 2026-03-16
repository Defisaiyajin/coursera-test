'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/affiches/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-stone-900 text-white text-xs px-2 py-1 rounded">
            Nouveau
          </span>
        )}
        {product.isBestSeller && !product.isNew && (
          <span className="absolute top-3 left-3 bg-amber-700 text-white text-xs px-2 py-1 rounded">
            Best-seller
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
        {product.name}
      </h3>
      <p className="text-xs text-stone-500 mt-0.5">{product.category}</p>
      <p className="text-sm font-semibold text-stone-900 mt-1">
        {product.price.toFixed(2)} €
      </p>
    </Link>
  );
}
