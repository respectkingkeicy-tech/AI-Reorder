/**
 * @fileOverview A mocked AI tool for fashion planners to adjust initial quantity plans based on item attributes and fashion trends.
 * Supporting static export by avoiding server-side logic and Genkit dependencies.
 */

import {z} from 'zod';

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
  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const adjustment = 0.15; // Mocked 15% increase
  const adjustedQty = Math.round(input.initialQuantity * (1 + adjustment));

  return {
    suggestedAdjustmentPercentage: adjustment,
    reasoning: `Based on the ${input.style} style and ${input.material} material, there is a strong upward trend in urban markets. The ${input.seasonality} season aligns well with current consumer sentiment, suggesting a ${adjustment * 100}% increase in planned quantity.`,
    adjustedQuantity: adjustedQty
  };
}
