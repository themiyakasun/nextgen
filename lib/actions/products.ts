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
import { count, eq, inArray } from 'drizzle-orm';
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

export const getProducts = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    const productsResult = await db
      .select()
      .from(products)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const productIds = productsResult.map((productResult) => productResult.id);

    const images = await db
      .select()
      .from(productImages)
      .where(inArray(productImages.productId, productIds));

    const specs = await db
      .select()
      .from(productSpecifications)
      .where(inArray(productSpecifications.productId, productIds));

    const brandIds = [
      ...new Set(productsResult.map((product) => product.brandId)),
    ];

    const brandDetails = await db
      .select()
      .from(brands)
      .where(inArray(brands.id, brandIds));

    const brandMap = Object.fromEntries(
      brandDetails.map((brand) => [brand.id, brand])
    );

    const productDetails = productsResult.map((product) => {
      return {
        ...product,
        images: images.filter((image) => image.productId === product.id),
        specs: specs.filter((spec) => spec.productId === product.id),
        brand: brandMap[product.brandId],
      };
    });

    return Object.values(productDetails);
  } catch (error) {
    console.log(error);
  }
};

export const getTotalCountofProducts = async () => {
  const result = await db.select({ count: count() }).from(products);
  return result;
};
