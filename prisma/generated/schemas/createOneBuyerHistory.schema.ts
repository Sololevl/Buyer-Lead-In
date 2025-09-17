import { z } from 'zod';
import { BuyerHistorySelectObjectSchema } from './objects/BuyerHistorySelect.schema';
import { BuyerHistoryIncludeObjectSchema } from './objects/BuyerHistoryInclude.schema';
import { BuyerHistoryCreateInputObjectSchema } from './objects/BuyerHistoryCreateInput.schema';
import { BuyerHistoryUncheckedCreateInputObjectSchema } from './objects/BuyerHistoryUncheckedCreateInput.schema';

export const BuyerHistoryCreateOneSchema = z.object({ select: BuyerHistorySelectObjectSchema.optional(), include: BuyerHistoryIncludeObjectSchema.optional(), data: z.union([BuyerHistoryCreateInputObjectSchema, BuyerHistoryUncheckedCreateInputObjectSchema])  })