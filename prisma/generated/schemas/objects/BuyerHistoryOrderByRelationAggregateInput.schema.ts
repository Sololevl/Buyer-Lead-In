import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const BuyerHistoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryOrderByRelationAggregateInput>;
export const BuyerHistoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
