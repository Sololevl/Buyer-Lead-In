import { z } from 'zod';
import { BuyerHistoryWhereInputObjectSchema } from './objects/BuyerHistoryWhereInput.schema';

export const BuyerHistoryDeleteManySchema = z.object({ where: BuyerHistoryWhereInputObjectSchema.optional()  })