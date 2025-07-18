import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCryptoData } from '@/hooks/useCryptoData';

interface MarketStat {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
}

export function MarketStats() {
  const { marketData } = useCryptoData();
  
  const marketStats: MarketStat[] = [
    {
      title: 'Total Market Cap',
      value: `$${(marketData.total_market_cap / 1e12).toFixed(2)}T`,
      change: marketData.market_cap_change_percentage_24h,
      icon: DollarSign,
    },
    {
      title: '24h Trading Volume',
      value: `$${(marketData.total_volume_24h / 1e9).toFixed(1)}B`,
      change: (Math.random() - 0.5) * 10, // Simulated volume change
      icon: BarChart3,
    },
    {
      title: 'Bitcoin Dominance',
      value: '54.3%',
      change: 0.8,
      icon: TrendingUp,
    },
    {
      title: 'Active Cryptocurrencies',
      value: `${(marketData.active_cryptocurrencies / 1000).toFixed(1)}K+`,
      change: 1.2,
      icon: TrendingUp,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {marketStats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card key={stat.title} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold font-space-grotesk">
                  {stat.value}
                </span>
                
                <Badge
                  variant="secondary"
                  className={cn(
                    "font-medium flex items-center space-x-1",
                    stat.change >= 0 ? "price-up" : "price-down"
                  )}
                >
                  {stat.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{stat.change >= 0 ? '+' : ''}{stat.change.toFixed(1)}%</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}