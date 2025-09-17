import { z } from 'zod';
import { BuyerHistorySelectObjectSchema } from './objects/BuyerHistorySelect.schema';
import { BuyerHistoryUpdateManyMutationInputObjectSchema } from './objects/BuyerHistoryUpdateManyMutationInput.schema';
import { BuyerHistoryWhereInputObjectSchema } from './objects/BuyerHistoryWhereInput.schema';

export const BuyerHistoryUpdateManyAndReturnSchema = z.object({ select: BuyerHistorySelectObjectSchema.optional(), data: BuyerHistoryUpdateManyMutationInputObjectSchema, where: BuyerHistoryWhereInputObjectSchema.optional()  }).strict()