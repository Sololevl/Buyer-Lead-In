import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryUpdateWithoutBuyerInputObjectSchema } from './BuyerHistoryUpdateWithoutBuyerInput.schema';
import { BuyerHistoryUncheckedUpdateWithoutBuyerInputObjectSchema } from './BuyerHistoryUncheckedUpdateWithoutBuyerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => BuyerHistoryUpdateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUncheckedUpdateWithoutBuyerInputObjectSchema)])
}).strict();
export const BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInputObjectSchema: z.ZodType<Prisma.BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInput>;
export const BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInputObjectZodSchema = makeSchema();
