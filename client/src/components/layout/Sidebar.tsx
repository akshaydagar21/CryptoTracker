import { useState } from 'react';
import { 
  LayoutDashboard, 
  Heart, 
  Settings, 
  TrendingUp, 
  PieChart,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', current: true },
  { name: 'Watchlist', icon: Heart, href: '/watchlist', current: false },
  { name: 'Portfolio', icon: PieChart, href: '/portfolio', current: false },
  { name: 'Market', icon: TrendingUp, href: '/market', current: false },
  { name: 'Settings', icon: Settings, href: '/settings', current: false },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location, setLocation] = useLocation();

  return (
    <div className={cn(
      "relative h-screen bg-card/50 backdrop-blur-xl border-r border-border/50 transition-all duration-300 glass-card",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-crypto-green to-crypto-blue rounded-lg flex items-center justify-center glow-sm">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-xl font-space-grotesk font-bold bg-gradient-to-r from-crypto-green to-crypto-blue bg-clip-text text-transparent">
              CryptoTracker
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                collapsed ? "px-2" : "px-4",
                isActive && "bg-primary/10 text-primary border border-primary/20 glow-sm"
              )}
              onClick={() => setLocation(item.href)}
            >
              <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-card border border-border/50 rounded-full shadow-md hover:shadow-lg transition-all"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}