import config from '@/config';
import { createOrder } from '@/lib/actions/order';
import stripe from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get('stripe-signature');

  if (!sig)
    return NextResponse.json({ error: 'No signature' }, { status: 400 });

  const webhookSecret = config.env.stripe.webhookSecret;

  if (!webhookSecret) {
    console.log('Stripe webhook secret not set');
    return NextResponse.json(
      { error: 'Stripe webhook secret not set' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.log('Webhook signature verification failed', error);
    return NextResponse.json(
      { error: `Webhook error ${error}` },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await createOrder(session);
  }

  return NextResponse.json({ received: true });
}
