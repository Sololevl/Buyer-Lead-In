import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumCityWithAggregatesFilterObjectSchema } from './EnumCityWithAggregatesFilter.schema';
import { CitySchema } from '../enums/City.schema';
import { EnumPropertyTypeWithAggregatesFilterObjectSchema } from './EnumPropertyTypeWithAggregatesFilter.schema';
import { PropertyTypeSchema } from '../enums/PropertyType.schema';
import { EnumBHKNullableWithAggregatesFilterObjectSchema } from './EnumBHKNullableWithAggregatesFilter.schema';
import { BHKSchema } from '../enums/BHK.schema';
import { EnumPurposeWithAggregatesFilterObjectSchema } from './EnumPurposeWithAggregatesFilter.schema';
import { PurposeSchema } from '../enums/Purpose.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumTimelineWithAggregatesFilterObjectSchema } from './EnumTimelineWithAggregatesFilter.schema';
import { TimelineSchema } from '../enums/Timeline.schema';
import { EnumSourceWithAggregatesFilterObjectSchema } from './EnumSourceWithAggregatesFilter.schema';
import { SourceSchema } from '../enums/Source.schema';
import { EnumStatusWithAggregatesFilterObjectSchema } from './EnumStatusWithAggregatesFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const buyerscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => BuyerScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BuyerScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BuyerScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuyerScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BuyerScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  fullName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(80)]).optional(),
  email: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  phone: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(15)]).optional(),
  city: z.union([z.lazy(() => EnumCityWithAggregatesFilterObjectSchema), CitySchema]).optional(),
  propertyType: z.union([z.lazy(() => EnumPropertyTypeWithAggregatesFilterObjectSchema), PropertyTypeSchema]).optional(),
  bhk: z.union([z.lazy(() => EnumBHKNullableWithAggregatesFilterObjectSchema), BHKSchema]).optional().nullable(),
  purpose: z.union([z.lazy(() => EnumPurposeWithAggregatesFilterObjectSchema), PurposeSchema]).optional(),
  budgetMin: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  budgetMax: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  timeline: z.union([z.lazy(() => EnumTimelineWithAggregatesFilterObjectSchema), TimelineSchema]).optional(),
  source: z.union([z.lazy(() => EnumSourceWithAggregatesFilterObjectSchema), SourceSchema]).optional(),
  status: z.union([z.lazy(() => EnumStatusWithAggregatesFilterObjectSchema), StatusSchema]).optional(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(1000)]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  ownerId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const BuyerScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BuyerScalarWhereWithAggregatesInput> = buyerscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.BuyerScalarWhereWithAggregatesInput>;
export const BuyerScalarWhereWithAggregatesInputObjectZodSchema = buyerscalarwherewithaggregatesinputSchema;
