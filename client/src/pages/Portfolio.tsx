import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Plus, PieChart, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCryptoData } from '@/hooks/useCryptoData';

export default function Portfolio() {
  const { cryptoData } = useCryptoData();
  
  // Simulated portfolio data with realistic holdings
  const portfolio = [
    { id: 'bitcoin', amount: 0.5, purchasePrice: 45000 },
    { id: 'ethereum', amount: 2.5, purchasePrice: 2800 },
    { id: 'solana', amount: 10, purchasePrice: 180 },
    { id: 'cardano', amount: 500, purchasePrice: 0.85 },
    { id: 'polkadot', amount: 25, purchasePrice: 12.50 },
  ];

  const portfolioValue = portfolio.reduce((total, holding) => {
    const crypto = cryptoData.find(c => c.id === holding.id);
    return total + (crypto ? crypto.current_price * holding.amount : 0);
  }, 0);

  const totalCost = portfolio.reduce((total, holding) => {
    return total + (holding.purchasePrice * holding.amount);
  }, 0);

  const totalGainLoss = portfolioValue - totalCost;
  const totalGainLossPercent = ((totalGainLoss / totalCost) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-crypto-green to-crypto-blue bg-clip-text text-transparent">
              Portfolio
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your cryptocurrency investments
            </p>
          </div>
          <Button className="bg-gradient-to-r from-crypto-green to-crypto-blue hover:from-crypto-green/90 hover:to-crypto-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", totalGainLoss >= 0 ? "text-green-400" : "text-red-400")}>
                ${totalGainLoss.toLocaleString()}
              </div>
              <Badge
                variant="secondary"
                className={cn(
                  "font-medium flex items-center space-x-1 mt-2",
                  totalGainLoss >= 0 ? "price-up" : "price-down"
                )}
              >
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%</span>
              </Badge>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolio.length}</div>
              <p className="text-xs text-muted-foreground">Assets</p>
            </CardContent>
          </Card>
        </div>

        {/* Holdings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolio.map((holding) => {
                const crypto = cryptoData.find(c => c.id === holding.id);
                if (!crypto) return null;

                const currentValue = crypto.current_price * holding.amount;
                const costBasis = holding.purchasePrice * holding.amount;
                const gainLoss = currentValue - costBasis;
                const gainLossPercent = ((gainLoss / costBasis) * 100);

                return (
                  <div key={holding.id} className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crypto-green to-crypto-blue flex items-center justify-center text-white font-bold glow-sm">
                        {crypto.image}
                      </div>
                      <div>
                        <div className="font-semibold">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {holding.amount} {crypto.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">${currentValue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Cost: ${costBasis.toLocaleString()}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={cn("font-semibold", gainLoss >= 0 ? "text-green-400" : "text-red-400")}>
                        ${gainLoss.toLocaleString()}
                      </div>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-medium flex items-center space-x-1",
                          gainLoss >= 0 ? "price-up" : "price-down"
                        )}
                      >
                        {gainLoss >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%</span>
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}