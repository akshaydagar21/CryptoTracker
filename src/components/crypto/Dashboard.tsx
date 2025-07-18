import { MarketStats } from './MarketStats';
import { FeaturedCoins } from './FeaturedCoins';
import { CryptoPriceTable } from './CryptoPriceTable';
import { PriceChart } from './PriceChart';

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-crypto-green to-crypto-blue bg-clip-text text-transparent">
          Cryptocurrency Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Track real-time cryptocurrency prices and market trends
        </p>
      </div>

      {/* Market Statistics */}
      <section>
        <h2 className="text-xl font-semibold mb-4 font-space-grotesk">Market Overview</h2>
        <MarketStats />
      </section>

      {/* Featured Coins */}
      <section>
        <h2 className="text-xl font-semibold mb-4 font-space-grotesk">Featured Assets</h2>
        <FeaturedCoins />
      </section>

      {/* Price Chart */}
      <section>
        <h2 className="text-xl font-semibold mb-4 font-space-grotesk">Market Analysis</h2>
        <div className="grid grid-cols-1 gap-6">
          <PriceChart />
        </div>
      </section>

      {/* Price Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4 font-space-grotesk">Top Cryptocurrencies</h2>
        <CryptoPriceTable />
      </section>
    </div>
  );
}