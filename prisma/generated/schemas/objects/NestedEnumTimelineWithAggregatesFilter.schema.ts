import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TimelineSchema } from '../enums/Timeline.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTimelineFilterObjectSchema } from './NestedEnumTimelineFilter.schema'

const nestedenumtimelinewithaggregatesfilterSchema = z.object({
  equals: TimelineSchema.optional(),
  in: TimelineSchema.array().optional(),
  notIn: TimelineSchema.array().optional(),
  not: z.union([TimelineSchema, z.lazy(() => NestedEnumTimelineWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumTimelineFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumTimelineFilterObjectSchema).optional()
}).strict();
export const NestedEnumTimelineWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumTimelineWithAggregatesFilter> = nestedenumtimelinewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumTimelineWithAggregatesFilter>;
export const NestedEnumTimelineWithAggregatesFilterObjectZodSchema = nestedenumtimelinewithaggregatesfilterSchema;
