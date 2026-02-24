import { z } from 'zod';

const ReplenishmentItemInputSchema = z.object({
  sku: z.string(),
  storeStock: z.number(),
  backroomStock: z.number(),
  salesVelocity: z.number().describe('Sales per week'),
  leadTime: z.number().describe('Lead time in weeks'),
});

const AIBulkReplenishmentInputSchema = z.object({
  items: z.array(ReplenishmentItemInputSchema),
});

export type AIBulkReplenishmentInput = z.infer<typeof AIBulkReplenishmentInputSchema>;

const ReplenishmentItemOutputSchema = z.object({
  sku: z.string(),
  suggestedOrder: z.number(),
  status: z.enum(['Critical', 'Warning', 'Optimal', 'Overstock']),
  reasoning: z.string(),
});

const AIBulkReplenishmentOutputSchema = z.object({
  results: z.array(ReplenishmentItemOutputSchema),
});

export type AIBulkReplenishmentOutput = z.infer<typeof AIBulkReplenishmentOutputSchema>;

export async function calculateBulkReplenishment(
  input: AIBulkReplenishmentInput
): Promise<AIBulkReplenishmentOutput> {
  // Simulate AI/Processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const results = input.items.map(item => {
    const totalStock = item.storeStock + item.backroomStock;
    const expectedDemandDuringLeadTime = item.salesVelocity * item.leadTime;
    // Add a safety stock of 1.5 weeks of sales
    const safetyStock = item.salesVelocity * 1.5;
    const reorderPoint = expectedDemandDuringLeadTime + safetyStock;
    
    let suggestedOrder = 0;
    let status: 'Critical' | 'Warning' | 'Optimal' | 'Overstock' = 'Optimal';

    if (totalStock <= expectedDemandDuringLeadTime) {
      status = 'Critical';
      suggestedOrder = Math.ceil(reorderPoint - totalStock + (item.salesVelocity * 2)); // order enough for 2 extra weeks
    } else if (totalStock <= reorderPoint) {
      status = 'Warning';
      suggestedOrder = Math.ceil(reorderPoint - totalStock + item.salesVelocity);
    } else if (totalStock > reorderPoint * 1.5) {
      status = 'Overstock';
      suggestedOrder = 0;
    } else {
      status = 'Optimal';
      suggestedOrder = 0;
    }

    let reasoning = "";
    if (status === 'Critical') {
      reasoning = `High risk of stockout. Total stock (${totalStock}) covers less than lead time demand (${Math.round(expectedDemandDuringLeadTime)}).`;
    } else if (status === 'Warning') {
      reasoning = `Stock is approaching reorder point (${Math.round(reorderPoint)}). Proactive order suggested.`;
    } else if (status === 'Overstock') {
      reasoning = `Current stock (${totalStock}) is more than sufficient for lead time and safety stock.`;
    } else {
      reasoning = `Stock levels are healthy. No immediate action required.`;
    }

    return {
      sku: item.sku,
      suggestedOrder,
      status,
      reasoning,
    };
  });

  return { results };
}
