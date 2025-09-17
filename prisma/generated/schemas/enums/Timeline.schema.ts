import { z } from 'zod';

export const TimelineSchema = z.enum(['ZeroTo3m', 'ThreeTo6m', 'MoreThan6m', 'Exploring'])

export type Timeline = z.infer<typeof TimelineSchema>;