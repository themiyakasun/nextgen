'use server';

import { z } from 'zod';
import { productSchema } from '../validation';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import {
  productImages,
  products,
  productSpecifications,
} from '@/database/schema';
import { eq } from 'drizzle-orm';
import { error } from 'console';
import { db } from '@/database/drizzle';

type NewProduct = z.infer<typeof productSchema>;

export const addProduct = async (params: NewProduct) => {
  const {
    sku,
    name,
    description,
    modelNumber,
    price,
    discount,
    stockQuantity,
    warrantyPeriod,
    isActive,
    categoryId,
    brandId,
    seriesId,
    images,
    specs,
  } = params;

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';

  const { success } = await ratelimit.limit(ip);

  if (!success) redirect('/too-many');

  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.sku, sku))
    .limit(1);

  if (existingProduct.length > 0) {
    return { success: false, error: 'Product is already exists' };
  }

  try {
    const productResult = await db
      .insert(products)
      .values({
        sku,
        name,
        description,
        modelNumber,
        price,
        discount,
        stockQuantity,
        warrantyPeriod,
        isActive,
        categoryId,
        brandId,
      })
      .returning();

    if (productResult[0].id) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const spec = specs[i];

        await db.insert(productImages).values({
          productId: productResult[0].id,
          image: image,
          isPrimary: i === 0,
        });

        await db.insert(productSpecifications).values({
          specName: spec.name,
          specValue: spec.value,
          productId: productResult[0].id,
        });
      }
    }

    console.log(productResult);
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Product adding error' };
  }
};
