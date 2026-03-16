import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/data/products';

interface CollectionCardProps {
  category: Category;
}

export default function CollectionCard({ category }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${category.slug}`}
      className="group relative aspect-[3/4] rounded-lg overflow-hidden block"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-semibold text-white">{category.name}</h3>
        <p className="text-sm text-white/70 mt-1">{category.description}</p>
      </div>
    </Link>
  );
}
