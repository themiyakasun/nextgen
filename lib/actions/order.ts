'use server';

import Stripe from 'stripe';
import { addressCreation } from './address';
import stripe from '../stripe';
import { db } from '@/database/drizzle';
import { orderItems, orders } from '@/database/schema';
import { removeCartItem } from './cart';
import { updateProductStock } from './products';

export const createOrder = async (session: Stripe.Checkout.Session) => {
  if (session === null || session.metadata === null)
    return 'No session or session metadata is empty';
  console.log(session);

  const {
    firstName,
    lastName,
    street,
    phoneNumber,
    country,
    zip,
    city,
    state,
    userId,
    email,
  } = session.metadata;

  if (session.payment_status == 'paid') {
    const formData = {
      firstName,
      lastName,
      street,
      state,
      postalCode: zip,
      country,
      city,
      phoneNumber,
    };
    const addressResult = await addressCreation(formData, userId);

    if (addressResult === undefined || addressResult.address === undefined)
      return 'No address can be fountd';

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
      session.id,
      {
        expand: ['data.price.product'],
      }
    );

    const order = await db
      .insert(orders)
      .values({
        userId: userId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        shippingAddress: addressResult.address[0].id,
        totalAmount: session.amount_total,
      })
      .returning();

    lineItemsWithProduct.data.map(async (item) => {
      await db.insert(orderItems).values({
        orderId: order[0].id,
        productId: (item.price?.product as Stripe.Product).metadata.id,
        quantity: item.quantity ?? 1,
      });

      await removeCartItem(
        (item.price?.product as Stripe.Product).metadata.cartItemId
      );

      await updateProductStock(
        (item.price?.product as Stripe.Product).metadata.id,
        item.quantity ?? 1
      );
    });
  }
};
