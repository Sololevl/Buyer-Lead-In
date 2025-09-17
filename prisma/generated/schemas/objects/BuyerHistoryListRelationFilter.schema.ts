import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryWhereInputObjectSchema } from './BuyerHistoryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => BuyerHistoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => BuyerHistoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => BuyerHistoryWhereInputObjectSchema).optional()
}).strict();
export const BuyerHistoryListRelationFilterObjectSchema: z.ZodType<Prisma.BuyerHistoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryListRelationFilter>;
export const BuyerHistoryListRelationFilterObjectZodSchema = makeSchema();
