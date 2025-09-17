import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryCreateWithoutBuyerInput.schema';
import { BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryUncheckedCreateWithoutBuyerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BuyerHistoryCreateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema)])
}).strict();
export const BuyerHistoryCreateOrConnectWithoutBuyerInputObjectSchema: z.ZodType<Prisma.BuyerHistoryCreateOrConnectWithoutBuyerInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryCreateOrConnectWithoutBuyerInput>;
export const BuyerHistoryCreateOrConnectWithoutBuyerInputObjectZodSchema = makeSchema();
