import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  fullName: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  city: z.literal(true).optional(),
  propertyType: z.literal(true).optional(),
  bhk: z.literal(true).optional(),
  purpose: z.literal(true).optional(),
  budgetMin: z.literal(true).optional(),
  budgetMax: z.literal(true).optional(),
  timeline: z.literal(true).optional(),
  source: z.literal(true).optional(),
  status: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  tags: z.literal(true).optional(),
  ownerId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const BuyerCountAggregateInputObjectSchema: z.ZodType<Prisma.BuyerCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuyerCountAggregateInputType>;
export const BuyerCountAggregateInputObjectZodSchema = makeSchema();
