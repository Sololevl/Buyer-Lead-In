import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  buyerId: SortOrderSchema.optional(),
  changedBy: SortOrderSchema.optional(),
  changedAt: SortOrderSchema.optional()
}).strict();
export const BuyerHistoryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryMaxOrderByAggregateInput>;
export const BuyerHistoryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
