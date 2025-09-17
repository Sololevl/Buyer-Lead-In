import { z } from 'zod';

export const BuyerHistoryScalarFieldEnumSchema = z.enum(['id', 'buyerId', 'changedBy', 'changedAt', 'diff'])

export type BuyerHistoryScalarFieldEnum = z.infer<typeof BuyerHistoryScalarFieldEnumSchema>;