import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  buyerId: z.literal(true).optional(),
  changedBy: z.literal(true).optional(),
  changedAt: z.literal(true).optional()
}).strict();
export const BuyerHistoryMinAggregateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryMinAggregateInputType>;
export const BuyerHistoryMinAggregateInputObjectZodSchema = makeSchema();
