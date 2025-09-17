import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryCreateWithoutBuyerInput.schema';
import { BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema } from './BuyerHistoryUncheckedCreateWithoutBuyerInput.schema';
import { BuyerHistoryCreateOrConnectWithoutBuyerInputObjectSchema } from './BuyerHistoryCreateOrConnectWithoutBuyerInput.schema';
import { BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInputObjectSchema } from './BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInput.schema';
import { BuyerHistoryCreateManyBuyerInputEnvelopeObjectSchema } from './BuyerHistoryCreateManyBuyerInputEnvelope.schema';
import { BuyerHistoryWhereUniqueInputObjectSchema } from './BuyerHistoryWhereUniqueInput.schema';
import { BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInputObjectSchema } from './BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInput.schema';
import { BuyerHistoryUpdateManyWithWhereWithoutBuyerInputObjectSchema } from './BuyerHistoryUpdateManyWithWhereWithoutBuyerInput.schema';
import { BuyerHistoryScalarWhereInputObjectSchema } from './BuyerHistoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BuyerHistoryCreateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryCreateWithoutBuyerInputObjectSchema).array(), z.lazy(() => BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUncheckedCreateWithoutBuyerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuyerHistoryCreateOrConnectWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryCreateOrConnectWithoutBuyerInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUpsertWithWhereUniqueWithoutBuyerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BuyerHistoryCreateManyBuyerInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema), z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema), z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema), z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema), z.lazy(() => BuyerHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUpdateWithWhereUniqueWithoutBuyerInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuyerHistoryUpdateManyWithWhereWithoutBuyerInputObjectSchema), z.lazy(() => BuyerHistoryUpdateManyWithWhereWithoutBuyerInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema), z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const BuyerHistoryUncheckedUpdateManyWithoutBuyerNestedInputObjectSchema: z.ZodType<Prisma.BuyerHistoryUncheckedUpdateManyWithoutBuyerNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryUncheckedUpdateManyWithoutBuyerNestedInput>;
export const BuyerHistoryUncheckedUpdateManyWithoutBuyerNestedInputObjectZodSchema = makeSchema();
