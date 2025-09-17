import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SourceSchema } from '../enums/Source.schema';
import { NestedEnumSourceFilterObjectSchema } from './NestedEnumSourceFilter.schema'

const makeSchema = () => z.object({
  equals: SourceSchema.optional(),
  in: SourceSchema.array().optional(),
  notIn: SourceSchema.array().optional(),
  not: z.union([SourceSchema, z.lazy(() => NestedEnumSourceFilterObjectSchema)]).optional()
}).strict();
export const EnumSourceFilterObjectSchema: z.ZodType<Prisma.EnumSourceFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSourceFilter>;
export const EnumSourceFilterObjectZodSchema = makeSchema();
