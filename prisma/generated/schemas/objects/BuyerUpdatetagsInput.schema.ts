import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
export const BuyerUpdatetagsInputObjectSchema: z.ZodType<Prisma.BuyerUpdatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.BuyerUpdatetagsInput>;
export const BuyerUpdatetagsInputObjectZodSchema = makeSchema();
