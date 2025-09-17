import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StatusSchema } from '../enums/Status.schema'

const nestedenumstatusfilterSchema = z.object({
  equals: StatusSchema.optional(),
  in: StatusSchema.array().optional(),
  notIn: StatusSchema.array().optional(),
  not: z.union([StatusSchema, z.lazy(() => NestedEnumStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumStatusFilter> = nestedenumstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumStatusFilter>;
export const NestedEnumStatusFilterObjectZodSchema = nestedenumstatusfilterSchema;
