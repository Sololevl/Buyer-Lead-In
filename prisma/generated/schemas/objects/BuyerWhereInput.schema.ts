import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumCityFilterObjectSchema } from './EnumCityFilter.schema';
import { CitySchema } from '../enums/City.schema';
import { EnumPropertyTypeFilterObjectSchema } from './EnumPropertyTypeFilter.schema';
import { PropertyTypeSchema } from '../enums/PropertyType.schema';
import { EnumBHKNullableFilterObjectSchema } from './EnumBHKNullableFilter.schema';
import { BHKSchema } from '../enums/BHK.schema';
import { EnumPurposeFilterObjectSchema } from './EnumPurposeFilter.schema';
import { PurposeSchema } from '../enums/Purpose.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumTimelineFilterObjectSchema } from './EnumTimelineFilter.schema';
import { TimelineSchema } from '../enums/Timeline.schema';
import { EnumSourceFilterObjectSchema } from './EnumSourceFilter.schema';
import { SourceSchema } from '../enums/Source.schema';
import { EnumStatusFilterObjectSchema } from './EnumStatusFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BuyerHistoryListRelationFilterObjectSchema } from './BuyerHistoryListRelationFilter.schema'

const buyerwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BuyerWhereInputObjectSchema), z.lazy(() => BuyerWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BuyerWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuyerWhereInputObjectSchema), z.lazy(() => BuyerWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fullName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(80)]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(15)]).optional(),
  city: z.union([z.lazy(() => EnumCityFilterObjectSchema), CitySchema]).optional(),
  propertyType: z.union([z.lazy(() => EnumPropertyTypeFilterObjectSchema), PropertyTypeSchema]).optional(),
  bhk: z.union([z.lazy(() => EnumBHKNullableFilterObjectSchema), BHKSchema]).optional().nullable(),
  purpose: z.union([z.lazy(() => EnumPurposeFilterObjectSchema), PurposeSchema]).optional(),
  budgetMin: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  budgetMax: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  timeline: z.union([z.lazy(() => EnumTimelineFilterObjectSchema), TimelineSchema]).optional(),
  source: z.union([z.lazy(() => EnumSourceFilterObjectSchema), SourceSchema]).optional(),
  status: z.union([z.lazy(() => EnumStatusFilterObjectSchema), StatusSchema]).optional(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(1000)]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  ownerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  history: z.lazy(() => BuyerHistoryListRelationFilterObjectSchema).optional()
}).strict();
export const BuyerWhereInputObjectSchema: z.ZodType<Prisma.BuyerWhereInput> = buyerwhereinputSchema as unknown as z.ZodType<Prisma.BuyerWhereInput>;
export const BuyerWhereInputObjectZodSchema = buyerwhereinputSchema;
