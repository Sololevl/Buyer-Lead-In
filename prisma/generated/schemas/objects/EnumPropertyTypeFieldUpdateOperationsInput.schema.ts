import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PropertyTypeSchema } from '../enums/PropertyType.schema'

const makeSchema = () => z.object({
  set: PropertyTypeSchema.optional()
}).strict();
export const EnumPropertyTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPropertyTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumPropertyTypeFieldUpdateOperationsInput>;
export const EnumPropertyTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
