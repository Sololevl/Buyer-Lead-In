import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TimelineSchema } from '../enums/Timeline.schema';
import { NestedEnumTimelineFilterObjectSchema } from './NestedEnumTimelineFilter.schema'

const makeSchema = () => z.object({
  equals: TimelineSchema.optional(),
  in: TimelineSchema.array().optional(),
  notIn: TimelineSchema.array().optional(),
  not: z.union([TimelineSchema, z.lazy(() => NestedEnumTimelineFilterObjectSchema)]).optional()
}).strict();
export const EnumTimelineFilterObjectSchema: z.ZodType<Prisma.EnumTimelineFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTimelineFilter>;
export const EnumTimelineFilterObjectZodSchema = makeSchema();
