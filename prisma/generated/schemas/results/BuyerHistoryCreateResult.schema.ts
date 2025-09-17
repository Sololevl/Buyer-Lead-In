import { z } from 'zod';
export const BuyerHistoryCreateResultSchema = z.object({
  id: z.string(),
  buyer: z.unknown(),
  buyerId: z.string(),
  changedBy: z.string(),
  changedAt: z.date(),
  diff: z.unknown()
});