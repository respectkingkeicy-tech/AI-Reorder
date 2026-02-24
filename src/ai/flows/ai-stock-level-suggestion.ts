'use server';
/**
 * @fileOverview An AI agent for suggesting optimal stock levels based on historical sales data and demand prediction.
 *
 * - suggestOptimalStockLevel - A function that handles the stock level suggestion process.
 * - AIStockLevelSuggestionInput - The input type for the suggestOptimalStockLevel function.
 * - AIStockLevelSuggestionOutput - The return type for the suggestOptimalStockLevel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return aiStockLevelSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'stockLevelSuggestionPrompt',
  input: {schema: AIStockLevelSuggestionInputSchema},
  output: {schema: AIStockLevelSuggestionOutputSchema},
  prompt: `You are an expert fashion planner AI. Your task is to analyze historical weekly sales data for a fashion item, predict future demand, and suggest an optimal stock level to minimize both overstocking and understocking.

Here is the information about the item and its sales history:
Item Name: {{{itemName}}}
Historical Weekly Sales: {{{historicalWeeklySales}}}
Weeks to Forecast: {{{weeksToForecast}}}

Based on the historical sales patterns, seasonality (if any detectable), and common fashion industry trends, predict the weekly sales for the next {{{weeksToForecast}}} weeks.
Then, calculate an optimal stock level that should cover this predicted demand while also accounting for slight fluctuations to avoid stockouts, without leading to excessive overstock. Provide a clear reasoning for your prediction and suggested stock level.

Ensure your output strictly adheres to the provided JSON schema.`,
});

const aiStockLevelSuggestionFlow = ai.defineFlow(
  {
    name: 'aiStockLevelSuggestionFlow',
    inputSchema: AIStockLevelSuggestionInputSchema,
    outputSchema: AIStockLevelSuggestionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate stock level suggestion.');
    }
    return output;
  }
);
