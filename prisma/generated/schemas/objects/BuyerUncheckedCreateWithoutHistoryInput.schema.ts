import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CitySchema } from '../enums/City.schema';
import { PropertyTypeSchema } from '../enums/PropertyType.schema';
import { BHKSchema } from '../enums/BHK.schema';
import { PurposeSchema } from '../enums/Purpose.schema';
import { TimelineSchema } from '../enums/Timeline.schema';
import { SourceSchema } from '../enums/Source.schema';
import { StatusSchema } from '../enums/Status.schema';
import { BuyerCreatetagsInputObjectSchema } from './BuyerCreatetagsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string(),
  city: CitySchema,
  propertyType: PropertyTypeSchema,
  bhk: BHKSchema.optional().nullable(),
  purpose: PurposeSchema,
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  timeline: TimelineSchema,
  source: SourceSchema,
  status: StatusSchema.optional(),
  notes: z.string().optional().nullable(),
  tags: z.union([z.lazy(() => BuyerCreatetagsInputObjectSchema), z.string().array()]).optional(),
  ownerId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const BuyerUncheckedCreateWithoutHistoryInputObjectSchema: z.ZodType<Prisma.BuyerUncheckedCreateWithoutHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerUncheckedCreateWithoutHistoryInput>;
export const BuyerUncheckedCreateWithoutHistoryInputObjectZodSchema = makeSchema();
