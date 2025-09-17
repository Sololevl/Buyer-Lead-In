import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PropertyTypeSchema } from '../enums/PropertyType.schema';
import { NestedEnumPropertyTypeFilterObjectSchema } from './NestedEnumPropertyTypeFilter.schema'

const makeSchema = () => z.object({
  equals: PropertyTypeSchema.optional(),
  in: PropertyTypeSchema.array().optional(),
  notIn: PropertyTypeSchema.array().optional(),
  not: z.union([PropertyTypeSchema, z.lazy(() => NestedEnumPropertyTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumPropertyTypeFilterObjectSchema: z.ZodType<Prisma.EnumPropertyTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPropertyTypeFilter>;
export const EnumPropertyTypeFilterObjectZodSchema = makeSchema();
