import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerWhereInputObjectSchema } from './objects/BuyerWhereInput.schema';
import { BuyerOrderByWithAggregationInputObjectSchema } from './objects/BuyerOrderByWithAggregationInput.schema';
import { BuyerScalarWhereWithAggregatesInputObjectSchema } from './objects/BuyerScalarWhereWithAggregatesInput.schema';
import { BuyerScalarFieldEnumSchema } from './enums/BuyerScalarFieldEnum.schema';
import { BuyerCountAggregateInputObjectSchema } from './objects/BuyerCountAggregateInput.schema';
import { BuyerMinAggregateInputObjectSchema } from './objects/BuyerMinAggregateInput.schema';
import { BuyerMaxAggregateInputObjectSchema } from './objects/BuyerMaxAggregateInput.schema';
import { BuyerAvgAggregateInputObjectSchema } from './objects/BuyerAvgAggregateInput.schema';
import { BuyerSumAggregateInputObjectSchema } from './objects/BuyerSumAggregateInput.schema';

export const BuyerGroupBySchema: z.ZodType<Prisma.BuyerGroupByArgs> = z.object({ where: BuyerWhereInputObjectSchema.optional(), orderBy: z.union([BuyerOrderByWithAggregationInputObjectSchema, BuyerOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BuyerScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BuyerScalarFieldEnumSchema), _count: z.union([ z.literal(true), BuyerCountAggregateInputObjectSchema ]).optional(), _min: BuyerMinAggregateInputObjectSchema.optional(), _max: BuyerMaxAggregateInputObjectSchema.optional(), _avg: BuyerAvgAggregateInputObjectSchema.optional(), _sum: BuyerSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BuyerGroupByArgs>;

export const BuyerGroupByZodSchema = z.object({ where: BuyerWhereInputObjectSchema.optional(), orderBy: z.union([BuyerOrderByWithAggregationInputObjectSchema, BuyerOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BuyerScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BuyerScalarFieldEnumSchema), _count: z.union([ z.literal(true), BuyerCountAggregateInputObjectSchema ]).optional(), _min: BuyerMinAggregateInputObjectSchema.optional(), _max: BuyerMaxAggregateInputObjectSchema.optional(), _avg: BuyerAvgAggregateInputObjectSchema.optional(), _sum: BuyerSumAggregateInputObjectSchema.optional() }).strict();