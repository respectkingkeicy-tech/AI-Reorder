/**
 * @fileOverview A mocked AI agent for suggesting optimal stock levels based on historical sales data and demand prediction.
 * Supporting static export by avoiding server-side logic and Genkit dependencies.
 */

import {z} from 'zod';

const AIStockLevelSuggestionInputSchema = z.object({
  itemName: z.string().describe('The name of the fashion item.'),
  historicalWeeklySales: z
    .array(z.number())
    .describe('An array of historical weekly sales figures for the item.'),
  weeksToForecast: z
    .number()
    .describe('The number of future weeks to forecast demand for.'),
});
export type AIStockLevelSuggestionInput = z.infer<
  typeof AIStockLevelSuggestionInputSchema
>;

const AIStockLevelSuggestionOutputSchema = z.object({
  predictedFutureDemand: z
    .array(z.number())
    .describe(
      'An array of predicted sales figures for the specified number of future weeks.'
    ),
  optimalStockLevel: z
    .number()
    .describe(
      'The suggested optimal stock level to minimize overstocking or understocking.'
    ),
  reasoning: z
    .string()
    .describe('The AI\'s reasoning for the demand prediction and stock level suggestion.'),
});
export type AIStockLevelSuggestionOutput = z.infer<
  typeof AIStockLevelSuggestionOutputSchema
>;

export async function suggestOptimalStockLevel(
  input: AIStockLevelSuggestionInput
): Promise<AIStockLevelSuggestionOutput> {
  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Simple average-based mock prediction
  const avgSales = input.historicalWeeklySales.reduce((a, b) => a + b, 0) / input.historicalWeeklySales.length;
  const predicted = Array.from({ length: input.weeksToForecast }, (_, i) => Math.round(avgSales * (1 + (i + 1) * 0.05)));
  const optimal = predicted.reduce((a, b) => a + b, 0) + Math.round(avgSales * 0.2); // Sum + 20% buffer

  return {
    predictedFutureDemand: predicted,
    optimalStockLevel: optimal,
    reasoning: `Analysis of the last ${input.historicalWeeklySales.length} weeks shows a steady growth pattern. Based on this velocity, we forecast a moderate increase over the next ${input.weeksToForecast} weeks. The optimal stock level includes a 20% safety buffer to account for potential market spikes.`
  };
}
