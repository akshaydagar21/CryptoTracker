import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCryptoData } from '@/hooks/useCryptoData';
import { Sparkline } from '@/components/crypto/Sparkline';
import { useState } from 'react';

export default function Watchlist() {
  const { cryptoData } = useCryptoData();
  const [watchedCoins, setWatchedCoins] = useState(new Set(['bitcoin', 'ethereum', 'solana']));

  const toggleWatchlist = (coinId: string) => {
    const newWatchlist = new Set(watchedCoins);
    if (newWatchlist.has(coinId)) {
      newWatchlist.delete(coinId);
    } else {
      newWatchlist.add(coinId);
    }
    setWatchedCoins(newWatchlist);
  };

  const watchedCryptos = cryptoData.filter(crypto => watchedCoins.has(crypto.id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-crypto-green to-crypto-blue bg-clip-text text-transparent">
              Watchlist
            </h1>
            <p className="text-muted-foreground mt-2">
              Keep track of your favorite cryptocurrencies
            </p>
          </div>
          <Button className="bg-gradient-to-r from-crypto-green to-crypto-blue hover:from-crypto-green/90 hover:to-crypto-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            Add to Watchlist
          </Button>
        </div>

        <div className="grid gap-4">
          {watchedCryptos.map((crypto) => (
            <Card key={crypto.id} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-crypto-green to-crypto-blue flex items-center justify-center text-white font-bold glow-sm">
                      {crypto.image}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{crypto.name}</h3>
                      <p className="text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</div>
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
                    </div>

                    <div className="w-24 h-12">
                      <Sparkline
                        data={crypto.sparkline_in_7d?.price || []}
                        color={crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444'}
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleWatchlist(crypto.id)}
                      className="h-8 w-8"
                    >
                      <Star className="h-4 w-4 fill-crypto-gold text-crypto-gold" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {watchedCryptos.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No cryptocurrencies in your watchlist</h3>
              <p className="text-muted-foreground mb-4">Add some cryptocurrencies to start tracking their performance</p>
              <Button>Add to Watchlist</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}