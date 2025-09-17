import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CitySchema } from '../enums/City.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCityFilterObjectSchema } from './NestedEnumCityFilter.schema'

const nestedenumcitywithaggregatesfilterSchema = z.object({
  equals: CitySchema.optional(),
  in: CitySchema.array().optional(),
  notIn: CitySchema.array().optional(),
  not: z.union([CitySchema, z.lazy(() => NestedEnumCityWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCityFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCityFilterObjectSchema).optional()
}).strict();
export const NestedEnumCityWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCityWithAggregatesFilter> = nestedenumcitywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCityWithAggregatesFilter>;
export const NestedEnumCityWithAggregatesFilterObjectZodSchema = nestedenumcitywithaggregatesfilterSchema;
