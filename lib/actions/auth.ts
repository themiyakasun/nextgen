"use server";

import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { signIn } from "@/auth";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Sign in error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { name, email, password } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Sign Up Failed" };
  }
};
