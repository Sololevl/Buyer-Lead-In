import { z } from 'zod';
export const BuyerAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    fullName: z.number(),
    email: z.number(),
    phone: z.number(),
    city: z.number(),
    propertyType: z.number(),
    bhk: z.number(),
    purpose: z.number(),
    budgetMin: z.number(),
    budgetMax: z.number(),
    timeline: z.number(),
    source: z.number(),
    status: z.number(),
    notes: z.number(),
    tags: z.number(),
    ownerId: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    history: z.number()
  }).optional(),
  _sum: z.object({
    budgetMin: z.number().nullable(),
    budgetMax: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    budgetMin: z.number().nullable(),
    budgetMax: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    fullName: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    budgetMin: z.number().int().nullable(),
    budgetMax: z.number().int().nullable(),
    notes: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
    ownerId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    fullName: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    budgetMin: z.number().int().nullable(),
    budgetMax: z.number().int().nullable(),
    notes: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
    ownerId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});