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

export const branchSchema = z.object({
  brand: z.string().min(3),
});

export const seriesSchema = z.object({
  seriesName: z.string().min(3),
  category: z.string().min(3),
});
