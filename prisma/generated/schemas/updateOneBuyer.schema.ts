import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerIncludeObjectSchema } from './objects/BuyerInclude.schema';
import { BuyerUpdateInputObjectSchema } from './objects/BuyerUpdateInput.schema';
import { BuyerUncheckedUpdateInputObjectSchema } from './objects/BuyerUncheckedUpdateInput.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';

export const BuyerUpdateOneSchema = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), data: z.union([BuyerUpdateInputObjectSchema, BuyerUncheckedUpdateInputObjectSchema]), where: BuyerWhereUniqueInputObjectSchema  })