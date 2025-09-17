import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerArgsObjectSchema } from './BuyerArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  buyer: z.union([z.boolean(), z.lazy(() => BuyerArgsObjectSchema)]).optional(),
  buyerId: z.boolean().optional(),
  changedBy: z.boolean().optional(),
  changedAt: z.boolean().optional(),
  diff: z.boolean().optional()
}).strict();
export const BuyerHistorySelectObjectSchema: z.ZodType<Prisma.BuyerHistorySelect> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistorySelect>;
export const BuyerHistorySelectObjectZodSchema = makeSchema();
