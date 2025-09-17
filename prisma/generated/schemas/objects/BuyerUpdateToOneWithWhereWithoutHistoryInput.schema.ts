import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerWhereInputObjectSchema } from './BuyerWhereInput.schema';
import { BuyerUpdateWithoutHistoryInputObjectSchema } from './BuyerUpdateWithoutHistoryInput.schema';
import { BuyerUncheckedUpdateWithoutHistoryInputObjectSchema } from './BuyerUncheckedUpdateWithoutHistoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuyerWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BuyerUpdateWithoutHistoryInputObjectSchema), z.lazy(() => BuyerUncheckedUpdateWithoutHistoryInputObjectSchema)])
}).strict();
export const BuyerUpdateToOneWithWhereWithoutHistoryInputObjectSchema: z.ZodType<Prisma.BuyerUpdateToOneWithWhereWithoutHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerUpdateToOneWithWhereWithoutHistoryInput>;
export const BuyerUpdateToOneWithWhereWithoutHistoryInputObjectZodSchema = makeSchema();
