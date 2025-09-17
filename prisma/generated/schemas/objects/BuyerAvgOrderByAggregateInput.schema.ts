import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  budgetMin: SortOrderSchema.optional(),
  budgetMax: SortOrderSchema.optional()
}).strict();
export const BuyerAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuyerAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerAvgOrderByAggregateInput>;
export const BuyerAvgOrderByAggregateInputObjectZodSchema = makeSchema();
