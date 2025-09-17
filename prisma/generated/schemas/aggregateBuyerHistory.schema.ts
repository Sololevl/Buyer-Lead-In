import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerHistoryOrderByWithRelationInputObjectSchema } from './objects/BuyerHistoryOrderByWithRelationInput.schema';
import { BuyerHistoryWhereInputObjectSchema } from './objects/BuyerHistoryWhereInput.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './objects/BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryCountAggregateInputObjectSchema } from './objects/BuyerHistoryCountAggregateInput.schema';
import { BuyerHistoryMinAggregateInputObjectSchema } from './objects/BuyerHistoryMinAggregateInput.schema';
import { BuyerHistoryMaxAggregateInputObjectSchema } from './objects/BuyerHistoryMaxAggregateInput.schema';

export const BuyerHistoryAggregateSchema: z.ZodType<Prisma.BuyerHistoryAggregateArgs> = z.object({ orderBy: z.union([BuyerHistoryOrderByWithRelationInputObjectSchema, BuyerHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerHistoryWhereInputObjectSchema.optional(), cursor: BuyerHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BuyerHistoryCountAggregateInputObjectSchema ]).optional(), _min: BuyerHistoryMinAggregateInputObjectSchema.optional(), _max: BuyerHistoryMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BuyerHistoryAggregateArgs>;

export const BuyerHistoryAggregateZodSchema = z.object({ orderBy: z.union([BuyerHistoryOrderByWithRelationInputObjectSchema, BuyerHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerHistoryWhereInputObjectSchema.optional(), cursor: BuyerHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BuyerHistoryCountAggregateInputObjectSchema ]).optional(), _min: BuyerHistoryMinAggregateInputObjectSchema.optional(), _max: BuyerHistoryMaxAggregateInputObjectSchema.optional() }).strict();