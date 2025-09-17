import { z } from 'zod';
import { BuyerCreateManyInputObjectSchema } from './objects/BuyerCreateManyInput.schema';

export const BuyerCreateManySchema = z.object({ data: z.union([ BuyerCreateManyInputObjectSchema, z.array(BuyerCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })