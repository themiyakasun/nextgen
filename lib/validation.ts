import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3),
});

export const signinSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

export const categorySchema = z.object({
  category: z.string().min(3),
  image: z.string().min(3),
});

export const brandSchema = z.object({
  brand: z.string().min(3),
  logo: z.string().min(3),
});

export const seriesSchema = z.object({
  seriesName: z.string().min(3),
  categoryId: z.string().min(3),
  brandId: z.string().min(3),
});

export const productSchema = z.object({
  sku: z.string().min(3),
  name: z.string().min(3),
  description: z.string().min(3),
  modelNumber: z.string().min(3),
  price: z.coerce.number().multipleOf(0.01).min(3),
  discount: z.coerce.number().multipleOf(0.01).optional(),
  stockQuantity: z.coerce.number().min(1),
  warrantyPeriod: z.string().min(3),
  isActive: z.boolean(),
  categoryId: z.string().min(3),
  brandId: z.string().min(3),
  seriesId: z.string().optional().nullable(),
  images: z.array(z.string()),
  specs: z.array(
    z.object({
      name: z.string().min(1),
      value: z.string().min(1),
    })
  ),
});
