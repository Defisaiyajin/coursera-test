import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] bg-stone-100 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=1600&h=900&fit=crop"
        alt="Collection d'affiches vintage"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
        <div className="max-w-lg">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Affiches vintage<br />& déco
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Des affiches soigneusement sélectionnées pour sublimer votre intérieur.
          </p>
          <Link
            href="/affiches"
            className="mt-8 inline-block px-8 py-3 bg-white text-stone-900 font-medium rounded-md hover:bg-stone-100 transition-colors"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
