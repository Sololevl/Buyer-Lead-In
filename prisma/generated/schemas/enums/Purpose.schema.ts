import { z } from 'zod';

export const PurposeSchema = z.enum(['Buy', 'Rent'])

export type Purpose = z.infer<typeof PurposeSchema>;