'use server';
/**
 * @fileOverview An AI tool for fashion planners to adjust initial quantity plans based on item attributes and fashion trends.
 *
 * - aiTrendAdjustmentSuggestion - A function that suggests adjustments to initial quantity plans.
 * - AiTrendAdjustmentSuggestionInput - The input type for the aiTrendAdjustmentSuggestion function.
 * - AiTrendAdjustmentSuggestionOutput - The return type for the aiTrendAdjustmentSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema Definition
const AiTrendAdjustmentSuggestionInputSchema = z.object({
  itemName: z.string().describe('The name of the fashion item.'),
  itemType: z
    .string()
    .describe('The type of the fashion item (e.g., "dress", "shirt", "jeans", "accessories").'),
  material: z.string().describe('The primary material of the fashion item (e.g., "silk", "cotton", "wool", "denim", "leather").'),
  style: z
    .string()
    .describe('The style of the fashion item (e.g., "bohemian", "minimalist", "athleisure", "classic", "streetwear").'),
  seasonality: z
    .string()
    .describe('The seasonality of the fashion item (e.g., "spring/summer", "fall/winter", "all-season").'),
  initialQuantity: z
    .number()
    .describe('The initial baseline quantity planned for the item.'),
  additionalContext: z
    .string()
    .optional()
    .describe(
      'Any additional context, historical sales data summary, or current fashion trends relevant for the adjustment.'
    )
});
export type AiTrendAdjustmentSuggestionInput = z.infer<
  typeof AiTrendAdjustmentSuggestionInputSchema
>;

// Output Schema Definition
const AiTrendAdjustmentSuggestionOutputSchema = z.object({
  suggestedAdjustmentPercentage: z
    .number()
    .min(-1)
    .max(1)
    .describe(
      'The suggested adjustment to the initial quantity as a decimal percentage (e.g., 0.1 for +10%, -0.05 for -5%). Must be between -1 (100% decrease) and 1 (100% increase).'
    ),
  reasoning: z
    .string()
    .describe(
      'A detailed explanation and justification for the suggested adjustment, considering item attributes and market trends.'
    ),
  adjustedQuantity: z
    .number()
    .describe('The new calculated quantity after applying the adjustment.'),
});
export type AiTrendAdjustmentSuggestionOutput = z.infer<
  typeof AiTrendAdjustmentSuggestionOutputSchema
>;

export async function aiTrendAdjustmentSuggestion(
  input: AiTrendAdjustmentSuggestionInput
): Promise<AiTrendAdjustmentSuggestionOutput> {
  return aiTrendAdjustmentSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTrendAdjustmentSuggestionPrompt',
  input: { schema: AiTrendAdjustmentSuggestionInputSchema },
  output: { schema: AiTrendAdjustmentSuggestionOutputSchema },
  prompt: `You are an expert fashion market analyst. Your task is to analyze the given fashion item's attributes and current market context to suggest an informed adjustment to its initial quantity plan.

Consider the following item details and current market situation:

Item Name: {{{itemName}}}
Item Type: {{{itemType}}}
Material: {{{material}}}
Style: {{{style}}}
Seasonality: {{{seasonality}}}
Initial Planned Quantity: {{{initialQuantity}}}

Additional Context/Current Trends: {{{additionalContext}}}

Based on your expert analysis, suggest an adjustment percentage to the initial quantity.
The 'suggestedAdjustmentPercentage' must be a decimal number between -1 (for a 100% decrease) and 1 (for a 100% increase).
Provide a clear 'reasoning' for your suggestion.
Finally, calculate the 'adjustedQuantity' by applying the 'suggestedAdjustmentPercentage' to the 'initialQuantity'.

Respond ONLY with a JSON object conforming to the output schema.`
});

const aiTrendAdjustmentSuggestionFlow = ai.defineFlow(
  {
    name: 'aiTrendAdjustmentSuggestionFlow',
    inputSchema: AiTrendAdjustmentSuggestionInputSchema,
    outputSchema: AiTrendAdjustmentSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    // Recalculate to ensure consistency, in case the LLM makes a math error.
    if (output && output.suggestedAdjustmentPercentage !== undefined) {
        output.adjustedQuantity = Math.round(input.initialQuantity * (1 + output.suggestedAdjustmentPercentage));
    }
    return output!;
  }
);
