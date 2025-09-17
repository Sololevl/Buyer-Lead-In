import { z } from 'zod';
export const BuyerUpsertResultSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().optional(),
  phone: z.string(),
  city: z.unknown(),
  propertyType: z.unknown(),
  bhk: z.unknown().optional(),
  purpose: z.unknown(),
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional(),
  timeline: z.unknown(),
  source: z.unknown(),
  status: z.unknown(),
  notes: z.string().optional(),
  tags: z.array(z.string()),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  history: z.array(z.unknown())
});