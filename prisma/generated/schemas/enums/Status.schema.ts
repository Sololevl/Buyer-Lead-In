import { z } from 'zod';

export const StatusSchema = z.enum(['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped'])

export type Status = z.infer<typeof StatusSchema>;