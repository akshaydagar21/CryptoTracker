import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CryptoPriceTable } from '@/components/crypto/CryptoPriceTable';
import { MarketStats } from '@/components/crypto/MarketStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useState } from 'react';

export default function Market() {
  const { cryptoData } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');

  const filteredCryptos = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topGainers = [...cryptoData]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 3);

  const topLosers = [...cryptoData]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-crypto-green to-crypto-blue bg-clip-text text-transparent">
            Market Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive cryptocurrency market data and analysis
          </p>
        </div>

        {/* Market Statistics */}
        <section>
          <h2 className="text-xl font-semibold mb-4 font-space-grotesk">Global Market Statistics</h2>
          <MarketStats />
        </section>

        {/* Market Movers */}
        <section>
          <h2 className="text-xl font-semibold mb-4 font-space-grotesk">Market Movers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg text-green-400 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Top Gainers (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topGainers.map((crypto, index) => (
                    <div key={crypto.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-green to-crypto-blue flex items-center justify-center text-white font-bold text-sm">
                          {crypto.image}
                        </div>
                        <div>
                          <div className="font-semibold">{crypto.name}</div>
                          <div className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${crypto.current_price.toLocaleString()}</div>
                        <Badge variant="secondary" className="price-up">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{crypto.price_change_percentage_24h.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Losers */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg text-red-400 flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Top Losers (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topLosers.map((crypto, index) => (
                    <div key={crypto.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-green to-crypto-blue flex items-center justify-center text-white font-bold text-sm">
                          {crypto.image}
                        </div>
                        <div>
                          <div className="font-semibold">{crypto.name}</div>
                          <div className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${crypto.current_price.toLocaleString()}</div>
                        <Badge variant="secondary" className="price-down">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Search and Filter */}
        <section>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search cryptocurrencies..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </section>

        {/* Price Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4 font-space-grotesk">All Cryptocurrencies</h2>
          <CryptoPriceTable />
        </section>
      </div>
    </DashboardLayout>
  );
}