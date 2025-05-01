import Stripe from 'stripe';

import config from '@/config';

if (!config.env.stripe.secretKey) {
  throw new Error('Stripe secret key not found!');
}

const stripe = new Stripe(config.env.stripe.secretKey, {
  apiVersion: '2025-04-30.basil',
});

export default stripe;
