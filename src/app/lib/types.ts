
export type Seasonality = 'Spring/Summer' | 'Fall/Winter' | 'All-Season';

export interface FashionItem {
  id: string;
  name: string;
  type: string;
  material: string;
  style: string;
  seasonality: Seasonality;
  cost: number;
  sellingPrice: number;
  initialQuantity: number;
  currentStock: number;
  historicalWeeklySales: number[];
}

export interface QuantityPlan {
  itemId: string;
  baselineQuantity: number;
  aiAdjustment: number;
  finalPlannedQuantity: number;
  manualOverride?: number;
  profitProjection: number;
  reasoning?: string;
}
