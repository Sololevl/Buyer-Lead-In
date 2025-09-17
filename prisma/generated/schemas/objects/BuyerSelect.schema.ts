import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryFindManySchema } from '../findManyBuyerHistory.schema';
import { BuyerCountOutputTypeArgsObjectSchema } from './BuyerCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
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
  history: z.union([z.boolean(), z.lazy(() => BuyerHistoryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BuyerCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const BuyerSelectObjectSchema: z.ZodType<Prisma.BuyerSelect> = makeSchema() as unknown as z.ZodType<Prisma.BuyerSelect>;
export const BuyerSelectObjectZodSchema = makeSchema();
