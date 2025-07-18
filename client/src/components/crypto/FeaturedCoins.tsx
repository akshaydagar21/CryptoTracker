import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useCryptoData } from '@/hooks/useCryptoData';

interface FeaturedCoin {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logo: string;
  chartData: Array<{ time: string; price: number }>;
}

export function FeaturedCoins() {
  const { cryptoData } = useCryptoData();
  
  // Get top 3 coins for featured section
  const featuredCoins = cryptoData.slice(0, 3).map(coin => ({
    name: coin.name,
    symbol: coin.symbol,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    logo: coin.image,
    chartData: coin.sparkline_in_7d?.price.map((price, index) => ({
      time: `${index * 4}:00`,
      price
    })) || []
  }));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {featuredCoins.map((coin) => (
        <Card key={coin.symbol} className="glass-card glow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crypto-green to-crypto-blue flex items-center justify-center text-white font-bold glow-sm">
                  {coin.logo}
                </div>
                <div>
                  <CardTitle className="text-lg">{coin.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                </div>
              </div>
              
              <Badge
                variant="secondary"
                className={cn(
                  "font-medium flex items-center space-x-1",
                  coin.change24h >= 0 ? "price-up" : "price-down"
                )}
              >
                {coin.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-2xl font-bold font-space-grotesk">
                  ${coin.price.toLocaleString()}
                </span>
              </div>
              
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={coin.chartData}>
                    <defs>
                      <linearGradient id={`gradient-${coin.symbol}`} x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={coin.change24h >= 0 ? '#10b981' : '#ef4444'}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={coin.change24h >= 0 ? '#10b981' : '#ef4444'}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={coin.change24h >= 0 ? '#10b981' : '#ef4444'}
                      strokeWidth={2}
                      fill={`url(#gradient-${coin.symbol})`}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}