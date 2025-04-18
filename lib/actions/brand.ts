'use server';

import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import { db } from '@/database/drizzle';
import { brands } from '@/database/schema';
import { eq } from 'drizzle-orm';

export const addBrand = async (params: Pick<Brand, 'brand' | 'logo'>) => {
  const { brand, logo } = params;

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';

  const { success } = await ratelimit.limit(ip);

  if (!success) redirect('/too-many');

  const existingBrand = await db
    .select()
    .from(brands)
    .where(eq(brands.brand, brand))
    .limit(1);

  if (existingBrand.length > 0) {
    return { success: false, error: 'Brand already exists' };
  }

  try {
    await db.insert(brands).values({
      brand,
      logo,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Brand adding failed' };
  }
};

export const getBrands = async () => {
  try {
    const allBrands = await db.select().from(brands);

    if (allBrands.length === 0) {
      return { success: false, error: ' No brand available' };
    }

    return { success: true, data: allBrands };
  } catch (error) {
    console.log(error);
  }
};
