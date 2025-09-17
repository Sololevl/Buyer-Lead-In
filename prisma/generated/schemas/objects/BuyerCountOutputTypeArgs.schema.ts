import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BuyerCountOutputTypeSelectObjectSchema } from './BuyerCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BuyerCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const BuyerCountOutputTypeArgsObjectSchema = makeSchema();
export const BuyerCountOutputTypeArgsObjectZodSchema = makeSchema();
