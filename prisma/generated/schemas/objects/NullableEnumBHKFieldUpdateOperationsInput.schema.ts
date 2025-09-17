import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BHKSchema } from '../enums/BHK.schema'

const makeSchema = () => z.object({
  set: BHKSchema.optional()
}).strict();
export const NullableEnumBHKFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumBHKFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumBHKFieldUpdateOperationsInput>;
export const NullableEnumBHKFieldUpdateOperationsInputObjectZodSchema = makeSchema();
