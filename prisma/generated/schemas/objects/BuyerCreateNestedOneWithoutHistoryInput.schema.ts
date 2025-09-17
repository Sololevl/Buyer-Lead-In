import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerCreateWithoutHistoryInputObjectSchema } from './BuyerCreateWithoutHistoryInput.schema';
import { BuyerUncheckedCreateWithoutHistoryInputObjectSchema } from './BuyerUncheckedCreateWithoutHistoryInput.schema';
import { BuyerCreateOrConnectWithoutHistoryInputObjectSchema } from './BuyerCreateOrConnectWithoutHistoryInput.schema';
import { BuyerWhereUniqueInputObjectSchema } from './BuyerWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BuyerCreateWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUncheckedCreateWithoutHistoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BuyerCreateOrConnectWithoutHistoryInputObjectSchema).optional(),
  connect: z.lazy(() => BuyerWhereUniqueInputObjectSchema).optional()
}).strict();
export const BuyerCreateNestedOneWithoutHistoryInputObjectSchema: z.ZodType<Prisma.BuyerCreateNestedOneWithoutHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerCreateNestedOneWithoutHistoryInput>;
export const BuyerCreateNestedOneWithoutHistoryInputObjectZodSchema = makeSchema();
