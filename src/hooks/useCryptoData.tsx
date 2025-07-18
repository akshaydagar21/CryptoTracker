import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

interface MarketData {
  total_market_cap: number;
  total_volume_24h: number;
  market_cap_change_percentage_24h: number;
  active_cryptocurrencies: number;
}

// Simulated dynamic data with realistic fluctuations
export function useCryptoData() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [marketData, setMarketData] = useState<MarketData>({
    total_market_cap: 2640000000000,
    total_volume_24h: 89200000000,
    market_cap_change_percentage_24h: 2.4,
    active_cryptocurrencies: 2800
  });
  const [loading, setLoading] = useState(true);

  // Generate realistic sparkline data
  const generateSparkline = (basePrice: number, volatility: number = 0.05) => {
    const points = 24; // 24 hours
    const prices = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.5) * volatility * currentPrice;
      currentPrice += change;
      prices.push(currentPrice);
    }
    
    return prices;
  };

  // Initial data setup
  useEffect(() => {
    const initialData: CryptoData[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        current_price: 67542.30,
        price_change_percentage_24h: 2.45,
        market_cap: 1330000000000,
        market_cap_rank: 1,
        total_volume: 28500000000,
        image: '₿',
        sparkline_in_7d: { price: generateSparkline(67542.30, 0.03) }
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        current_price: 3842.15,
        price_change_percentage_24h: -1.23,
        market_cap: 462000000000,
        market_cap_rank: 2,
        total_volume: 15200000000,
        image: 'Ξ',
        sparkline_in_7d: { price: generateSparkline(3842.15, 0.04) }
      },
      {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        current_price: 238.91,
        price_change_percentage_24h: 5.67,
        market_cap: 113000000000,
        market_cap_rank: 3,
        total_volume: 4800000000,
        image: 'S',
        sparkline_in_7d: { price: generateSparkline(238.91, 0.06) }
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        current_price: 1.23,
        price_change_percentage_24h: -3.45,
        market_cap: 43000000000,
        market_cap_rank: 4,
        total_volume: 1200000000,
        image: '₳',
        sparkline_in_7d: { price: generateSparkline(1.23, 0.05) }
      },
      {
        id: 'polkadot',
        name: 'Polkadot',
        symbol: 'DOT',
        current_price: 8.45,
        price_change_percentage_24h: 1.89,
        market_cap: 12000000000,
        market_cap_rank: 5,
        total_volume: 450000000,
        image: '●',
        sparkline_in_7d: { price: generateSparkline(8.45, 0.05) }
      },
      {
        id: 'chainlink',
        name: 'Chainlink',
        symbol: 'LINK',
        current_price: 24.78,
        price_change_percentage_24h: 4.12,
        market_cap: 15500000000,
        market_cap_rank: 6,
        total_volume: 680000000,
        image: '⚡',
        sparkline_in_7d: { price: generateSparkline(24.78, 0.05) }
      },
      {
        id: 'avalanche',
        name: 'Avalanche',
        symbol: 'AVAX',
        current_price: 45.32,
        price_change_percentage_24h: -2.17,
        market_cap: 18200000000,
        market_cap_rank: 7,
        total_volume: 890000000,
        image: '🔺',
        sparkline_in_7d: { price: generateSparkline(45.32, 0.05) }
      },
      {
        id: 'polygon',
        name: 'Polygon',
        symbol: 'MATIC',
        current_price: 0.89,
        price_change_percentage_24h: 3.76,
        market_cap: 8900000000,
        market_cap_rank: 8,
        total_volume: 320000000,
        image: '🔷',
        sparkline_in_7d: { price: generateSparkline(0.89, 0.06) }
      }
    ];

    setCryptoData(initialData);
    setLoading(false);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(coin => {
          const volatility = coin.symbol === 'BTC' ? 0.001 : coin.symbol === 'ETH' ? 0.002 : 0.005;
          const priceChange = (Math.random() - 0.5) * volatility * coin.current_price;
          const newPrice = coin.current_price + priceChange;
          const percentChange = ((newPrice - coin.current_price) / coin.current_price) * 100;
          
          // Update sparkline
          const newSparkline = [...(coin.sparkline_in_7d?.price || [])];
          newSparkline.shift(); // Remove first element
          newSparkline.push(newPrice); // Add new price
          
          return {
            ...coin,
            current_price: newPrice,
            price_change_percentage_24h: coin.price_change_percentage_24h + percentChange * 0.1,
            sparkline_in_7d: { price: newSparkline }
          };
        })
      );

      // Update market data
      setMarketData(prevData => ({
        ...prevData,
        total_market_cap: prevData.total_market_cap + (Math.random() - 0.5) * 10000000000,
        total_volume_24h: prevData.total_volume_24h + (Math.random() - 0.5) * 1000000000,
        market_cap_change_percentage_24h: prevData.market_cap_change_percentage_24h + (Math.random() - 0.5) * 0.1
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return { cryptoData, marketData, loading };
}