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
  Target,
  Network,
  Maximize2
} from "lucide-react"
import { 
  aiTrendAdjustmentSuggestion, 
  AiTrendAdjustmentSuggestionInput, 
  AiTrendAdjustmentSuggestionOutput 
} from "@/ai/flows/ai-trend-adjustment-suggestion"
import { useToast } from "@/hooks/use-toast"

export default function Planning() {
  const { toast } = useToast()
  const [loadingAI, setLoadingAI] = useState(false)
  const [allocationRun, setAllocationRun] = useState(false)
  
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
        title: "Bayesian Real-time Adjustment Complete",
        description: `Early POS & RFID signals applied. Adjustment: ${(result.suggestedAdjustmentPercentage * 100).toFixed(1)}%`,
      })
    } catch (e) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to run Bayesian inference."
      })
    } finally {
      setLoadingAI(false)
    }
  }

  const handleRunMIP = () => {
    setLoadingAI(true)
    setTimeout(() => {
      setAllocationRun(true)
      setLoadingAI(false)
      toast({
        title: "MIP Allocation Optimization Complete",
        description: "Global network distribution calculated with Size Breakage constraints.",
      })
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-headline mb-2 text-white">Advanced Reorder Planning</h1>
            <p className="text-muted-foreground">Bayesian inference prediction, MIP allocation, and Size Breakage optimization.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleRunMIP}
              disabled={loadingAI || !aiResult}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Network className="w-4 h-4 mr-2" />
              Run Global MIP Allocation
            </Button>
            <Button 
              onClick={handleAiTrendAnalysis}
              disabled={loadingAI}
              className="bg-accent hover:bg-accent/80 text-accent-foreground shadow-lg shadow-purple-500/20"
            >
              {loadingAI ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Bayesian Forecast Correction
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <Card className="glass-panel border-white/10 shadow-xl">
              <CardHeader>
                <CardTitle className="apple-gradient-text">Initial Cluster Baseline: {selectedItem.name}</CardTitle>
                <CardDescription>Based on metadata matching (no historical data prior to launch).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Baseline Forecast</div>
                    <div className="text-2xl font-bold text-white">{selectedItem.initialQuantity}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Material</div>
                    <div className="text-lg font-medium text-white/90">{selectedItem.material}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Style Path</div>
                    <div className="text-lg font-medium text-white/90">{selectedItem.style}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Early RFID</div>
                    <div className="text-lg font-medium text-accent">High Dwell</div>
                  </div>
                </div>

                {aiResult && (
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <h3 className="font-headline text-xl text-white">Bayesian Inference Correction</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      <div className="col-span-2">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Initial clustering forecast of {selectedItem.initialQuantity} has been adjusted based on first 3 days of POS data and high RFID fitting room conversion rates. {aiResult.reasoning}
                        </p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                        <div className="text-xs text-muted-foreground mb-2">Point Forecast Update</div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-white/80">Delta</span>
                          <span className={aiResult.suggestedAdjustmentPercentage > 0 ? "text-accent font-bold" : "text-destructive font-bold"}>
                            {aiResult.suggestedAdjustmentPercentage > 0 ? "+" : ""}
                            {(aiResult.suggestedAdjustmentPercentage * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="font-bold text-white/90">New Target</span>
                          <span className="text-2xl font-bold text-white">{aiResult.adjustedQuantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {allocationRun && (
              <Card className="glass-panel border-white/10 shadow-xl border-t-accent/50 animate-in fade-in slide-in-from-bottom-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 apple-gradient-text">
                    <Maximize2 className="w-5 h-5" />
                    MIP Allocation & Size Breakage Optimization
                  </CardTitle>
                  <CardDescription>Global distribution maximizing shelf time before core size stockout.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-destructive mb-1">Size Breakage Constraint Triggered (EU Region)</div>
                        <p className="text-[12px] text-destructive/80">
                          Prediction indicates Size M will sell out in 14 days, forcing withdrawal of S and L. MIP algorithm has reallocated 20% of US Size M inventory to EU to balance shelf life globally.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-muted-foreground mb-2">EU Allocation</div>
                        <div className="flex justify-between items-end">
                          <div className="text-2xl font-bold text-white">450</div>
                          <div className="text-xs text-accent">+20% (Size M shift)</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-muted-foreground mb-2">US Allocation</div>
                        <div className="flex justify-between items-end">
                          <div className="text-2xl font-bold text-white">225</div>
                          <div className="text-xs text-destructive">-20% (Optimal)</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-muted-foreground mb-2">Agile Production Trigger</div>
                        <div className="flex justify-between items-end">
                          <div className="text-2xl font-bold text-white">Near-shore</div>
                          <div className="text-xs text-primary">+100 units</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            <Card className="glass-panel border-white/10 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Dynamic Pricing Matrix</CardTitle>
                <CardDescription className="text-muted-foreground">Algorithmic margin protection based on velocity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm font-medium text-white/90">Week 1-2 (Launch)</span>
                    <Badge variant="outline" className="text-primary border-primary bg-primary/10">Full Price</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm font-medium text-white/90">Week 3-4 (If V &lt; 0.8)</span>
                    <Badge variant="outline" className="text-yellow-500 border-yellow-500 bg-yellow-500/10">-10% Discount</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm font-medium text-white/90">Week 5+ (Clearance)</span>
                    <Badge variant="outline" className="text-destructive border-destructive bg-destructive/10">-25% Dynamic</Badge>
                  </div>
                </div>
                <div className="p-4 mt-4 rounded-lg bg-primary/10 border border-primary/20 text-[11px] text-primary/80">
                  Matrix calculates elasticity based on real-time sell-through rates to prevent excessive markdowns.
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10 shadow-xl bg-gradient-to-b from-white/5 to-white/0">
              <CardHeader>
                <CardTitle className="text-white">Global Profit Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Optimized Revenue</div>
                  <div className="text-3xl font-bold text-white">$84,200</div>
                  <div className="text-xs text-accent mt-1">+11.3% vs static allocation</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Expected Margin</div>
                  <div className="text-xl font-bold text-primary">46.8%</div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold shadow-lg shadow-purple-500/20">
                    Push Execution to ERP
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
