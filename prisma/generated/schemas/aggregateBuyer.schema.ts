import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerOrderByWithRelationInputObjectSchema } from './objects/BuyerOrderByWithRelationInput.schema';
import { BuyerWhereInputObjectSchema } from './objects/BuyerWhereInput.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';
import { BuyerCountAggregateInputObjectSchema } from './objects/BuyerCountAggregateInput.schema';
import { BuyerMinAggregateInputObjectSchema } from './objects/BuyerMinAggregateInput.schema';
import { BuyerMaxAggregateInputObjectSchema } from './objects/BuyerMaxAggregateInput.schema';
import { BuyerAvgAggregateInputObjectSchema } from './objects/BuyerAvgAggregateInput.schema';
import { BuyerSumAggregateInputObjectSchema } from './objects/BuyerSumAggregateInput.schema';

export const BuyerAggregateSchema: z.ZodType<Prisma.BuyerAggregateArgs> = z.object({ orderBy: z.union([BuyerOrderByWithRelationInputObjectSchema, BuyerOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerWhereInputObjectSchema.optional(), cursor: BuyerWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BuyerCountAggregateInputObjectSchema ]).optional(), _min: BuyerMinAggregateInputObjectSchema.optional(), _max: BuyerMaxAggregateInputObjectSchema.optional(), _avg: BuyerAvgAggregateInputObjectSchema.optional(), _sum: BuyerSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BuyerAggregateArgs>;

export const BuyerAggregateZodSchema = z.object({ orderBy: z.union([BuyerOrderByWithRelationInputObjectSchema, BuyerOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerWhereInputObjectSchema.optional(), cursor: BuyerWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BuyerCountAggregateInputObjectSchema ]).optional(), _min: BuyerMinAggregateInputObjectSchema.optional(), _max: BuyerMaxAggregateInputObjectSchema.optional(), _avg: BuyerAvgAggregateInputObjectSchema.optional(), _sum: BuyerSumAggregateInputObjectSchema.optional() }).strict();