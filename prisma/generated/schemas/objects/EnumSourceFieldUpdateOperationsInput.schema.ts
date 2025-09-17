import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SourceSchema } from '../enums/Source.schema'

const makeSchema = () => z.object({
  set: SourceSchema.optional()
}).strict();
export const EnumSourceFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumSourceFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumSourceFieldUpdateOperationsInput>;
export const EnumSourceFieldUpdateOperationsInputObjectZodSchema = makeSchema();
