import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerUpdateManyMutationInputObjectSchema } from './objects/BuyerUpdateManyMutationInput.schema';
import { BuyerWhereInputObjectSchema } from './objects/BuyerWhereInput.schema';

export const BuyerUpdateManyAndReturnSchema = z.object({ select: BuyerSelectObjectSchema.optional(), data: BuyerUpdateManyMutationInputObjectSchema, where: BuyerWhereInputObjectSchema.optional()  }).strict()