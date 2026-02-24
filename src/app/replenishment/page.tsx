"use client"

import { useState, useRef } from "react"
import { SidebarNav } from "@/components/layout/nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { 
  FileSpreadsheet, 
  UploadCloud, 
  RefreshCcw, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  PackageMinus
} from "lucide-react"
import Papa from "papaparse"
import { calculateBulkReplenishment, AIBulkReplenishmentOutput } from "@/ai/flows/ai-bulk-replenishment"

interface CsvRow {
  SKU: string;
  "Store Stock": string;
  "Backroom Stock": string;
  "Sales Velocity": string;
  "Lead Time": string;
}

export default function Replenishment() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [results, setResults] = useState<AIBulkReplenishmentOutput | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setLoading(true)

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const items = results.data.map((row) => ({
            sku: row.SKU || "UNKNOWN",
            storeStock: parseInt(row["Store Stock"] || "0", 10),
            backroomStock: parseInt(row["Backroom Stock"] || "0", 10),
            salesVelocity: parseFloat(row["Sales Velocity"] || "0"),
            leadTime: parseFloat(row["Lead Time"] || "0"),
          }))

          const aiResults = await calculateBulkReplenishment({ items })
          setResults(aiResults)
          setDataLoaded(true)
          
          toast({
            title: "Analysis Complete",
            description: `Successfully analyzed ${items.length} SKUs for optimal reorder points.`,
          })
        } catch (error) {
          console.error(error)
          toast({
            variant: "destructive",
            title: "Processing Error",
            description: "Failed to parse data or run calculation. Please check CSV format.",
          })
        } finally {
          setLoading(false)
        }
      },
      error: (error) => {
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: error.message,
        })
        setLoading(false)
      }
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const downloadSampleCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8,SKU,Store Stock,Backroom Stock,Sales Velocity,Lead Time\\n"
      + "TSHIRT-WHT-S,15,30,12.5,2\\n"
      + "JEANS-BLU-32,5,10,8.2,3\\n"
      + "JACKET-BLK-M,45,100,5.0,4\\n"
      + "SNEAKER-WHT-9,2,0,15.5,2";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_inventory_data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Critical': return <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30"><AlertCircle className="w-3 h-3 mr-1" /> Critical</Badge>
      case 'Warning': return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"><TrendingUp className="w-3 h-3 mr-1" /> Warning</Badge>
      case 'Optimal': return <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30"><CheckCircle2 className="w-3 h-3 mr-1" /> Optimal</Badge>
      case 'Overstock': return <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30"><PackageMinus className="w-3 h-3 mr-1" /> Overstock</Badge>
      default: return null
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-headline mb-2 text-white">Smart Replenishment</h1>
          <p className="text-muted-foreground">Upload inventory and POS data (CSV) to calculate optimal order quantities.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-4 space-y-8">
            <Card className="glass-panel border-white/10 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 apple-gradient-text">
                  <FileSpreadsheet className="w-5 h-5" />
                  Data Import
                </CardTitle>
                <CardDescription>
                  Upload a CSV file with columns: SKU, Store Stock, Backroom Stock, Sales Velocity, Lead Time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Input 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                  />
                  <Button 
                    onClick={triggerFileInput}
                    disabled={loading}
                    className="bg-accent hover:bg-accent/80 text-accent-foreground shadow-lg shadow-purple-500/20"
                  >
                    {loading ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                    {loading ? "Analyzing Data..." : "Upload CSV Data"}
                  </Button>
                  <Button variant="ghost" onClick={downloadSampleCsv} className="text-muted-foreground hover:text-white">
                    Download Sample CSV
                  </Button>
                  {fileName && (
                    <span className="text-sm text-white/70 ml-2">File: {fileName}</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {dataLoaded && results && (
              <Card className="glass-panel border-white/10 shadow-xl animate-in fade-in slide-in-from-bottom-2">
                <CardHeader>
                  <CardTitle className="text-white">Replenishment Suggestions</CardTitle>
                  <CardDescription className="text-muted-foreground">Calculated required order quantity (필요 발주량) based on current stock, velocity, and lead time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-white/5">
                        <tr>
                          <th className="px-6 py-3 rounded-tl-xl">SKU</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Suggested Order</th>
                          <th className="px-6 py-3 rounded-tr-xl">Reasoning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.results.map((result, index) => (
                          <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{result.sku}</td>
                            <td className="px-6 py-4">{getStatusBadge(result.status)}</td>
                            <td className="px-6 py-4 font-bold text-accent">
                              {result.suggestedOrder > 0 ? `+\${result.suggestedOrder}` : "-"}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">{result.reasoning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
