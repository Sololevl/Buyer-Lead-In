import { z } from 'zod';
export const BuyerHistoryFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  buyer: z.unknown(),
  buyerId: z.string(),
  changedBy: z.string(),
  changedAt: z.date(),
  diff: z.unknown()
}));