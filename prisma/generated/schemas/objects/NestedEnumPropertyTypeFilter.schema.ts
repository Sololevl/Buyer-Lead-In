import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PropertyTypeSchema } from '../enums/PropertyType.schema'

const nestedenumpropertytypefilterSchema = z.object({
  equals: PropertyTypeSchema.optional(),
  in: PropertyTypeSchema.array().optional(),
  notIn: PropertyTypeSchema.array().optional(),
  not: z.union([PropertyTypeSchema, z.lazy(() => NestedEnumPropertyTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPropertyTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumPropertyTypeFilter> = nestedenumpropertytypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumPropertyTypeFilter>;
export const NestedEnumPropertyTypeFilterObjectZodSchema = nestedenumpropertytypefilterSchema;
