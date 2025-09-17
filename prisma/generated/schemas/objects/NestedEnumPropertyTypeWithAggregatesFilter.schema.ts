import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PropertyTypeSchema } from '../enums/PropertyType.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPropertyTypeFilterObjectSchema } from './NestedEnumPropertyTypeFilter.schema'

const nestedenumpropertytypewithaggregatesfilterSchema = z.object({
  equals: PropertyTypeSchema.optional(),
  in: PropertyTypeSchema.array().optional(),
  notIn: PropertyTypeSchema.array().optional(),
  not: z.union([PropertyTypeSchema, z.lazy(() => NestedEnumPropertyTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPropertyTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPropertyTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumPropertyTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPropertyTypeWithAggregatesFilter> = nestedenumpropertytypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPropertyTypeWithAggregatesFilter>;
export const NestedEnumPropertyTypeWithAggregatesFilterObjectZodSchema = nestedenumpropertytypewithaggregatesfilterSchema;
