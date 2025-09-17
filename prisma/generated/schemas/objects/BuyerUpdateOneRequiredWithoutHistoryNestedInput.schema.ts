import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerCreateWithoutHistoryInputObjectSchema } from './BuyerCreateWithoutHistoryInput.schema';
import { BuyerUncheckedCreateWithoutHistoryInputObjectSchema } from './BuyerUncheckedCreateWithoutHistoryInput.schema';
import { BuyerCreateOrConnectWithoutHistoryInputObjectSchema } from './BuyerCreateOrConnectWithoutHistoryInput.schema';
import { BuyerUpsertWithoutHistoryInputObjectSchema } from './BuyerUpsertWithoutHistoryInput.schema';
import { BuyerWhereUniqueInputObjectSchema } from './BuyerWhereUniqueInput.schema';
import { BuyerUpdateToOneWithWhereWithoutHistoryInputObjectSchema } from './BuyerUpdateToOneWithWhereWithoutHistoryInput.schema';
import { BuyerUpdateWithoutHistoryInputObjectSchema } from './BuyerUpdateWithoutHistoryInput.schema';
import { BuyerUncheckedUpdateWithoutHistoryInputObjectSchema } from './BuyerUncheckedUpdateWithoutHistoryInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BuyerCreateWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUncheckedCreateWithoutHistoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BuyerCreateOrConnectWithoutHistoryInputObjectSchema).optional(),
  upsert: z.lazy(() => BuyerUpsertWithoutHistoryInputObjectSchema).optional(),
  connect: z.lazy(() => BuyerWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BuyerUpdateToOneWithWhereWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUpdateWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUncheckedUpdateWithoutHistoryInputObjectSchema)]).optional()
}).strict();
export const BuyerUpdateOneRequiredWithoutHistoryNestedInputObjectSchema: z.ZodType<Prisma.BuyerUpdateOneRequiredWithoutHistoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerUpdateOneRequiredWithoutHistoryNestedInput>;
export const BuyerUpdateOneRequiredWithoutHistoryNestedInputObjectZodSchema = makeSchema();
