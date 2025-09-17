import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CitySchema } from '../enums/City.schema';
import { NestedEnumCityWithAggregatesFilterObjectSchema } from './NestedEnumCityWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCityFilterObjectSchema } from './NestedEnumCityFilter.schema'

const makeSchema = () => z.object({
  equals: CitySchema.optional(),
  in: CitySchema.array().optional(),
  notIn: CitySchema.array().optional(),
  not: z.union([CitySchema, z.lazy(() => NestedEnumCityWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCityFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCityFilterObjectSchema).optional()
}).strict();
export const EnumCityWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCityWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCityWithAggregatesFilter>;
export const EnumCityWithAggregatesFilterObjectZodSchema = makeSchema();
