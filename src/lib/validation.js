import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string(),
  date: z.string(),
  location: z.string(),
  description: z.string(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const publicationSchema = z.object({
  title: z.string(),
  authors: z.string(),
  venue: z.string(),
  abstract: z.string(),
  link: z.string(),
});

export const merchandiseSchema = z.object({
  name: z.string(),
  price: z.number(),
  desc: z.string(),
  imageUrl: z.string().optional(),
});
