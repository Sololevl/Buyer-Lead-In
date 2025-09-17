import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  budgetMin: z.literal(true).optional(),
  budgetMax: z.literal(true).optional()
}).strict();
export const BuyerSumAggregateInputObjectSchema: z.ZodType<Prisma.BuyerSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuyerSumAggregateInputType>;
export const BuyerSumAggregateInputObjectZodSchema = makeSchema();
