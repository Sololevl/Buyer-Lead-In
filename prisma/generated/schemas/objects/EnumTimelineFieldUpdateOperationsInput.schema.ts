import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TimelineSchema } from '../enums/Timeline.schema'

const makeSchema = () => z.object({
  set: TimelineSchema.optional()
}).strict();
export const EnumTimelineFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumTimelineFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumTimelineFieldUpdateOperationsInput>;
export const EnumTimelineFieldUpdateOperationsInputObjectZodSchema = makeSchema();
