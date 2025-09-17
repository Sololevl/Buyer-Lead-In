import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PurposeSchema } from '../enums/Purpose.schema'

const nestedenumpurposefilterSchema = z.object({
  equals: PurposeSchema.optional(),
  in: PurposeSchema.array().optional(),
  notIn: PurposeSchema.array().optional(),
  not: z.union([PurposeSchema, z.lazy(() => NestedEnumPurposeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPurposeFilterObjectSchema: z.ZodType<Prisma.NestedEnumPurposeFilter> = nestedenumpurposefilterSchema as unknown as z.ZodType<Prisma.NestedEnumPurposeFilter>;
export const NestedEnumPurposeFilterObjectZodSchema = nestedenumpurposefilterSchema;
