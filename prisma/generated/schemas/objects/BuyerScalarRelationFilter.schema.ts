import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerWhereInputObjectSchema } from './BuyerWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => BuyerWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => BuyerWhereInputObjectSchema).optional()
}).strict();
export const BuyerScalarRelationFilterObjectSchema: z.ZodType<Prisma.BuyerScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BuyerScalarRelationFilter>;
export const BuyerScalarRelationFilterObjectZodSchema = makeSchema();
