import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  buyerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  changedBy: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  changedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  diff: z.union([JsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const BuyerHistoryUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.BuyerHistoryUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryUncheckedUpdateManyInput>;
export const BuyerHistoryUncheckedUpdateManyInputObjectZodSchema = makeSchema();
