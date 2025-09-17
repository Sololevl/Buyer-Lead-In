import { z } from 'zod';
import { BuyerHistorySelectObjectSchema } from './objects/BuyerHistorySelect.schema';
import { BuyerHistoryIncludeObjectSchema } from './objects/BuyerHistoryInclude.schema';
import { BuyerHistoryUpdateInputObjectSchema } from './objects/BuyerHistoryUpdateInput.schema';
import { BuyerHistoryUncheckedUpdateInputObjectSchema } from './objects/BuyerHistoryUncheckedUpdateInput.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './objects/BuyerHistoryWhereUniqueInput.schema';

export const BuyerHistoryUpdateOneSchema = z.object({ select: BuyerHistorySelectObjectSchema.optional(), include: BuyerHistoryIncludeObjectSchema.optional(), data: z.union([BuyerHistoryUpdateInputObjectSchema, BuyerHistoryUncheckedUpdateInputObjectSchema]), where: BuyerHistoryWhereUniqueInputObjectSchema  })