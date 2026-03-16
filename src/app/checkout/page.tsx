'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { useCart } from '@/lib/cart-context';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
}

const emptyShipping: ShippingInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  addressLine2: '',
  city: '',
  postalCode: '',
  country: 'FR',
};

const countries = [
  { code: 'FR', label: 'France' },
  { code: 'BE', label: 'Belgique' },
  { code: 'CH', label: 'Suisse' },
  { code: 'LU', label: 'Luxembourg' },
  { code: 'DE', label: 'Allemagne' },
  { code: 'ES', label: 'Espagne' },
  { code: 'IT', label: 'Italie' },
  { code: 'PT', label: 'Portugal' },
  { code: 'NL', label: 'Pays-Bas' },
  { code: 'GB', label: 'Royaume-Uni' },
];

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Une erreur est survenue lors du paiement.');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      {errorMessage && (
        <p className="text-red-600 text-sm mt-3">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-6 w-full py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Traitement en cours...' : 'Payer maintenant'}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingInfo>(emptyShipping);
  const [clientSecret, setClientSecret] = useState('');
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  const shippingCost = totalPrice >= 50 ? 0 : 4.90;
  const orderTotal = totalPrice + shippingCost;

  useEffect(() => {
    if (items.length === 0 && step === 1) {
      router.push('/affiches');
    }
  }, [items.length, step, router]);

  const validateShipping = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};
    if (!shipping.firstName.trim()) newErrors.firstName = 'Requis';
    if (!shipping.lastName.trim()) newErrors.lastName = 'Requis';
    if (!shipping.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) newErrors.email = 'Email invalide';
    if (!shipping.phone.trim()) newErrors.phone = 'Requis';
    if (!shipping.address.trim()) newErrors.address = 'Requis';
    if (!shipping.city.trim()) newErrors.city = 'Requis';
    if (!shipping.postalCode.trim() || !/^\d{4,6}$/.test(shipping.postalCode.replace(/\s/g, ''))) newErrors.postalCode = 'Code postal invalide';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateShipping()) return;

    setIsCreatingIntent(true);
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(orderTotal * 100),
          metadata: {
            customer_email: shipping.email,
            customer_name: `${shipping.firstName} ${shipping.lastName}`,
          },
        }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep(2);
      } else {
        alert(data.error || 'Erreur lors de la preparation du paiement.');
      }
    } catch {
      alert('Erreur de connexion. Veuillez reessayer.');
    } finally {
      setIsCreatingIntent(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setStep(3);
  };

  const updateField = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  if (items.length === 0 && step < 3) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-400 mb-8">
        <Link href="/" className="hover:text-stone-600">Accueil</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-900">Checkout</span>
      </nav>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { num: 1, label: 'Livraison' },
          { num: 2, label: 'Paiement' },
          { num: 3, label: 'Confirmation' },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            {i > 0 && <div className={`w-12 h-0.5 mx-2 ${step >= s.num ? 'bg-amber-700' : 'bg-stone-200'}`} />}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > s.num
                  ? 'bg-green-600 text-white'
                  : step === s.num
                  ? 'bg-amber-700 text-white'
                  : 'bg-stone-200 text-stone-500'
              }`}>
                {step > s.num ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  s.num
                )}
              </div>
              <span className={`text-sm hidden sm:inline ${step >= s.num ? 'text-stone-900 font-medium' : 'text-stone-400'}`}>
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto text-center py-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">Commande confirmee !</h1>
          <p className="text-stone-500 mt-2">Merci {shipping.firstName}, votre commande a bien ete enregistree.</p>
          <p className="text-sm text-stone-400 mt-1">Un email de confirmation sera envoye a <span className="font-medium text-stone-600">{shipping.email}</span></p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8 text-left">
            <h3 className="font-semibold text-amber-900 mb-2">Adresse de livraison</h3>
            <p className="text-sm text-amber-800">
              {shipping.firstName} {shipping.lastName}<br />
              {shipping.address}<br />
              {shipping.addressLine2 && <>{shipping.addressLine2}<br /></>}
              {shipping.postalCode} {shipping.city}<br />
              {countries.find((c) => c.code === shipping.country)?.label}
            </p>
            <p className="text-sm text-amber-800 mt-3">Livraison estimee sous 2 a 5 jours ouvrables.</p>
          </div>

          <div className="mt-8">
            <Link href="/affiches" className="inline-block px-8 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors">
              Continuer mes achats
            </Link>
          </div>
        </div>
      )}

      {/* Steps 1 & 2: Main layout */}
      {step < 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-6">Informations de livraison</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Prenom" value={shipping.firstName} error={errors.firstName} onChange={(v) => updateField('firstName', v)} />
                    <InputField label="Nom" value={shipping.lastName} error={errors.lastName} onChange={(v) => updateField('lastName', v)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Email" type="email" value={shipping.email} error={errors.email} onChange={(v) => updateField('email', v)} />
                    <InputField label="Telephone" type="tel" value={shipping.phone} error={errors.phone} onChange={(v) => updateField('phone', v)} placeholder="+33 6 12 34 56 78" />
                  </div>
                  <InputField label="Adresse" value={shipping.address} error={errors.address} onChange={(v) => updateField('address', v)} placeholder="Numero et nom de rue" />
                  <InputField label="Complement d'adresse (optionnel)" value={shipping.addressLine2} onChange={(v) => updateField('addressLine2', v)} placeholder="Appartement, etage, etc." />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <InputField label="Code postal" value={shipping.postalCode} error={errors.postalCode} onChange={(v) => updateField('postalCode', v)} placeholder="75001" />
                    <InputField label="Ville" value={shipping.city} error={errors.city} onChange={(v) => updateField('city', v)} />
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Pays</label>
                      <select
                        value={shipping.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        className="w-full px-3 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCreatingIntent}
                    className="mt-4 w-full sm:w-auto px-10 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreatingIntent ? 'Chargement...' : 'Continuer vers le paiement'}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && clientSecret && (
              <div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-amber-700 hover:text-amber-800 mb-4 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  Modifier l&apos;adresse
                </button>

                <h2 className="text-xl font-bold text-stone-900 mb-2">Paiement</h2>

                {/* Shipping summary */}
                <div className="bg-stone-50 rounded-lg p-4 mb-6 text-sm text-stone-600">
                  <p className="font-medium text-stone-900">{shipping.firstName} {shipping.lastName}</p>
                  <p>{shipping.address}{shipping.addressLine2 ? `, ${shipping.addressLine2}` : ''}</p>
                  <p>{shipping.postalCode} {shipping.city}, {countries.find((c) => c.code === shipping.country)?.label}</p>
                </div>

                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#b45309',
                        borderRadius: '6px',
                      },
                    },
                  }}
                >
                  <PaymentForm onSuccess={handlePaymentSuccess} />
                </Elements>

                <div className="flex items-center gap-2 mt-4 text-xs text-stone-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  Paiement securise par Stripe. Vos informations bancaires ne transitent jamais par nos serveurs.
                </div>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Votre commande</h3>
              <ul className="divide-y divide-stone-200">
                {items.map((item) => (
                  <li key={`${item.id}-${item.format}`} className="flex gap-3 py-3 first:pt-0">
                    <div className="relative w-14 h-[4.5rem] bg-stone-200 rounded overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-700 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">{item.name}</p>
                      <p className="text-xs text-stone-500">{item.format}</p>
                    </div>
                    <p className="text-sm font-medium text-stone-900 whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} &euro;</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-stone-200 mt-3 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)} &euro;</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Livraison</span>
                  <span>{shippingCost === 0 ? <span className="text-green-600 font-medium">Gratuite</span> : `${shippingCost.toFixed(2)} \u20ac`}</span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-stone-400">Livraison gratuite a partir de 50 &euro;</p>
                )}
                <div className="flex justify-between text-base font-semibold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span>{orderTotal.toFixed(2)} &euro;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({
  label,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent ${
          error ? 'border-red-400 bg-red-50' : 'border-stone-300'
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
