import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  budgetMin: z.literal(true).optional(),
  budgetMax: z.literal(true).optional()
}).strict();
export const BuyerAvgAggregateInputObjectSchema: z.ZodType<Prisma.BuyerAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuyerAvgAggregateInputType>;
export const BuyerAvgAggregateInputObjectZodSchema = makeSchema();
