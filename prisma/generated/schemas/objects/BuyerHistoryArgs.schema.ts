import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistorySelectObjectSchema } from './BuyerHistorySelect.schema';
import { BuyerHistoryIncludeObjectSchema } from './BuyerHistoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BuyerHistorySelectObjectSchema).optional(),
  include: z.lazy(() => BuyerHistoryIncludeObjectSchema).optional()
}).strict();
export const BuyerHistoryArgsObjectSchema = makeSchema();
export const BuyerHistoryArgsObjectZodSchema = makeSchema();
