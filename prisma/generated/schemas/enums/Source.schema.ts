import { z } from 'zod';

export const SourceSchema = z.enum(['Website', 'Referral', 'WalkIn', 'Call', 'Other'])

export type Source = z.infer<typeof SourceSchema>;