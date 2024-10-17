import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().url(),
});

export const editSchema = z.object({
  item: z.string(),
  price: z.string(),
  date: z.string(),
  status: z.boolean(),
});

export const createSchema = z.object({
  item: z.string(),
  price: z.string(),
  status: z.boolean(),
});

export const profileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
