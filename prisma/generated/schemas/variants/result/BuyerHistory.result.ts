import { z } from 'zod';

// prettier-ignore
export const BuyerHistoryResultSchema = z.object({
    id: z.string(),
    buyer: z.unknown(),
    buyerId: z.string(),
    changedBy: z.string(),
    changedAt: z.date(),
    diff: z.unknown()
}).strict();

export type BuyerHistoryResultType = z.infer<typeof BuyerHistoryResultSchema>;
