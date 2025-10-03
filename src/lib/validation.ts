import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3),
  date: z.coerce.date(),
  location: z.string().optional(),
  description: z.string().optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).optional()
});

export const publicationSchema = z.object({
  title: z.string().min(3),
  authors: z.array(z.string()).default([]),
  abstract: z.string().optional(),
  link: z.string().url().optional(),
  publishedAt: z.coerce.date().optional(),
  journal: z.string().optional(),
  coverImage: z.string().url().optional()
});

export const merchandiseSchema = z.object({
  name: z.string().min(2),
  price: z.number().nonnegative(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  stock: z.number().int().nonnegative().optional()
});

export type EventInput = z.infer<typeof eventSchema>;
export type PublicationInput = z.infer<typeof publicationSchema>;
export type MerchandiseInput = z.infer<typeof merchandiseSchema>;
