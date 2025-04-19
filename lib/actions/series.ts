'use server';

import { db } from '@/database/drizzle';
import { series } from '@/database/schema';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export const addSeries = async (
  params: Pick<Series, 'seriesName' | 'categoryId' | 'brandId'>
) => {
  const { seriesName, categoryId, brandId } = params;

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';

  const { success } = await ratelimit.limit(ip);

  if (!success) redirect('/too-many');

  const existingSeries = await db
    .select()
    .from(series)
    .where(eq(series.seriesName, seriesName))
    .limit(1);

  if (existingSeries.length > 0) {
    return { success: false, error: 'Series is already added' };
  }

  try {
    await db.insert(series).values({
      seriesName,
      categoryId,
      brandId,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Series adding error' };
  }
};

export const getSeries = async () => {
  try {
    const allSeries = await db.select().from(series);

    if (allSeries.length === 0) {
      return { success: false, error: ' No category available' };
    }

    return { success: true, data: allSeries };
  } catch (error) {
    console.log(error);
  }
};
