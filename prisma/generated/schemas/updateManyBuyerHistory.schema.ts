import { z } from 'zod';
import { BuyerHistoryUpdateManyMutationInputObjectSchema } from './objects/BuyerHistoryUpdateManyMutationInput.schema';
import { BuyerHistoryWhereInputObjectSchema } from './objects/BuyerHistoryWhereInput.schema';

export const BuyerHistoryUpdateManySchema = z.object({ data: BuyerHistoryUpdateManyMutationInputObjectSchema, where: BuyerHistoryWhereInputObjectSchema.optional()  })