import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CitySchema } from '../enums/City.schema';
import { NestedEnumCityFilterObjectSchema } from './NestedEnumCityFilter.schema'

const makeSchema = () => z.object({
  equals: CitySchema.optional(),
  in: CitySchema.array().optional(),
  notIn: CitySchema.array().optional(),
  not: z.union([CitySchema, z.lazy(() => NestedEnumCityFilterObjectSchema)]).optional()
}).strict();
export const EnumCityFilterObjectSchema: z.ZodType<Prisma.EnumCityFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCityFilter>;
export const EnumCityFilterObjectZodSchema = makeSchema();
