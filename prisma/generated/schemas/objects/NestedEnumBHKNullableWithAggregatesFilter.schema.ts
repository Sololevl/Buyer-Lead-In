import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BHKSchema } from '../enums/BHK.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumBHKNullableFilterObjectSchema } from './NestedEnumBHKNullableFilter.schema'

const nestedenumbhknullablewithaggregatesfilterSchema = z.object({
  equals: BHKSchema.optional().nullable(),
  in: BHKSchema.array().optional().nullable(),
  notIn: BHKSchema.array().optional().nullable(),
  not: z.union([BHKSchema, z.lazy(() => NestedEnumBHKNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBHKNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBHKNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumBHKNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumBHKNullableWithAggregatesFilter> = nestedenumbhknullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumBHKNullableWithAggregatesFilter>;
export const NestedEnumBHKNullableWithAggregatesFilterObjectZodSchema = nestedenumbhknullablewithaggregatesfilterSchema;
