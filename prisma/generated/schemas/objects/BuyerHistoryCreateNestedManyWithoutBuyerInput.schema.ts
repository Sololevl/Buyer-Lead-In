import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryCreateWithoutBuyerInput.schema';
import { BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryUncheckedCreateWithoutBuyerInput.schema';
import { BuyerHistoryCreateOrConnectWithoutBuyerInputObjectSchema } from './BuyerHistoryCreateOrConnectWithoutBuyerInput.schema';
import { BuyerHistoryCreateManyBuyerInputEnvelopeObjectSchema } from './BuyerHistoryCreateManyBuyerInputEnvelope.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './BuyerHistoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BuyerHistoryCreateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryCreateWithoutBuyerInputObjectSchema).array(), z.lazy(() => BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuyerHistoryCreateOrConnectWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryCreateOrConnectWithoutBuyerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BuyerHistoryCreateManyBuyerInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema), z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const BuyerHistoryCreateNestedManyWithoutBuyerInputObjectSchema: z.ZodType<Prisma.BuyerHistoryCreateNestedManyWithoutBuyerInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryCreateNestedManyWithoutBuyerInput>;
export const BuyerHistoryCreateNestedManyWithoutBuyerInputObjectZodSchema = makeSchema();
