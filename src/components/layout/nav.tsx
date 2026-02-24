
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
    <nav className="flex flex-col h-full w-64 bg-card border-r border-border p-4 space-y-2">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-white font-headline text-xl">H</span>
        </div>
        <span className="font-headline text-2xl tracking-tight text-white">하림이 바보</span>
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
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="pt-4 border-t border-border">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </nav>
  )
}
