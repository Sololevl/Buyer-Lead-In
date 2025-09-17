import { z } from 'zod';
import { BuyerHistorySelectObjectSchema } from './objects/BuyerHistorySelect.schema';
import { BuyerHistoryIncludeObjectSchema } from './objects/BuyerHistoryInclude.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './objects/BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryCreateInputObjectSchema } from './objects/BuyerHistoryCreateInput.schema';
import { BuyerHistoryUncheckedCreateInputObjectSchema } from './objects/BuyerHistoryUncheckedCreateInput.schema';
import { BuyerHistoryUpdateInputObjectSchema } from './objects/BuyerHistoryUpdateInput.schema';
import { BuyerHistoryUncheckedUpdateInputObjectSchema } from './objects/BuyerHistoryUncheckedUpdateInput.schema';

export const BuyerHistoryUpsertSchema = z.object({ select: BuyerHistorySelectObjectSchema.optional(), include: BuyerHistoryIncludeObjectSchema.optional(), where: BuyerHistoryWhereUniqueInputObjectSchema, create: z.union([ BuyerHistoryCreateInputObjectSchema, BuyerHistoryUncheckedCreateInputObjectSchema ]), update: z.union([ BuyerHistoryUpdateInputObjectSchema, BuyerHistoryUncheckedUpdateInputObjectSchema ])  })