import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  buyerId: z.literal(true).optional(),
  changedBy: z.literal(true).optional(),
  changedAt: z.literal(true).optional(),
  diff: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const BuyerHistoryCountAggregateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryCountAggregateInputType>;
export const BuyerHistoryCountAggregateInputObjectZodSchema = makeSchema();
