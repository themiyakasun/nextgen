'use server';

import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import ratelimit from '@/lib/ratelimit';
import { db } from '@/database/drizzle';
import { categories } from '@/database/schema';

export const addCategory = async (
  params: Pick<Category, 'category' | 'image'>
) => {
  const { category, image } = params;

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';

  const { success } = await ratelimit.limit(ip);

  if (!success) redirect('/too-many');

  const existingCategory = await db
    .select()
    .from(categories)
    .where(eq(categories.category, category));

  if (existingCategory.length > 0) {
    return { success: false, error: 'Category already exists' };
  }

  try {
    await db.insert(categories).values({
      category,
      image,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Category adding error' };
  }
};

export const getCategories = async () => {
  try {
    const allCategories = await db.select().from(categories);

    if (allCategories.length === 0) {
      return { success: false, error: ' No category available' };
    }

    return { success: true, data: allCategories };
  } catch (error) {
    console.log(error);
  }
};
