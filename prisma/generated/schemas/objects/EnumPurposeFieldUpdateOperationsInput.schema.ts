import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PurposeSchema } from '../enums/Purpose.schema'

const makeSchema = () => z.object({
  set: PurposeSchema.optional()
}).strict();
export const EnumPurposeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPurposeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumPurposeFieldUpdateOperationsInput>;
export const EnumPurposeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
