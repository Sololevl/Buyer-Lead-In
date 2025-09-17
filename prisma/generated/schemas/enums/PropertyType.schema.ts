import { z } from 'zod';

export const PropertyTypeSchema = z.enum(['Apartment', 'Villa', 'Plot', 'Office', 'Retail'])

export type PropertyType = z.infer<typeof PropertyTypeSchema>;