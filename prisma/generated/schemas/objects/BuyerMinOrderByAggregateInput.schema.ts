import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  propertyType: SortOrderSchema.optional(),
  bhk: SortOrderSchema.optional(),
  purpose: SortOrderSchema.optional(),
  budgetMin: SortOrderSchema.optional(),
  budgetMax: SortOrderSchema.optional(),
  timeline: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  ownerId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const BuyerMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuyerMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerMinOrderByAggregateInput>;
export const BuyerMinOrderByAggregateInputObjectZodSchema = makeSchema();
