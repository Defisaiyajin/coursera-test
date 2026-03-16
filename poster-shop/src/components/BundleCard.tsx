import Image from 'next/image';
import Link from 'next/link';
import type { Pack } from '@/data/products';

interface BundleCardProps {
  pack: Pack;
}

export default function BundleCard({ pack }: BundleCardProps) {
  const savings = pack.originalPrice - pack.price;
  const savingsPercent = Math.round((savings / pack.originalPrice) * 100);

  return (
    <Link href={`/packs#${pack.slug}`} className="group block">
      <div className="relative aspect-[4/3] bg-stone-100 rounded-lg overflow-hidden mb-3">
        <Image
          src={pack.image}
          alt={pack.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
          −{savingsPercent}%
        </span>
      </div>
      <h3 className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
        {pack.name}
      </h3>
      <p className="text-xs text-stone-500 mt-0.5">{pack.shortDescription}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold text-stone-900">{pack.price.toFixed(2)} €</span>
        <span className="text-xs text-stone-400 line-through">{pack.originalPrice.toFixed(2)} €</span>
      </div>
    </Link>
  );
}
