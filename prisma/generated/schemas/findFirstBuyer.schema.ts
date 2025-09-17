import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BuyerIncludeObjectSchema } from './objects/BuyerInclude.schema';
import { BuyerOrderByWithRelationInputObjectSchema } from './objects/BuyerOrderByWithRelationInput.schema';
import { BuyerWhereInputObjectSchema } from './objects/BuyerWhereInput.schema';
import { BuyerWhereUniqueInputObjectSchema } from './objects/BuyerWhereUniqueInput.schema';
import { BuyerScalarFieldEnumSchema } from './enums/BuyerScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BuyerFindFirstSelectSchema: z.ZodType<Prisma.BuyerSelect> = z.object({
    id: z.boolean().optional(),
    fullName: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    city: z.boolean().optional(),
    propertyType: z.boolean().optional(),
    bhk: z.boolean().optional(),
    purpose: z.boolean().optional(),
    budgetMin: z.boolean().optional(),
    budgetMax: z.boolean().optional(),
    timeline: z.boolean().optional(),
    source: z.boolean().optional(),
    status: z.boolean().optional(),
    notes: z.boolean().optional(),
    tags: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    history: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BuyerSelect>;

export const BuyerFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    fullName: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    city: z.boolean().optional(),
    propertyType: z.boolean().optional(),
    bhk: z.boolean().optional(),
    purpose: z.boolean().optional(),
    budgetMin: z.boolean().optional(),
    budgetMax: z.boolean().optional(),
    timeline: z.boolean().optional(),
    source: z.boolean().optional(),
    status: z.boolean().optional(),
    notes: z.boolean().optional(),
    tags: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    history: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const BuyerFindFirstSchema: z.ZodType<Prisma.BuyerFindFirstArgs> = z.object({ select: BuyerFindFirstSelectSchema.optional(), include: z.lazy(() => BuyerIncludeObjectSchema.optional()), orderBy: z.union([BuyerOrderByWithRelationInputObjectSchema, BuyerOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerWhereInputObjectSchema.optional(), cursor: BuyerWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BuyerScalarFieldEnumSchema, BuyerScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BuyerFindFirstArgs>;

export const BuyerFindFirstZodSchema = z.object({ select: BuyerFindFirstSelectSchema.optional(), include: z.lazy(() => BuyerIncludeObjectSchema.optional()), orderBy: z.union([BuyerOrderByWithRelationInputObjectSchema, BuyerOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuyerWhereInputObjectSchema.optional(), cursor: BuyerWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BuyerScalarFieldEnumSchema, BuyerScalarFieldEnumSchema.array()]).optional() }).strict();