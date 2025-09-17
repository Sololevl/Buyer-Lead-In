import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema'

const buyerhistoryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => BuyerHistoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BuyerHistoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BuyerHistoryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuyerHistoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BuyerHistoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  buyerId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  changedBy: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  changedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  diff: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional()
}).strict();
export const BuyerHistoryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BuyerHistoryScalarWhereWithAggregatesInput> = buyerhistoryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.BuyerHistoryScalarWhereWithAggregatesInput>;
export const BuyerHistoryScalarWhereWithAggregatesInputObjectZodSchema = buyerhistoryscalarwherewithaggregatesinputSchema;
