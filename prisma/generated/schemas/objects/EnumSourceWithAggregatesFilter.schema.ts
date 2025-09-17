import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SourceSchema } from '../enums/Source.schema';
import { NestedEnumSourceWithAggregatesFilterObjectSchema } from './NestedEnumSourceWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSourceFilterObjectSchema } from './NestedEnumSourceFilter.schema'

const makeSchema = () => z.object({
  equals: SourceSchema.optional(),
  in: SourceSchema.array().optional(),
  notIn: SourceSchema.array().optional(),
  not: z.union([SourceSchema, z.lazy(() => NestedEnumSourceWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSourceFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSourceFilterObjectSchema).optional()
}).strict();
export const EnumSourceWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumSourceWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSourceWithAggregatesFilter>;
export const EnumSourceWithAggregatesFilterObjectZodSchema = makeSchema();
