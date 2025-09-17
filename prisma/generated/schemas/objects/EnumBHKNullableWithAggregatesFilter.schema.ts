import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BHKSchema } from '../enums/BHK.schema';
import { NestedEnumBHKNullableWithAggregatesFilterObjectSchema } from './NestedEnumBHKNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumBHKNullableFilterObjectSchema } from './NestedEnumBHKNullableFilter.schema'

const makeSchema = () => z.object({
  equals: BHKSchema.optional().nullable(),
  in: BHKSchema.array().optional().nullable(),
  notIn: BHKSchema.array().optional().nullable(),
  not: z.union([BHKSchema, z.lazy(() => NestedEnumBHKNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBHKNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBHKNullableFilterObjectSchema).optional()
}).strict();
export const EnumBHKNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumBHKNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBHKNullableWithAggregatesFilter>;
export const EnumBHKNullableWithAggregatesFilterObjectZodSchema = makeSchema();
