import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const BuyerCreatetagsInputObjectSchema: z.ZodType<Prisma.BuyerCreatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerCreatetagsInput>;
export const BuyerCreatetagsInputObjectZodSchema = makeSchema();
