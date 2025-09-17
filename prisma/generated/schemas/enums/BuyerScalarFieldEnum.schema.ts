import { z } from 'zod';

export const BuyerScalarFieldEnumSchema = z.enum(['id', 'fullName', 'email', 'phone', 'city', 'propertyType', 'bhk', 'purpose', 'budgetMin', 'budgetMax', 'timeline', 'source', 'status', 'notes', 'tags', 'ownerId', 'createdAt', 'updatedAt'])

export type BuyerScalarFieldEnum = z.infer<typeof BuyerScalarFieldEnumSchema>;