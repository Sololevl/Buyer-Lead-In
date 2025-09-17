import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BHKSchema } from '../enums/BHK.schema';
import { NestedEnumBHKNullableFilterObjectSchema } from './NestedEnumBHKNullableFilter.schema'

const makeSchema = () => z.object({
  equals: BHKSchema.optional().nullable(),
  in: BHKSchema.array().optional().nullable(),
  notIn: BHKSchema.array().optional().nullable(),
  not: z.union([BHKSchema, z.lazy(() => NestedEnumBHKNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumBHKNullableFilterObjectSchema: z.ZodType<Prisma.EnumBHKNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBHKNullableFilter>;
export const EnumBHKNullableFilterObjectZodSchema = makeSchema();
