import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { BuyerHistoryCountOrderByAggregateInputObjectSchema } from './BuyerHistoryCountOrderByAggregateInput.schema';
import { BuyerHistoryMaxOrderByAggregateInputObjectSchema } from './BuyerHistoryMaxOrderByAggregateInput.schema';
import { BuyerHistoryMinOrderByAggregateInputObjectSchema } from './BuyerHistoryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  buyerId: SortOrderSchema.optional(),
  changedBy: SortOrderSchema.optional(),
  changedAt: SortOrderSchema.optional(),
  diff: SortOrderSchema.optional(),
  _count: z.lazy(() => BuyerHistoryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BuyerHistoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BuyerHistoryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BuyerHistoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BuyerHistoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryOrderByWithAggregationInput>;
export const BuyerHistoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
