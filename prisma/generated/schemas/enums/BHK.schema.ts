import { z } from 'zod';

export const BHKSchema = z.enum(['Studio', 'One', 'Two', 'Three', 'Four'])

export type BHK = z.infer<typeof BHKSchema>;