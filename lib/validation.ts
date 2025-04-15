import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(3),
    email: z.string().min(3),
    password: z.string().min(3),
})

export const signinSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(3),
})