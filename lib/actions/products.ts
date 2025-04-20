'use server';

import { z } from 'zod';
import { productSchema } from '../validation';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import {
  brands,
  productImages,
  products,
  productSpecifications,
} from '@/database/schema';
import { eq } from 'drizzle-orm';
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

        await db.insert(productImages).values({
          productId: productResult[0].id,
          image: image,
          isPrimary: i === 0,
        });
      }

      await Promise.all(
        specs.map((spec) =>
          db.insert(productSpecifications).values({
            specName: spec.name,
            specValue: spec.value,
            productId: productResult[0].id,
          })
        )
      );
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Product adding error' };
  }
};

export const getProducts = async () => {
  try {
    const productsResult = await db
      .select({
        products: products,
        image: productImages,
        spec: productSpecifications,
        brand: brands,
      })
      .from(products)
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .leftJoin(
        productSpecifications,
        eq(products.id, productSpecifications.productId)
      )
      .leftJoin(brands, eq(products.brandId, brands.id));

    const grouped = productsResult.reduce((acc, row) => {
      const productId = row.products.id;

      if (!acc[productId]) {
        acc[productId] = {
          ...row.products,
          brand: row.brand ?? null,
          images: [],
          specs: [],
        };
      }

      if (
        row.image?.id &&
        !acc[productId].images.some(
          (img: { id: string }) => img.id === row.image?.id
        )
      ) {
        acc[productId].images.push(row.image);
      }

      if (
        row.spec?.id &&
        !acc[productId].specs.some(
          (spec: { id: string }) => spec.id === row.spec?.id
        )
      ) {
        acc[productId].specs.push(row.spec);
      }

      return acc;
    }, {});

    return Object.values(grouped);
  } catch (error) {
    console.log(error);
  }
};
