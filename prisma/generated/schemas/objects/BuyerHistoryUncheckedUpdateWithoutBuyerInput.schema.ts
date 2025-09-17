import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  changedBy: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  changedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  diff: z.union([JsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const BuyerHistoryUncheckedUpdateWithoutBuyerInputObjectSchema: z.ZodType<Prisma.BuyerHistoryUncheckedUpdateWithoutBuyerInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryUncheckedUpdateWithoutBuyerInput>;
export const BuyerHistoryUncheckedUpdateWithoutBuyerInputObjectZodSchema = makeSchema();
