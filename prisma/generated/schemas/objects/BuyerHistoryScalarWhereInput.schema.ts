import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema'

const buyerhistoryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema), z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema), z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  buyerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  changedBy: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  changedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  diff: z.lazy(() => JsonFilterObjectSchema).optional()
}).strict();
export const BuyerHistoryScalarWhereInputObjectSchema: z.ZodType<Prisma.BuyerHistoryScalarWhereInput> = buyerhistoryscalarwhereinputSchema as unknown as z.ZodType<Prisma.BuyerHistoryScalarWhereInput>;
export const BuyerHistoryScalarWhereInputObjectZodSchema = buyerhistoryscalarwhereinputSchema;
