import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CitySchema } from '../enums/City.schema';
import { EnumCityFieldUpdateOperationsInputObjectSchema } from './EnumCityFieldUpdateOperationsInput.schema';
import { PropertyTypeSchema } from '../enums/PropertyType.schema';
import { EnumPropertyTypeFieldUpdateOperationsInputObjectSchema } from './EnumPropertyTypeFieldUpdateOperationsInput.schema';
import { BHKSchema } from '../enums/BHK.schema';
import { NullableEnumBHKFieldUpdateOperationsInputObjectSchema } from './NullableEnumBHKFieldUpdateOperationsInput.schema';
import { PurposeSchema } from '../enums/Purpose.schema';
import { EnumPurposeFieldUpdateOperationsInputObjectSchema } from './EnumPurposeFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { TimelineSchema } from '../enums/Timeline.schema';
import { EnumTimelineFieldUpdateOperationsInputObjectSchema } from './EnumTimelineFieldUpdateOperationsInput.schema';
import { SourceSchema } from '../enums/Source.schema';
import { EnumSourceFieldUpdateOperationsInputObjectSchema } from './EnumSourceFieldUpdateOperationsInput.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumStatusFieldUpdateOperationsInputObjectSchema } from './EnumStatusFieldUpdateOperationsInput.schema';
import { BuyerUpdatetagsInputObjectSchema } from './BuyerUpdatetagsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BuyerHistoryUncheckedUpdateManyWithoutBuyerNestedInputObjectSchema } from './BuyerHistoryUncheckedUpdateManyWithoutBuyerNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fullName: z.union([z.string().max(80), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string().max(255), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  phone: z.union([z.string().max(15), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  city: z.union([CitySchema, z.lazy(() => EnumCityFieldUpdateOperationsInputObjectSchema)]).optional(),
  propertyType: z.union([PropertyTypeSchema, z.lazy(() => EnumPropertyTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  bhk: z.union([BHKSchema, z.lazy(() => NullableEnumBHKFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  purpose: z.union([PurposeSchema, z.lazy(() => EnumPurposeFieldUpdateOperationsInputObjectSchema)]).optional(),
  budgetMin: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  budgetMax: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  timeline: z.union([TimelineSchema, z.lazy(() => EnumTimelineFieldUpdateOperationsInputObjectSchema)]).optional(),
  source: z.union([SourceSchema, z.lazy(() => EnumSourceFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([StatusSchema, z.lazy(() => EnumStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  notes: z.union([z.string().max(1000), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  tags: z.union([z.lazy(() => BuyerUpdatetagsInputObjectSchema), z.string().array()]).optional(),
  ownerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  history: z.lazy(() => BuyerHistoryUncheckedUpdateManyWithoutBuyerNestedInputObjectSchema).optional()
}).strict();
export const BuyerUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.BuyerUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerUncheckedUpdateInput>;
export const BuyerUncheckedUpdateInputObjectZodSchema = makeSchema();
