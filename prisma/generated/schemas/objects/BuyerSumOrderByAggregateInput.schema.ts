import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  budgetMin: SortOrderSchema.optional(),
  budgetMax: SortOrderSchema.optional()
}).strict();
export const BuyerSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuyerSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerSumOrderByAggregateInput>;
export const BuyerSumOrderByAggregateInputObjectZodSchema = makeSchema();
