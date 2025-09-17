import { z } from 'zod';
import { BuyerUpdateManyMutationInputObjectSchema } from './objects/BuyerUpdateManyMutationInput.schema';
import { BuyerWhereInputObjectSchema } from './objects/BuyerWhereInput.schema';

export const BuyerUpdateManySchema = z.object({ data: BuyerUpdateManyMutationInputObjectSchema, where: BuyerWhereInputObjectSchema.optional()  })