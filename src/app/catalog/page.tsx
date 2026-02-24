"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/layout/nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Network, Edit2, Trash2 } from "lucide-react"

// Extended type for catalog with clustering
type CatalogItem = {
  id: string
  name: string
  type: string
  material: string
  style: string
  seasonality: string
  clusterMatch: string
  clusterConfidence: number
  baselineDemand: number
  status: 'New' | 'Active' | 'Discontinued'
}

const mockItems: CatalogItem[] = [
  { id: '1', name: 'Minimalist Silk Shirt', type: 'Shirt', material: 'Silk', style: 'Minimalist', seasonality: 'Spring/Summer', clusterMatch: 'SS22_Silk_Basics', clusterConfidence: 94.2, baselineDemand: 1200, status: 'Active' },
  { id: '2', name: 'Utility Cargo Pants', type: 'Pants', material: 'Cotton Blend', style: 'Streetwear', seasonality: 'All Season', clusterMatch: 'FW23_Street_Bottoms', clusterConfidence: 88.5, baselineDemand: 850, status: 'New' },
  { id: '3', name: 'Performance Tech Hoodie', type: 'Hoodie', material: 'Recycled Poly', style: 'Athleisure', seasonality: 'Fall/Winter', clusterMatch: 'FW23_Activewear', clusterConfidence: 96.1, baselineDemand: 2100, status: 'Active' },
]

export default function Catalog() {
  const [items, setItems] = useState<CatalogItem[]>(mockItems)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-headline mb-2 text-white">Item Catalog & Clustering</h1>
            <p className="text-muted-foreground">Manage products and view AI metadata clustering for zero-history demand forecasting.</p>
          </div>
          <Button className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold shadow-lg shadow-purple-500/20">
            <Plus className="w-4 h-4 mr-2" /> Add New Item
          </Button>
        </header>

        <Card className="glass-panel border-white/10 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-xl apple-gradient-text">Product Metadata Clusters</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search catalog..." 
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Item Details</TableHead>
                  <TableHead className="text-muted-foreground">Specifications</TableHead>
                  <TableHead className="text-muted-foreground">AI Cluster Match</TableHead>
                  <TableHead className="text-right text-muted-foreground">Baseline Demand</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="group transition-colors hover:bg-white/5 border-white/10">
                    <TableCell>
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          {item.name}
                          {item.status === 'New' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent/20 text-accent uppercase tracking-wider">New</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="text-muted-foreground">{item.material}</span>
                        <span className="mx-2 text-white/20">|</span>
                        <span className="text-muted-foreground">{item.style}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Network className="w-3.5 h-3.5 text-primary" />
                        <div>
                          <div className="text-sm text-white/90">{item.clusterMatch}</div>
                          <div className="text-[10px] text-primary">{item.clusterConfidence}% similarity</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-mono text-white">{item.baselineDemand}</div>
                      <div className="text-[10px] text-muted-foreground">units/region</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
