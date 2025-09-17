import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  changedBy: z.string(),
  changedAt: z.coerce.date().optional(),
  diff: z.union([JsonNullValueInputSchema, jsonSchema])
}).strict();
export const BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema: z.ZodType<Prisma.BuyerHistoryUncheckedCreateWithoutBuyerInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryUncheckedCreateWithoutBuyerInput>;
export const BuyerHistoryUncheckedCreateWithoutBuyerInputObjectZodSchema = makeSchema();
