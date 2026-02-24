"use client"

import { SidebarNav } from "@/components/layout/nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, Smartphone, Radio, CloudRain } from "lucide-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts"

const bayesianData = [
  { day: 'Day 1', initial: 100, actual: 110, bayesian: 110 },
  { day: 'Day 2', initial: 120, actual: 140, bayesian: 135 },
  { day: 'Day 3', initial: 130, actual: 180, bayesian: 175 },
  { day: 'Day 4', initial: 140, actual: null, bayesian: 210 },
  { day: 'Day 5', initial: 150, actual: null, bayesian: 245 },
  { day: 'Day 6', initial: 160, actual: null, bayesian: 290 },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <SidebarNav />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20"></div>
          <h1 className="relative text-5xl font-headline mb-2 font-bold tracking-tight apple-gradient-text drop-shadow-sm">AI REORDER AGENT</h1>
          <p className="text-muted-foreground/80 font-medium tracking-wide">Multi-stream demand intelligence and real-time inventory optimization.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-panel border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">NLP Social Sentiment</CardTitle>
              <Smartphone className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+84%</div>
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> TikTok & Insta (24h)
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Global POS Sync</CardTitle>
              <Activity className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2B</div>
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                Data points processed / hr
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">RFID Fit-to-Buy Rate</CardTitle>
              <Radio className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.8%</div>
              <p className="text-xs text-muted-foreground mt-1">High fit, low buy on 3 SKUs</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Weather Demand Impact</CardTitle>
              <CloudRain className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-15%</div>
              <p className="text-xs text-muted-foreground mt-1">Early rain in EU region</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="col-span-1 glass-panel border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>
            <CardHeader>
              <CardTitle className="apple-gradient-text">Real-time Bayesian Inference</CardTitle>
              <CardDescription>Adjusting initial baseline predictions using real-time POS & RFID signals.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bayesianData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBayesian" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B87CFF" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#B87CFF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInitial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(20, 20, 30, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="initial" stroke="#60A5FA" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorInitial)" name="Initial Cluster Baseline" />
                  <Area type="monotone" dataKey="bayesian" stroke="#B87CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorBayesian)" name="Bayesian Adjusted Forecast" />
                  <Area type="monotone" dataKey="actual" stroke="#FF8FA3" strokeWidth={3} fill="none" dot={{r: 4}} name="Actual POS Sales" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 glass-panel border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            <CardHeader>
              <CardTitle className="apple-gradient-text">Agile Action Streams</CardTitle>
              <CardDescription>Live decisions executed by optimization logic.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { item: 'Minimalist Silk Shirt', action: 'Scale-up near-shoring production by 15%', trigger: 'Bayesian POS spike + NLP sentiment', time: '10m ago', status: 'executing' },
                  { item: 'Floral Maxi Dress', action: 'Size Breakage Policy Triggered (Size M OOS)', trigger: 'Withdraw remaining sizes to preserve shelf value', time: '1h ago', status: 'applied' },
                  { item: 'Tech Hoodie', action: 'Dynamic Pricing: -5% discount applied', trigger: 'RFID dwell time high, POS conversion low', time: '3h ago', status: 'applied' },
                ].map((log, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm text-white/90">{log.item}</div>
                      <Badge variant={log.status === 'executing' ? 'default' : 'outline'} className={log.status === 'executing' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 animate-pulse' : 'border-white/10 text-white/70'}>
                        {log.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-primary">{log.action}</div>
                    <div className="flex justify-between items-end">
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                        {log.trigger}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{log.time}</div>
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
