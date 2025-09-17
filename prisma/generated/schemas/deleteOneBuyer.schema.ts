import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerIncludeObjectSchema } from './objects/BuyerInclude.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';

export const BuyerDeleteOneSchema = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), where: BuyerWhereUniqueInputObjectSchema  })