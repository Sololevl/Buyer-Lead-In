import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  buyerId: z.string(),
  changedBy: z.string(),
  changedAt: z.coerce.date().optional(),
  diff: z.union([JsonNullValueInputSchema, jsonSchema])
}).strict();
export const BuyerHistoryCreateManyInputObjectSchema: z.ZodType<Prisma.BuyerHistoryCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryCreateManyInput>;
export const BuyerHistoryCreateManyInputObjectZodSchema = makeSchema();
