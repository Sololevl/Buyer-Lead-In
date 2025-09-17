import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerCreateManyInputObjectSchema } from './objects/BuyerCreateManyInput.schema';

export const BuyerCreateManyAndReturnSchema = z.object({ select: BuyerSelectObjectSchema.optional(), data: z.union([ BuyerCreateManyInputObjectSchema, z.array(BuyerCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()