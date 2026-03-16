import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-stone-500 mb-6">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href="/" className="hover:text-stone-900 transition-colors">Accueil</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-stone-300">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-stone-900 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-stone-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
