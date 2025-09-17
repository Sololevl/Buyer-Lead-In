import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BuyerCountOrderByAggregateInputObjectSchema } from './BuyerCountOrderByAggregateInput.schema';
import { BuyerAvgOrderByAggregateInputObjectSchema } from './BuyerAvgOrderByAggregateInput.schema';
import { BuyerMaxOrderByAggregateInputObjectSchema } from './BuyerMaxOrderByAggregateInput.schema';
import { BuyerMinOrderByAggregateInputObjectSchema } from './BuyerMinOrderByAggregateInput.schema';
import { BuyerSumOrderByAggregateInputObjectSchema } from './BuyerSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  propertyType: SortOrderSchema.optional(),
  bhk: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  purpose: SortOrderSchema.optional(),
  budgetMin: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  budgetMax: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  timeline: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tags: SortOrderSchema.optional(),
  ownerId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => BuyerCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => BuyerAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BuyerMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BuyerMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => BuyerSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BuyerOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BuyerOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerOrderByWithAggregationInput>;
export const BuyerOrderByWithAggregationInputObjectZodSchema = makeSchema();
