import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerWhereUniqueInputObjectSchema } from './BuyerWhereUniqueInput.schema';
import { BuyerCreateWithoutHistoryInputObjectSchema } from './BuyerCreateWithoutHistoryInput.schema';
import { BuyerUncheckedCreateWithoutHistoryInputObjectSchema } from './BuyerUncheckedCreateWithoutHistoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuyerWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BuyerCreateWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUncheckedCreateWithoutHistoryInputObjectSchema)])
}).strict();
export const BuyerCreateOrConnectWithoutHistoryInputObjectSchema: z.ZodType<Prisma.BuyerCreateOrConnectWithoutHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerCreateOrConnectWithoutHistoryInput>;
export const BuyerCreateOrConnectWithoutHistoryInputObjectZodSchema = makeSchema();
