import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerHistorySelectObjectSchema } from './objects/BuyerHistorySelect.schema';
import { BuyerHistoryIncludeObjectSchema } from './objects/BuyerHistoryInclude.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './objects/BuyerHistoryWhereUniqueInput.schema';

export const BuyerHistoryFindUniqueOrThrowSchema: z.ZodType<Prisma.BuyerHistoryFindUniqueOrThrowArgs> = z.object({ select: BuyerHistorySelectObjectSchema.optional(), include: BuyerHistoryIncludeObjectSchema.optional(), where: BuyerHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BuyerHistoryFindUniqueOrThrowArgs>;

export const BuyerHistoryFindUniqueOrThrowZodSchema = z.object({ select: BuyerHistorySelectObjectSchema.optional(), include: BuyerHistoryIncludeObjectSchema.optional(), where: BuyerHistoryWhereUniqueInputObjectSchema }).strict();