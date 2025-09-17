import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TimelineSchema } from '../enums/Timeline.schema'

const nestedenumtimelinefilterSchema = z.object({
  equals: TimelineSchema.optional(),
  in: TimelineSchema.array().optional(),
  notIn: TimelineSchema.array().optional(),
  not: z.union([TimelineSchema, z.lazy(() => NestedEnumTimelineFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumTimelineFilterObjectSchema: z.ZodType<Prisma.NestedEnumTimelineFilter> = nestedenumtimelinefilterSchema as unknown as z.ZodType<Prisma.NestedEnumTimelineFilter>;
export const NestedEnumTimelineFilterObjectZodSchema = nestedenumtimelinefilterSchema;
