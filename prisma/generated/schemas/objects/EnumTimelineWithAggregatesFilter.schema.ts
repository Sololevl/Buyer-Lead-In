import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TimelineSchema } from '../enums/Timeline.schema';
import { NestedEnumTimelineWithAggregatesFilterObjectSchema } from './NestedEnumTimelineWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTimelineFilterObjectSchema } from './NestedEnumTimelineFilter.schema'

const makeSchema = () => z.object({
  equals: TimelineSchema.optional(),
  in: TimelineSchema.array().optional(),
  notIn: TimelineSchema.array().optional(),
  not: z.union([TimelineSchema, z.lazy(() => NestedEnumTimelineWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumTimelineFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumTimelineFilterObjectSchema).optional()
}).strict();
export const EnumTimelineWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumTimelineWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTimelineWithAggregatesFilter>;
export const EnumTimelineWithAggregatesFilterObjectZodSchema = makeSchema();
