import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function TopBar() {
  return (
    <div className="h-16 border-b border-border/50 bg-card/30 backdrop-blur-xl px-6 flex items-center justify-between">
      {/* Global Market Stats */}
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-1">
          <span className="text-sm text-muted-foreground">Market Cap:</span>
          <span className="text-sm font-semibold">$2.64T</span>
          <Badge variant="secondary" className="ml-1 price-up">+2.4%</Badge>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          <span className="text-sm text-muted-foreground">24h Vol:</span>
          <span className="text-sm font-semibold">$89.2B</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-1">
          <span className="text-sm text-muted-foreground">BTC Dom:</span>
          <span className="text-sm font-semibold">54.3%</span>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coins..."
            className="pl-10 w-80 glass-card border-border/50"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-crypto-green rounded-full animate-pulse" />
        </Button>
      </div>
    </div>
  );
}