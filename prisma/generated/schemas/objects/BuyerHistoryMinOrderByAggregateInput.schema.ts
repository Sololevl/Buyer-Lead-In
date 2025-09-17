import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  buyerId: SortOrderSchema.optional(),
  changedBy: SortOrderSchema.optional(),
  changedAt: SortOrderSchema.optional()
}).strict();
export const BuyerHistoryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryMinOrderByAggregateInput>;
export const BuyerHistoryMinOrderByAggregateInputObjectZodSchema = makeSchema();
