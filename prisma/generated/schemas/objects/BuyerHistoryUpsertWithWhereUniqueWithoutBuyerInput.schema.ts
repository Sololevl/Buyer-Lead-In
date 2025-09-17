import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryUpdateWithoutBuyerInputObjectSchema } from './BuyerHistoryUpdateWithoutBuyerInput.schema';
import { BuyerHistoryUncheckedUpdateWithoutBuyerInputObjectSchema } from './BuyerHistoryUncheckedUpdateWithoutBuyerInput.schema';
import { BuyerHistoryCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryCreateWithoutBuyerInput.schema';
import { BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryUncheckedCreateWithoutBuyerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => BuyerHistoryUpdateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUncheckedUpdateWithoutBuyerInputObjectSchema)]),
  create: z.union([z.lazy(() => BuyerHistoryCreateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema)])
}).strict();
export const BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInputObjectSchema: z.ZodType<Prisma.BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInput>;
export const BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInputObjectZodSchema = makeSchema();
