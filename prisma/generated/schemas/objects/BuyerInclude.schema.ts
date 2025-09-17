import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryFindManySchema } from '../findManyBuyerHistory.schema';
import { BuyerCountOutputTypeArgsObjectSchema } from './BuyerCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  history: z.union([z.boolean(), z.lazy(() => BuyerHistoryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BuyerCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const BuyerIncludeObjectSchema: z.ZodType<Prisma.BuyerInclude> = makeSchema() as unknown as z.ZodType<Prisma.BuyerInclude>;
export const BuyerIncludeObjectZodSchema = makeSchema();
