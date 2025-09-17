import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  buyerId: z.literal(true).optional(),
  changedBy: z.literal(true).optional(),
  changedAt: z.literal(true).optional()
}).strict();
export const BuyerHistoryMaxAggregateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryMaxAggregateInputType>;
export const BuyerHistoryMaxAggregateInputObjectZodSchema = makeSchema();
