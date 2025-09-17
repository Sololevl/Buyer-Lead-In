import { z } from 'zod';

import { CitySchema } from '../../enums/City.schema';
import { PropertyTypeSchema } from '../../enums/PropertyType.schema';
import { BHKSchema } from '../../enums/BHK.schema';
import { PurposeSchema } from '../../enums/Purpose.schema';
import { TimelineSchema } from '../../enums/Timeline.schema';
import { SourceSchema } from '../../enums/Source.schema';
import { StatusSchema } from '../../enums/Status.schema';
// prettier-ignore
export const BuyerInputSchema = z.object({
    id: z.string(),
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
    status: StatusSchema,
    notes: z.string().optional().nullable(),
    tags: z.array(z.string()),
    ownerId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    history: z.array(z.unknown())
}).strict();

export type BuyerInputType = z.infer<typeof BuyerInputSchema>;
