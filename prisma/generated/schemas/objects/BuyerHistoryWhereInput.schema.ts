import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { BuyerScalarRelationFilterObjectSchema } from './BuyerScalarRelationFilter.schema';
import { BuyerWhereInputObjectSchema } from './BuyerWhereInput.schema'

const buyerhistorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BuyerHistoryWhereInputObjectSchema), z.lazy(() => BuyerHistoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BuyerHistoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuyerHistoryWhereInputObjectSchema), z.lazy(() => BuyerHistoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  buyerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  changedBy: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  changedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  diff: z.lazy(() => JsonFilterObjectSchema).optional(),
  buyer: z.union([z.lazy(() => BuyerScalarRelationFilterObjectSchema), z.lazy(() => BuyerWhereInputObjectSchema)]).optional()
}).strict();
export const BuyerHistoryWhereInputObjectSchema: z.ZodType<Prisma.BuyerHistoryWhereInput> = buyerhistorywhereinputSchema as unknown as z.ZodType<Prisma.BuyerHistoryWhereInput>;
export const BuyerHistoryWhereInputObjectZodSchema = buyerhistorywhereinputSchema;
