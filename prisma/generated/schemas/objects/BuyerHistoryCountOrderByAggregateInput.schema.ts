import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  buyerId: SortOrderSchema.optional(),
  changedBy: SortOrderSchema.optional(),
  changedAt: SortOrderSchema.optional(),
  diff: SortOrderSchema.optional()
}).strict();
export const BuyerHistoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryCountOrderByAggregateInput>;
export const BuyerHistoryCountOrderByAggregateInputObjectZodSchema = makeSchema();
