import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SourceSchema } from '../enums/Source.schema'

const nestedenumsourcefilterSchema = z.object({
  equals: SourceSchema.optional(),
  in: SourceSchema.array().optional(),
  notIn: SourceSchema.array().optional(),
  not: z.union([SourceSchema, z.lazy(() => NestedEnumSourceFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumSourceFilterObjectSchema: z.ZodType<Prisma.NestedEnumSourceFilter> = nestedenumsourcefilterSchema as unknown as z.ZodType<Prisma.NestedEnumSourceFilter>;
export const NestedEnumSourceFilterObjectZodSchema = nestedenumsourcefilterSchema;
