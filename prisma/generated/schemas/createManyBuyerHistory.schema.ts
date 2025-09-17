import { z } from 'zod';
import { BuyerHistoryCreateManyInputObjectSchema } from './objects/BuyerHistoryCreateManyInput.schema';

export const BuyerHistoryCreateManySchema = z.object({ data: z.union([ BuyerHistoryCreateManyInputObjectSchema, z.array(BuyerHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })