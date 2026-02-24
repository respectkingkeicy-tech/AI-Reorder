
"use client"

import { SidebarNav } from "@/components/layout/nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, DollarSign, AlertCircle } from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts"

const data = [
  { name: 'Silk Shirt', planned: 400, actual: 320, profit: 12000 },
  { name: 'Floral Dress', planned: 300, actual: 280, profit: 15000 },
  { name: 'Hoodie', planned: 600, actual: 580, profit: 18000 },
  { name: 'Denim Jeans', planned: 450, actual: 420, profit: 13000 },
]

const COLORS = ['#2E4A75', '#39B86B', '#1E293B', '#10B981'];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <SidebarNav />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-headline mb-2">Executive Overview</h1>
          <p className="text-muted-foreground">Monitor your current fashion quantity designs and profit projections.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Planned Qty</CardTitle>
              <Package className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,750</div>
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12% from last season
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projected Profit</CardTitle>
              <DollarSign className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$58,000</div>
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5.2% yield increase
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Risk</CardTitle>
              <AlertCircle className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Low</div>
              <p className="text-xs text-muted-foreground mt-1">2 items understocked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">AI Precision Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground mt-1">Based on previous 12 weeks</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Planned vs Actual Sales</CardTitle>
              <CardDescription>Visualizing historical accuracy for active catalog items.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E2D', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#39B86B' }}
                  />
                  <Bar dataKey="planned" fill="#2E4A75" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="actual" fill="#39B86B" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest adjustments and AI suggestions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { item: 'Minimalist Silk Shirt', action: 'AI suggested +15% adjustment', time: '2h ago', status: 'pending' },
                  { item: 'Floral Dress', action: 'Manual override to 300 units', time: '5h ago', status: 'applied' },
                  { item: 'Athleisure Hoodie', action: 'New stock prediction generated', time: 'Yesterday', status: 'new' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30">
                    <div>
                      <div className="font-medium text-sm">{log.item}</div>
                      <div className="text-xs text-muted-foreground">{log.action}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={log.status === 'applied' ? 'default' : 'outline'} className={log.status === 'applied' ? 'bg-accent text-accent-foreground' : ''}>
                        {log.status}
                      </Badge>
                      <div className="text-[10px] text-muted-foreground mt-1">{log.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
