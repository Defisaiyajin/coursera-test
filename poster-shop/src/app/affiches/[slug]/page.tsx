'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import ProductGrid from '@/components/ProductGrid';
import { getProductBySlug, products, packs } from '@/data/products';
import BundleCard from '@/components/BundleCard';
import { useCart } from '@/lib/cart-context';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Produit introuvable</h1>
        <p className="text-stone-500 mt-2">Cette affiche n&apos;existe pas ou a été retirée.</p>
      </div>
    );
  }

  const format = selectedFormat || product.formats[0];
  const similar = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);
  const suggestedPacks = packs.filter((pk) => pk.products.includes(product.id)).slice(0, 2);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      format,
      type: 'product',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Affiches', href: '/affiches' },
          { label: product.category, href: `/collections/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-24 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-amber-700' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="lg:py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">{product.name}</h1>
          <p className="text-sm text-stone-500 mt-1">{product.category}</p>
          <p className="text-2xl font-bold text-stone-900 mt-4">{product.price.toFixed(2)} €</p>

          {/* Format selector */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-stone-900 mb-3">Format</h3>
            <div className="flex flex-wrap gap-2">
              {product.formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFormat(f)}
                  className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                    (selectedFormat || product.formats[0]) === f
                      ? 'border-amber-700 bg-amber-50 text-amber-700'
                      : 'border-stone-300 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-600 mt-6 leading-relaxed">{product.description}</p>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full sm:w-auto px-10 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors"
          >
            Ajouter au panier
          </button>

          {/* Shipping info */}
          <div className="mt-8 pt-6 border-t border-stone-200 space-y-3">
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Livraison sous 48h — emballage renforcé
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
              Retour gratuit sous 30 jours
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              Impression premium sur papier mat 200g
            </div>
          </div>
        </div>
      </div>

      {/* Suggested packs */}
      {suggestedPacks.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-stone-900 mb-6">Complétez avec un pack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedPacks.map((pk) => (
              <BundleCard key={pk.id} pack={pk} />
            ))}
          </div>
        </section>
      )}

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-stone-900 mb-6">Vous aimerez aussi</h2>
          <ProductGrid products={similar} />
        </section>
      )}
    </div>
  );
}
