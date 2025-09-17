import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerUpdateWithoutHistoryInputObjectSchema } from './BuyerUpdateWithoutHistoryInput.schema';
import { BuyerUncheckedUpdateWithoutHistoryInputObjectSchema } from './BuyerUncheckedUpdateWithoutHistoryInput.schema';
import { BuyerCreateWithoutHistoryInputObjectSchema } from './BuyerCreateWithoutHistoryInput.schema';
import { BuyerUncheckedCreateWithoutHistoryInputObjectSchema } from './BuyerUncheckedCreateWithoutHistoryInput.schema';
import { BuyerWhereInputObjectSchema } from './BuyerWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => BuyerUpdateWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUncheckedUpdateWithoutHistoryInputObjectSchema)]),
  create: z.union([z.lazy(() => BuyerCreateWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUncheckedCreateWithoutHistoryInputObjectSchema)]),
  where: z.lazy(() => BuyerWhereInputObjectSchema).optional()
}).strict();
export const BuyerUpsertWithoutHistoryInputObjectSchema: z.ZodType<Prisma.BuyerUpsertWithoutHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerUpsertWithoutHistoryInput>;
export const BuyerUpsertWithoutHistoryInputObjectZodSchema = makeSchema();
