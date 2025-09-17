import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerHistoryWhereInputObjectSchema } from './objects/BuyerHistoryWhereInput.schema';
import { BuyerHistoryOrderByWithAggregationInputObjectSchema } from './objects/BuyerHistoryOrderByWithAggregationInput.schema';
import { BuyerHistoryScalarWhereWithAggregatesInputObjectSchema } from './objects/BuyerHistoryScalarWhereWithAggregatesInput.schema';
import { BuyerHistoryScalarFieldEnumSchema } from './enums/BuyerHistoryScalarFieldEnum.schema';
import { BuyerHistoryCountAggregateInputObjectSchema } from './objects/BuyerHistoryCountAggregateInput.schema';
import { BuyerHistoryMinAggregateInputObjectSchema } from './objects/BuyerHistoryMinAggregateInput.schema';
import { BuyerHistoryMaxAggregateInputObjectSchema } from './objects/BuyerHistoryMaxAggregateInput.schema';

export const BuyerHistoryGroupBySchema: z.ZodType<Prisma.BuyerHistoryGroupByArgs> = z.object({ where: BuyerHistoryWhereInputObjectSchema.optional(), orderBy: z.union([BuyerHistoryOrderByWithAggregationInputObjectSchema, BuyerHistoryOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BuyerHistoryScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BuyerHistoryScalarFieldEnumSchema), _count: z.union([ z.literal(true), BuyerHistoryCountAggregateInputObjectSchema ]).optional(), _min: BuyerHistoryMinAggregateInputObjectSchema.optional(), _max: BuyerHistoryMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BuyerHistoryGroupByArgs>;

export const BuyerHistoryGroupByZodSchema = z.object({ where: BuyerHistoryWhereInputObjectSchema.optional(), orderBy: z.union([BuyerHistoryOrderByWithAggregationInputObjectSchema, BuyerHistoryOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BuyerHistoryScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BuyerHistoryScalarFieldEnumSchema), _count: z.union([ z.literal(true), BuyerHistoryCountAggregateInputObjectSchema ]).optional(), _min: BuyerHistoryMinAggregateInputObjectSchema.optional(), _max: BuyerHistoryMaxAggregateInputObjectSchema.optional() }).strict();