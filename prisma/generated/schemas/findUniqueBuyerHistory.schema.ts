import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerHistorySelectObjectSchema } from './objects/BuyerHistorySelect.schema';
import { BuyerHistoryIncludeObjectSchema } from './objects/BuyerHistoryInclude.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './objects/BuyerHistoryWhereUniqueInput.schema';

export const BuyerHistoryFindUniqueSchema: z.ZodType<Prisma.BuyerHistoryFindUniqueArgs> = z.object({ select: BuyerHistorySelectObjectSchema.optional(), include: BuyerHistoryIncludeObjectSchema.optional(), where: BuyerHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BuyerHistoryFindUniqueArgs>;

export const BuyerHistoryFindUniqueZodSchema = z.object({ select: BuyerHistorySelectObjectSchema.optional(), include: BuyerHistoryIncludeObjectSchema.optional(), where: BuyerHistoryWhereUniqueInputObjectSchema }).strict();