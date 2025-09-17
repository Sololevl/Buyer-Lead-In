import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerIncludeObjectSchema } from './objects/BuyerInclude.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';

export const BuyerFindUniqueSchema: z.ZodType<Prisma.BuyerFindUniqueArgs> = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), where: BuyerWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BuyerFindUniqueArgs>;

export const BuyerFindUniqueZodSchema = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), where: BuyerWhereUniqueInputObjectSchema }).strict();