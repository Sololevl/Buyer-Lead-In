import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerSelectObjectSchema } from './BuyerSelect.schema';
import { BuyerIncludeObjectSchema } from './BuyerInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BuyerSelectObjectSchema).optional(),
  include: z.lazy(() => BuyerIncludeObjectSchema).optional()
}).strict();
export const BuyerArgsObjectSchema = makeSchema();
export const BuyerArgsObjectZodSchema = makeSchema();
