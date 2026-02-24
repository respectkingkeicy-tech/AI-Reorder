
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
import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-react"
import { FashionItem } from "@/app/lib/types"

const mockItems: FashionItem[] = [
  { id: '1', name: 'Minimalist Silk Shirt', type: 'Shirt', material: 'Silk', style: 'Minimalist', seasonality: 'Spring/Summer', cost: 45, sellingPrice: 120, initialQuantity: 500, currentStock: 120, historicalWeeklySales: [45, 50, 48, 55] },
  { id: '2', name: 'Floral Maxi Dress', type: 'Dress', material: 'Chiffon', style: 'Bohemian', seasonality: 'Spring/Summer', cost: 65, sellingPrice: 180, initialQuantity: 300, currentStock: 45, historicalWeeklySales: [20, 25, 30, 35] },
  { id: '3', name: 'Performance Tech Hoodie', type: 'Hoodie', material: 'Recycled Poly', style: 'Athleisure', seasonality: 'Fall/Winter', cost: 55, sellingPrice: 140, initialQuantity: 800, currentStock: 250, historicalWeeklySales: [80, 90, 85, 100] },
]

export default function Catalog() {
  const [items, setItems] = useState<FashionItem[]>(mockItems)
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
            <h1 className="text-4xl font-headline mb-2">Item Catalog</h1>
            <p className="text-muted-foreground">Manage your collection of fashion pieces and their core specifications.</p>
          </div>
          <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add New Item
          </Button>
        </header>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-xl">All Items</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search catalog..." 
                className="pl-8 bg-secondary/50 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Item Details</TableHead>
                  <TableHead>Specifications</TableHead>
                  <TableHead>Seasonality</TableHead>
                  <TableHead className="text-right">Unit Cost</TableHead>
                  <TableHead className="text-right">Selling Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="group transition-colors hover:bg-secondary/20">
                    <TableCell>
                      <div>
                        <div className="font-semibold text-foreground">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="text-muted-foreground">{item.material}</span>
                        <span className="mx-2 text-border">|</span>
                        <span className="text-muted-foreground">{item.style}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                        {item.seasonality}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">${item.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-mono">${item.sellingPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
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
