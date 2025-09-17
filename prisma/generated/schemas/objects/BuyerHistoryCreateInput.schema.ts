import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { BuyerCreateNestedOneWithoutHistoryInputObjectSchema } from './BuyerCreateNestedOneWithoutHistoryInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  changedBy: z.string(),
  changedAt: z.coerce.date().optional(),
  diff: z.union([JsonNullValueInputSchema, jsonSchema]),
  buyer: z.lazy(() => BuyerCreateNestedOneWithoutHistoryInputObjectSchema)
}).strict();
export const BuyerHistoryCreateInputObjectSchema: z.ZodType<Prisma.BuyerHistoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryCreateInput>;
export const BuyerHistoryCreateInputObjectZodSchema = makeSchema();
