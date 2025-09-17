import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerHistoryScalarWhereInputObjectSchema } from './BuyerHistoryScalarWhereInput.schema';
import { BuyerHistoryUpdateManyMutationInputObjectSchema } from './BuyerHistoryUpdateManyMutationInput.schema';
import { BuyerHistoryUncheckedUpdateManyWithoutBuyerInputObjectSchema } from './BuyerHistoryUncheckedUpdateManyWithoutBuyerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BuyerHistoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => BuyerHistoryUpdateManyMutationInputObjectSchema), z.lazy(() => BuyerHistoryUncheckedUpdateManyWithoutBuyerInputObjectSchema)])
}).strict();
export const BuyerHistoryUpdateManyWithWhereWithoutBuyerInputObjectSchema: z.ZodType<Prisma.BuyerHistoryUpdateManyWithWhereWithoutBuyerInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerHistoryUpdateManyWithWhereWithoutBuyerInput>;
export const BuyerHistoryUpdateManyWithWhereWithoutBuyerInputObjectZodSchema = makeSchema();
