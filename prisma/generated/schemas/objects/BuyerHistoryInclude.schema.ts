import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerArgsObjectSchema } from './BuyerArgs.schema'

const makeSchema = () => z.object({
  buyer: z.union([z.boolean(), z.lazy(() => BuyerArgsObjectSchema)]).optional()
}).strict();
export const BuyerHistoryIncludeObjectSchema: z.ZodType<Prisma.BuyerHistoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryInclude>;
export const BuyerHistoryIncludeObjectZodSchema = makeSchema();
