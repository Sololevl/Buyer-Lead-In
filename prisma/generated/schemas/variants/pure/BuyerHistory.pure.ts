import { z } from 'zod';

// prettier-ignore
export const BuyerHistoryModelSchema = z.object({
    id: z.string(),
    buyer: z.unknown(),
    buyerId: z.string(),
    changedBy: z.string(),
    changedAt: z.date(),
    diff: z.unknown()
}).strict();

export type BuyerHistoryModelType = z.infer<typeof BuyerHistoryModelSchema>;
