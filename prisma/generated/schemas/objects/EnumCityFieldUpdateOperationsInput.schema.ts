import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CitySchema } from '../enums/City.schema'

const makeSchema = () => z.object({
  set: CitySchema.optional()
}).strict();
export const EnumCityFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCityFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCityFieldUpdateOperationsInput>;
export const EnumCityFieldUpdateOperationsInputObjectZodSchema = makeSchema();
