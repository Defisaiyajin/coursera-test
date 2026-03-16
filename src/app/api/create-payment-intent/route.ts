import { NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key, { apiVersion: '2026-02-25.clover' });
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const { amount, metadata } = await request.json();

    if (!amount || amount < 50) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: metadata || {},
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la creation du paiement' },
      { status: 500 }
    );
  }
}
