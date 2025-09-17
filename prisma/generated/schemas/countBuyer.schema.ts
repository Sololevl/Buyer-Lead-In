import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerOrderByWithRelationInputObjectSchema } from './objects/BuyerOrderByWithRelationInput.schema';
import { BuyerWhereInputObjectSchema } from './objects/BuyerWhereInput.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';
import { BuyerCountAggregateInputObjectSchema } from './objects/BuyerCountAggregateInput.schema';

export const BuyerCountSchema: z.ZodType<Prisma.BuyerCountArgs> = z.object({ orderBy: z.union([BuyerOrderByWithRelationInputObjectSchema, BuyerOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerWhereInputObjectSchema.optional(), cursor: BuyerWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BuyerCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BuyerCountArgs>;

export const BuyerCountZodSchema = z.object({ orderBy: z.union([BuyerOrderByWithRelationInputObjectSchema, BuyerOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerWhereInputObjectSchema.optional(), cursor: BuyerWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BuyerCountAggregateInputObjectSchema ]).optional() }).strict();