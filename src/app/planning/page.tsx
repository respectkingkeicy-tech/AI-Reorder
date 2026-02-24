
"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/layout/nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Sparkles, 
  ArrowRight, 
  RefreshCcw, 
  TrendingUp, 
  AlertTriangle,
  ChevronRight,
  Target
} from "lucide-react"
import { 
  aiTrendAdjustmentSuggestion, 
  AiTrendAdjustmentSuggestionInput, 
  AiTrendAdjustmentSuggestionOutput 
} from "@/ai/flows/ai-trend-adjustment-suggestion"
import { 
  suggestOptimalStockLevel, 
  AIStockLevelSuggestionInput, 
  AIStockLevelSuggestionOutput 
} from "@/ai/flows/ai-stock-level-suggestion"
import { useToast } from "@/hooks/use-toast"

export default function Planning() {
  const { toast } = useToast()
  const [loadingAI, setLoadingAI] = useState(false)
  
  // Active selection for planning
  const [selectedItem, setSelectedItem] = useState({
    name: "Minimalist Silk Shirt",
    type: "Shirt",
    material: "Silk",
    style: "Minimalist",
    seasonality: "Spring/Summer",
    initialQuantity: 500,
    historicalWeeklySales: [45, 52, 48, 55, 60, 58, 65, 70]
  })

  const [aiResult, setAiResult] = useState<AiTrendAdjustmentSuggestionOutput | null>(null)
  const [stockResult, setStockResult] = useState<AIStockLevelSuggestionOutput | null>(null)

  const handleAiTrendAnalysis = async () => {
    setLoadingAI(true)
    try {
      const input: AiTrendAdjustmentSuggestionInput = {
        itemName: selectedItem.name,
        itemType: selectedItem.type,
        material: selectedItem.material,
        style: selectedItem.style,
        seasonality: selectedItem.seasonality,
        initialQuantity: selectedItem.initialQuantity,
        additionalContext: "High demand for minimalist aesthetics in urban markets. Material costs rising."
      }
      const result = await aiTrendAdjustmentSuggestion(input)
      setAiResult(result)
      toast({
        title: "Trend analysis complete",
        description: `Suggested adjustment: ${(result.suggestedAdjustmentPercentage * 100).toFixed(1)}%`,
      })
    } catch (e) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to generate trend adjustment."
      })
    } finally {
      setLoadingAI(false)
    }
  }

  const handleStockPrediction = async () => {
    setLoadingAI(true)
    try {
      const input: AIStockLevelSuggestionInput = {
        itemName: selectedItem.name,
        historicalWeeklySales: selectedItem.historicalWeeklySales,
        weeksToForecast: 4
      }
      const result = await suggestOptimalStockLevel(input)
      setStockResult(result)
      toast({
        title: "Demand forecast ready",
        description: `Optimal stock level: ${result.optimalStockLevel} units`,
      })
    } catch (e) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to predict demand."
      })
    } finally {
      setLoadingAI(false)
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-headline mb-2 text-white">AI REORDER AGENT</h1>
            <p className="text-muted-foreground">Synthesize historical data and AI intelligence for precise stock planning.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleStockPrediction}
              disabled={loadingAI}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Target className="w-4 h-4 mr-2" />
              Predict Demand
            </Button>
            <Button 
              onClick={handleAiTrendAnalysis}
              disabled={loadingAI}
              className="bg-accent hover:bg-accent/80 text-accent-foreground"
            >
              {loadingAI ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              AI Trend Analysis
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Core Design Plan: {selectedItem.name}</CardTitle>
                <CardDescription>Baseline production requirements based on initial parameters.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Base Quantity</div>
                    <div className="text-2xl font-bold">{selectedItem.initialQuantity}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Material</div>
                    <div className="text-lg font-medium">{selectedItem.material}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Style Path</div>
                    <div className="text-lg font-medium">{selectedItem.style}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Market Cycle</div>
                    <div className="text-lg font-medium">{selectedItem.seasonality}</div>
                  </div>
                </div>

                {aiResult && (
                  <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-accent" />
                      <h3 className="font-headline text-xl text-white">AI Trend Insight</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      <div className="col-span-2">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {aiResult.reasoning}
                        </p>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <div className="text-xs text-muted-foreground mb-2">Adjusted Targets</div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Delta</span>
                          <span className={aiResult.suggestedAdjustmentPercentage > 0 ? "text-accent" : "text-destructive"}>
                            {aiResult.suggestedAdjustmentPercentage > 0 ? "+" : ""}
                            {(aiResult.suggestedAdjustmentPercentage * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <span className="font-bold">Final Qty</span>
                          <span className="text-2xl font-bold text-white">{aiResult.adjustedQuantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demand Velocity</CardTitle>
                <CardDescription>Historical weekly sales performance & AI forecast.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedItem.historicalWeeklySales.map((sale, i) => (
                    <div key={i} className="flex flex-col items-center bg-secondary/20 rounded p-2 min-w-[50px]">
                      <span className="text-[10px] text-muted-foreground">W{i+1}</span>
                      <span className="font-mono text-sm">{sale}</span>
                    </div>
                  ))}
                  <div className="flex items-center px-4 text-muted-foreground">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  {stockResult ? (
                    stockResult.predictedFutureDemand.map((sale, i) => (
                      <div key={i} className="flex flex-col items-center bg-accent/10 border border-accent/30 rounded p-2 min-w-[50px] animate-pulse">
                        <span className="text-[10px] text-accent">W{selectedItem.historicalWeeklySales.length + i + 1}</span>
                        <span className="font-mono text-sm text-accent">{Math.round(sale)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center p-2 border border-dashed border-border rounded min-w-[120px] text-[10px] text-muted-foreground">
                      Forecast Pending
                    </div>
                  )}
                </div>

                {stockResult && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
                      <Target className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-sm font-semibold">Optimal Stock Level Suggested</div>
                        <div className="text-2xl font-bold text-accent">{stockResult.optimalStockLevel} Units</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground p-3 border-l-2 border-accent/40 bg-accent/5 italic">
                      "AI Reasoning: {stockResult.reasoning}"
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Plan Overrides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Manual Quantity Adjustment</label>
                  <div className="flex gap-2">
                    <Input type="number" defaultValue={aiResult?.adjustedQuantity || selectedItem.initialQuantity} className="bg-secondary/40" />
                    <Button variant="secondary">Apply</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <p className="text-[11px] text-yellow-200/70">
                    Manual overrides bypass AI recommendations and may increase overstock risk by 12% based on current trends.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/20 border-primary/30">
              <CardHeader>
                <CardTitle className="text-white">Profit Projection</CardTitle>
                <CardDescription className="text-primary-foreground/60">Estimated returns based on planned quantity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Gross Revenue</div>
                  <div className="text-3xl font-bold text-white">$75,600</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Operating Margin</div>
                  <div className="text-xl font-bold text-accent">42.5%</div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold">
                    Export Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
