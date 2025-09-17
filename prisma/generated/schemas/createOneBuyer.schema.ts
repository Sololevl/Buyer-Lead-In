import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerIncludeObjectSchema } from './objects/BuyerInclude.schema';
import { BuyerCreateInputObjectSchema } from './objects/BuyerCreateInput.schema';
import { BuyerUncheckedCreateInputObjectSchema } from './objects/BuyerUncheckedCreateInput.schema';

export const BuyerCreateOneSchema = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), data: z.union([BuyerCreateInputObjectSchema, BuyerUncheckedCreateInputObjectSchema])  })