import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerSelectObjectSchema } from './objects/BuyerSelect.schema';
import { BuyerIncludeObjectSchema } from './objects/BuyerInclude.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';

export const BuyerFindUniqueOrThrowSchema: z.ZodType<Prisma.BuyerFindUniqueOrThrowArgs> = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), where: BuyerWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BuyerFindUniqueOrThrowArgs>;

export const BuyerFindUniqueOrThrowZodSchema = z.object({ select: BuyerSelectObjectSchema.optional(), include: BuyerIncludeObjectSchema.optional(), where: BuyerWhereUniqueInputObjectSchema }).strict();