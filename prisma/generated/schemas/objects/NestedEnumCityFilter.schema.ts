import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CitySchema } from '../enums/City.schema'

const nestedenumcityfilterSchema = z.object({
  equals: CitySchema.optional(),
  in: CitySchema.array().optional(),
  notIn: CitySchema.array().optional(),
  not: z.union([CitySchema, z.lazy(() => NestedEnumCityFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCityFilterObjectSchema: z.ZodType<Prisma.NestedEnumCityFilter> = nestedenumcityfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCityFilter>;
export const NestedEnumCityFilterObjectZodSchema = nestedenumcityfilterSchema;
