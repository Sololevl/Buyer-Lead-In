import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerIncludeObjectSchema } from './objects/BuyerInclude.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';
import { BuyerCreateInputObjectSchema } from './objects/BuyerCreateInput.schema';
import { BuyerUncheckedCreateInputObjectSchema } from './objects/BuyerUncheckedCreateInput.schema';
import { BuyerUpdateInputObjectSchema } from './objects/BuyerUpdateInput.schema';
import { BuyerUncheckedUpdateInputObjectSchema } from './objects/BuyerUncheckedUpdateInput.schema';

export const BuyerUpsertSchema = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), where: BuyerWhereUniqueInputObjectSchema, create: z.union([ BuyerCreateInputObjectSchema, BuyerUncheckedCreateInputObjectSchema ]), update: z.union([ BuyerUpdateInputObjectSchema, BuyerUncheckedUpdateInputObjectSchema ])  })