'use server';

import { auth } from '@/auth';
import { db } from '@/database/drizzle';
import { cart } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

interface Props {
  productId: string;
  quantity: number;
}

export const addToCart = async (params: Props) => {
  const { productId, quantity } = params;
  const session = await auth();
  const userId = session?.user?.id;

  if (userId == null) {
    redirect('/sign-in');
  }

  try {
    const existingCartItems = await getCartItembyProductAndUser({
      productId,
      userId,
    });

    if (existingCartItems == null) {
      await db.insert(cart).values({
        productId,
        userId,
        quantity,
      });
    } else {
      await db
        .update(cart)
        .set({ quantity: existingCartItems[0].quantity + quantity })
        .where(and(eq(cart.productId, productId), eq(cart.userId, userId)));
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Add to cart Error' };
  }
};

export const getCartItembyProductAndUser = async ({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) => {
  try {
    const result = await db
      .select()
      .from(cart)
      .where(and(eq(cart.productId, productId), eq(cart.userId, userId)));

    if (result.length > 0) {
      return result;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
