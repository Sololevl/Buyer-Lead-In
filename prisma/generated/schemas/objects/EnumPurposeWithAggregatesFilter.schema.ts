import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PurposeSchema } from '../enums/Purpose.schema';
import { NestedEnumPurposeWithAggregatesFilterObjectSchema } from './NestedEnumPurposeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPurposeFilterObjectSchema } from './NestedEnumPurposeFilter.schema'

const makeSchema = () => z.object({
  equals: PurposeSchema.optional(),
  in: PurposeSchema.array().optional(),
  notIn: PurposeSchema.array().optional(),
  not: z.union([PurposeSchema, z.lazy(() => NestedEnumPurposeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPurposeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPurposeFilterObjectSchema).optional()
}).strict();
export const EnumPurposeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPurposeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPurposeWithAggregatesFilter>;
export const EnumPurposeWithAggregatesFilterObjectZodSchema = makeSchema();
