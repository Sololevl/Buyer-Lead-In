import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BHKSchema } from '../enums/BHK.schema'

const nestedenumbhknullablefilterSchema = z.object({
  equals: BHKSchema.optional().nullable(),
  in: BHKSchema.array().optional().nullable(),
  notIn: BHKSchema.array().optional().nullable(),
  not: z.union([BHKSchema, z.lazy(() => NestedEnumBHKNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumBHKNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumBHKNullableFilter> = nestedenumbhknullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumBHKNullableFilter>;
export const NestedEnumBHKNullableFilterObjectZodSchema = nestedenumbhknullablefilterSchema;
