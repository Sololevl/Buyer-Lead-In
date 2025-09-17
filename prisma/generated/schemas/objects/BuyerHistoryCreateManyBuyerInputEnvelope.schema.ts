import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryCreateManyBuyerInputObjectSchema } from './BuyerHistoryCreateManyBuyerInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => BuyerHistoryCreateManyBuyerInputObjectSchema), z.lazy(() => BuyerHistoryCreateManyBuyerInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const BuyerHistoryCreateManyBuyerInputEnvelopeObjectSchema: z.ZodType<Prisma.BuyerHistoryCreateManyBuyerInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryCreateManyBuyerInputEnvelope>;
export const BuyerHistoryCreateManyBuyerInputEnvelopeObjectZodSchema = makeSchema();
