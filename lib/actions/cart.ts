'use server';

import { auth } from '@/auth';
import { db } from '@/database/drizzle';
import {
  cart,
  couponRedemptions,
  discountCodes,
  products,
} from '@/database/schema';
import { and, count, eq } from 'drizzle-orm';
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

    let message = '';

    if (existingCartItems == null) {
      await db.insert(cart).values({
        productId,
        userId,
        quantity,
      });
      message = 'add';
    } else {
      await db
        .update(cart)
        .set({ quantity: existingCartItems[0].quantity + quantity })
        .where(and(eq(cart.productId, productId), eq(cart.userId, userId)));

      message = 'update';
    }

    return { success: true, message: message };
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

export const getCartItemsByUser = async (userId: string) => {
  try {
    const result = await db
      .select({
        cart,
        product: {
          id: products.id,
          name: products.name,
          price: products.price,
          discount: products.discount,
        },
      })
      .from(cart)
      .where(eq(cart.userId, userId))
      .leftJoin(products, eq(cart.productId, products.id));

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCartTotalByUser = async (userId: string) => {
  return await db
    .select({ count: count() })
    .from(cart)
    .where(eq(cart.userId, userId));
};

export const updateCartQuantities = async (
  cartId: string,
  quantity: number
) => {
  try {
    await db
      .update(cart)
      .set({ quantity: quantity })
      .where(eq(cart.id, cartId));

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};

export const clearAllCartItems = async (userId: string) => {
  try {
    await db.delete(cart).where(eq(cart.userId, userId));
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};

export const removeCartItem = async (cartId: string) => {
  try {
    await db.delete(cart).where(eq(cart.id, cartId));

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};

export const validateCouponCode = async (code: string, userId: string) => {
  const today = new Date();
  try {
    const result = await db
      .select()
      .from(discountCodes)
      .where(eq(discountCodes.code, code))
      .limit(1);

    const usedUsers = await db
      .select()
      .from(couponRedemptions)
      .where(
        and(
          eq(couponRedemptions.userId, userId),
          eq(couponRedemptions.codeId, result[0].id)
        )
      )
      .limit(1);

    const validTill = new Date(result[0].validTill);

    if (result.length > 0) {
      if (today < validTill && usedUsers.length === 0) {
        return { success: true, discount: result[0].discount };
      } else {
        return {
          success: false,
          error: 'Code is expire or you used it before',
        };
      }
    } else {
      return { success: false, error: `${code} is not valid` };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};
