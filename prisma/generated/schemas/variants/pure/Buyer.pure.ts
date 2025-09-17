import { z } from 'zod';

import { CitySchema } from '../../enums/City.schema';
import { PropertyTypeSchema } from '../../enums/PropertyType.schema';
import { BHKSchema } from '../../enums/BHK.schema';
import { PurposeSchema } from '../../enums/Purpose.schema';
import { TimelineSchema } from '../../enums/Timeline.schema';
import { SourceSchema } from '../../enums/Source.schema';
import { StatusSchema } from '../../enums/Status.schema';
// prettier-ignore
export const BuyerModelSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string().nullable(),
    phone: z.string(),
    city: CitySchema,
    propertyType: PropertyTypeSchema,
    bhk: BHKSchema.nullable(),
    purpose: PurposeSchema,
    budgetMin: z.number().int().nullable(),
    budgetMax: z.number().int().nullable(),
    timeline: TimelineSchema,
    source: SourceSchema,
    status: StatusSchema,
    notes: z.string().nullable(),
    tags: z.array(z.string()),
    ownerId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    history: z.array(z.unknown())
}).strict();

export type BuyerModelType = z.infer<typeof BuyerModelSchema>;
