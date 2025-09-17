import { z } from 'zod';
import { BuyerHistorySelectObjectSchema } from './objects/BuyerHistorySelect.schema';
import { BuyerHistoryCreateManyInputObjectSchema } from './objects/BuyerHistoryCreateManyInput.schema';

export const BuyerHistoryCreateManyAndReturnSchema = z.object({ select: BuyerHistorySelectObjectSchema.optional(), data: z.union([ BuyerHistoryCreateManyInputObjectSchema, z.array(BuyerHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()