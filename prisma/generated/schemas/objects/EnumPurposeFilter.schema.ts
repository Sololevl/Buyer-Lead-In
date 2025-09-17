import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PurposeSchema } from '../enums/Purpose.schema';
import { NestedEnumPurposeFilterObjectSchema } from './NestedEnumPurposeFilter.schema'

const makeSchema = () => z.object({
  equals: PurposeSchema.optional(),
  in: PurposeSchema.array().optional(),
  notIn: PurposeSchema.array().optional(),
  not: z.union([PurposeSchema, z.lazy(() => NestedEnumPurposeFilterObjectSchema)]).optional()
}).strict();
export const EnumPurposeFilterObjectSchema: z.ZodType<Prisma.EnumPurposeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPurposeFilter>;
export const EnumPurposeFilterObjectZodSchema = makeSchema();
