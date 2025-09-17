import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerHistoryIncludeObjectSchema } from './objects/BuyerHistoryInclude.schema';
import { BuyerHistoryOrderByWithRelationInputObjectSchema } from './objects/BuyerHistoryOrderByWithRelationInput.schema';
import { BuyerHistoryWhereInputObjectSchema } from './objects/BuyerHistoryWhereInput.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './objects/BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryScalarFieldEnumSchema } from './enums/BuyerHistoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BuyerHistoryFindManySelectSchema: z.ZodType<Prisma.BuyerHistorySelect> = z.object({
    id: z.boolean().optional(),
    buyer: z.boolean().optional(),
    buyerId: z.boolean().optional(),
    changedBy: z.boolean().optional(),
    changedAt: z.boolean().optional(),
    diff: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BuyerHistorySelect>;

export const BuyerHistoryFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    buyer: z.boolean().optional(),
    buyerId: z.boolean().optional(),
    changedBy: z.boolean().optional(),
    changedAt: z.boolean().optional(),
    diff: z.boolean().optional()
  }).strict();

export const BuyerHistoryFindManySchema: z.ZodType<Prisma.BuyerHistoryFindManyArgs> = z.object({ select: BuyerHistoryFindManySelectSchema.optional(), include: z.lazy(() => BuyerHistoryIncludeObjectSchema.optional()), orderBy: z.union([BuyerHistoryOrderByWithRelationInputObjectSchema, BuyerHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerHistoryWhereInputObjectSchema.optional(), cursor: BuyerHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BuyerHistoryScalarFieldEnumSchema, BuyerHistoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BuyerHistoryFindManyArgs>;

export const BuyerHistoryFindManyZodSchema = z.object({ select: BuyerHistoryFindManySelectSchema.optional(), include: z.lazy(() => BuyerHistoryIncludeObjectSchema.optional()), orderBy: z.union([BuyerHistoryOrderByWithRelationInputObjectSchema, BuyerHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerHistoryWhereInputObjectSchema.optional(), cursor: BuyerHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BuyerHistoryScalarFieldEnumSchema, BuyerHistoryScalarFieldEnumSchema.array()]).optional() }).strict();