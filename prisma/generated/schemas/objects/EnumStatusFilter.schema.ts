import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StatusSchema } from '../enums/Status.schema';
import { NestedEnumStatusFilterObjectSchema } from './NestedEnumStatusFilter.schema'

const makeSchema = () => z.object({
  equals: StatusSchema.optional(),
  in: StatusSchema.array().optional(),
  notIn: StatusSchema.array().optional(),
  not: z.union([StatusSchema, z.lazy(() => NestedEnumStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumStatusFilterObjectSchema: z.ZodType<Prisma.EnumStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStatusFilter>;
export const EnumStatusFilterObjectZodSchema = makeSchema();
