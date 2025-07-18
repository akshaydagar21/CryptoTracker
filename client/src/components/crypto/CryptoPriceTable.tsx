import { useState } from 'react';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Sparkline } from './Sparkline';
import { useCryptoData } from '@/hooks/useCryptoData';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  logo: string;
  sparklineData: number[];
  rank: number;
}

const mockData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67542.30,
    change24h: 2.45,
    marketCap: 1334000000000,
    volume24h: 28500000000,
    logo: '₿',
    sparklineData: [65000, 66000, 65500, 67000, 66800, 67542],
    rank: 1,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3842.15,
    change24h: -1.23,
    marketCap: 462000000000,
    volume24h: 15200000000,
    logo: 'Ξ',
    sparklineData: [3900, 3850, 3800, 3750, 3800, 3842],
    rank: 2,
  },
  {
    id: 'binance-coin',
    name: 'BNB',
    symbol: 'BNB',
    price: 692.84,
    change24h: 3.78,
    marketCap: 100500000000,
    volume24h: 1800000000,
    logo: 'B',
    sparklineData: [670, 680, 675, 690, 695, 692],
    rank: 3,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 238.91,
    change24h: 5.67,
    marketCap: 113000000000,
    volume24h: 4200000000,
    logo: 'S',
    sparklineData: [220, 225, 230, 235, 240, 238],
    rank: 4,
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    price: 2.34,
    change24h: -2.18,
    marketCap: 133000000000,
    volume24h: 8900000000,
    logo: 'X',
    sparklineData: [2.40, 2.35, 2.30, 2.28, 2.32, 2.34],
    rank: 5,
  },
];

function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

export function CryptoPriceTable() {
  const { cryptoData, loading } = useCryptoData();
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  const toggleWatchlist = (id: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(id)) {
      newWatchlist.delete(id);
    } else {
      newWatchlist.add(id);
    }
    setWatchlist(newWatchlist);
  };

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-crypto-green border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rank</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">24h %</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Market Cap</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Volume (24h)</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">Last 7 Days</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr
                  key={crypto.id}
                  className="table-row-hover border-b border-border/30 last:border-0"
                >
                  <td className="p-4">
                    <span className="text-sm font-medium">{crypto.market_cap_rank}</span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-green to-crypto-blue flex items-center justify-center text-white font-bold text-sm glow-sm">
                        {crypto.image}
                      </div>
                      <div>
                        <div className="font-semibold">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 text-right">
                    <span className="font-semibold">${crypto.current_price.toLocaleString()}</span>
                  </td>
                  
                  <td className="p-4 text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-medium flex items-center space-x-1",
                        crypto.price_change_percentage_24h >= 0 ? "price-up" : "price-down"
                      )}
                    >
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                    </Badge>
                  </td>
                  
                  <td className="p-4 text-right">
                    <span className="text-sm">{formatNumber(crypto.market_cap)}</span>
                  </td>
                  
                  <td className="p-4 text-right">
                    <span className="text-sm">{formatNumber(crypto.total_volume)}</span>
                  </td>
                  
                  <td className="p-4 text-center">
                    <Sparkline
                      data={crypto.sparkline_in_7d?.price || []}
                      color={crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444'}
                    />
                  </td>
                  
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleWatchlist(crypto.id)}
                      className="h-8 w-8"
                    >
                      <Star
                        className={cn(
                          "h-4 w-4 transition-colors",
                          watchlist.has(crypto.id)
                            ? "fill-crypto-gold text-crypto-gold"
                            : "text-muted-foreground hover:text-crypto-gold"
                        )}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}