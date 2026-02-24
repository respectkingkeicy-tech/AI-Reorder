
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, BarChart3, Settings, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Catalog", href: "/catalog", icon: BookOpen },
  { label: "Planning", href: "/planning", icon: Calculator },
  { label: "Insights", href: "/insights", icon: BarChart3 },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col h-full w-64 glass-panel border-r border-white/10 p-4 space-y-2 relative z-10">
      <div className="flex items-center gap-2 mb-8 px-2 mt-4">
        <div className="w-8 h-8 rounded-xl apple-gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/20">
          <span className="text-white font-headline text-xl">H</span>
        </div>
        <span className="font-headline text-2xl tracking-tight text-white font-semibold">AI REORDER AGENT</span>
      </div>
      
      <div className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium",
                isActive 
                  ? "bg-white/10 text-white shadow-sm border border-white/5 backdrop-blur-md" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "")} />
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="pt-4 border-t border-white/10">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-300"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </nav>
  )
}
