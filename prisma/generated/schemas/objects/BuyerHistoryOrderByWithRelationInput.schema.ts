import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { BuyerOrderByWithRelationInputObjectSchema } from './BuyerOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  buyerId: SortOrderSchema.optional(),
  changedBy: SortOrderSchema.optional(),
  changedAt: SortOrderSchema.optional(),
  diff: SortOrderSchema.optional(),
  buyer: z.lazy(() => BuyerOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const BuyerHistoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BuyerHistoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryOrderByWithRelationInput>;
export const BuyerHistoryOrderByWithRelationInputObjectZodSchema = makeSchema();
