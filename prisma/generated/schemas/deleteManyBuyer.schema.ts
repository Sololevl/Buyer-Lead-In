import { z } from 'zod';
import { BuyerWhereInputObjectSchema } from './objects/BuyerWhereInput.schema';

export const BuyerDeleteManySchema = z.object({ where: BuyerWhereInputObjectSchema.optional()  })