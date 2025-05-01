'use server';

import { Session } from 'next-auth';
import stripe from '../stripe';
import { converToSubcurrency } from '../covertToSubcurrency';

export const createCheckoutSession = async (
  cartItems: CartItem[],
  userSession: Session | null
) => {
  try {
    if (userSession == null || userSession.user === undefined)
      throw new Error('User cannot be found');
    const itemsWithoutPrice = cartItems.filter(
      (item) => item.product?.price === undefined
    );

    if (itemsWithoutPrice.length > 0) throw new Error('');

    const existingCustomers = await stripe.customers.list({
      email: userSession.user?.email as string,
      limit: 1,
    });

    let customerId: undefined | string;

    if (existingCustomers.data.length > 0)
      customerId = existingCustomers.data[0].id;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : 'always',
      customer_email: !customerId
        ? (userSession.user.email as string)
        : undefined,
      metadata: {
        userId: (userSession.user.id as string) ?? 'guest',
        email: userSession.user.email as string,
      },
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      success_url:
        'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cart',
      line_items: cartItems.map((item) => {
        if (!item.product?.name) {
          throw new Error('Product name is required for all items');
        }
        return {
          price_data: {
            currency: 'lkr',
            unit_amount: converToSubcurrency(item.product.price),

            product_data: {
              name: item.product.name,
            },
          },

          quantity: item.cart.quantity ?? 1,
        };
      }),
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Standard Shipping',
            type: 'fixed_amount',
            fixed_amount: {
              amount: converToSubcurrency(200),
              currency: 'lkr',
            },
            delivery_estimate: {
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
      ],
    });

    return session.url;
  } catch (error) {
    console.error('Error creating checkout session', error);
    throw error;
  }
};
