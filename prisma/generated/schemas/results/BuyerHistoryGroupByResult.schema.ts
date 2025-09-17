import { z } from 'zod';
export const BuyerHistoryGroupByResultSchema = z.array(z.object({
  id: z.string(),
  buyerId: z.string(),
  changedBy: z.string(),
  changedAt: z.date(),
  diff: z.unknown(),
  _count: z.object({
    id: z.number(),
    buyer: z.number(),
    buyerId: z.number(),
    changedBy: z.number(),
    changedAt: z.number(),
    diff: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    buyerId: z.string().nullable(),
    changedBy: z.string().nullable(),
    changedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    buyerId: z.string().nullable(),
    changedBy: z.string().nullable(),
    changedAt: z.date().nullable()
  }).nullable().optional()
}));