import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  history: z.boolean().optional()
}).strict();
export const BuyerCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.BuyerCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.BuyerCountOutputTypeSelect>;
export const BuyerCountOutputTypeSelectObjectZodSchema = makeSchema();
