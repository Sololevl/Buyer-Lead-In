import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerHistoryOrderByWithRelationInputObjectSchema } from './objects/BuyerHistoryOrderByWithRelationInput.schema';
import { BuyerHistoryWhereInputObjectSchema } from './objects/BuyerHistoryWhereInput.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './objects/BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryCountAggregateInputObjectSchema } from './objects/BuyerHistoryCountAggregateInput.schema';

export const BuyerHistoryCountSchema: z.ZodType<Prisma.BuyerHistoryCountArgs> = z.object({ orderBy: z.union([BuyerHistoryOrderByWithRelationInputObjectSchema, BuyerHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerHistoryWhereInputObjectSchema.optional(), cursor: BuyerHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BuyerHistoryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BuyerHistoryCountArgs>;

export const BuyerHistoryCountZodSchema = z.object({ orderBy: z.union([BuyerHistoryOrderByWithRelationInputObjectSchema, BuyerHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerHistoryWhereInputObjectSchema.optional(), cursor: BuyerHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BuyerHistoryCountAggregateInputObjectSchema ]).optional() }).strict();