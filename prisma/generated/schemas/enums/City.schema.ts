import { z } from 'zod';

export const CitySchema = z.enum(['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other'])

export type City = z.infer<typeof CitySchema>;