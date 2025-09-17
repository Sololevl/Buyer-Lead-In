import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BuyerHistoryOrderByRelationAggregateInputObjectSchema } from './BuyerHistoryOrderByRelationAggregateInput.schema'

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
  history: z.lazy(() => BuyerHistoryOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const BuyerOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BuyerOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerOrderByWithRelationInput>;
export const BuyerOrderByWithRelationInputObjectZodSchema = makeSchema();
