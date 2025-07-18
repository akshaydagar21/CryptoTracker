import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartData {
  time: string;
  price: number;
  volume: number;
}

const mockChartData: ChartData[] = [
  { time: '00:00', price: 65000, volume: 1200000000 },
  { time: '02:00', price: 65500, volume: 1100000000 },
  { time: '04:00', price: 66000, volume: 1300000000 },
  { time: '06:00', price: 65800, volume: 1250000000 },
  { time: '08:00', price: 66200, volume: 1400000000 },
  { time: '10:00', price: 67000, volume: 1600000000 },
  { time: '12:00', price: 66800, volume: 1350000000 },
  { time: '14:00', price: 67200, volume: 1550000000 },
  { time: '16:00', price: 67100, volume: 1450000000 },
  { time: '18:00', price: 67400, volume: 1700000000 },
  { time: '20:00', price: 67542, volume: 1800000000 },
];

const timeRanges = [
  { label: '1H', value: '1h' },
  { label: '1D', value: '1d' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '1Y', value: '1y' },
];

export function PriceChart() {
  const [selectedRange, setSelectedRange] = useState('1d');
  const [showVolume, setShowVolume] = useState(false);
  
  const currentPrice = mockChartData[mockChartData.length - 1].price;
  const previousPrice = mockChartData[0].price;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg">
          <p className="text-sm text-muted-foreground">{`Time: ${label}`}</p>
          <p className="text-sm font-semibold">
            {`Price: $${payload[0].value.toLocaleString()}`}
          </p>
          {payload[1] && (
            <p className="text-sm">
              {`Volume: $${(payload[1].value / 1000000).toFixed(1)}M`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-space-grotesk">Bitcoin Price Chart</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-2xl font-bold">${currentPrice.toLocaleString()}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "font-medium flex items-center space-x-1",
                  priceChange >= 0 ? "price-up" : "price-down"
                )}
              >
                {priceChange >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} 
                  ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                </span>
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={selectedRange === range.value ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedRange(range.value)}
                  className="text-xs h-7 px-3"
                >
                  {range.label}
                </Button>
              ))}
            </div>
            
            <Button
              variant={showVolume ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowVolume(!showVolume)}
              className="text-xs h-7 px-3"
            >
              Volume
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {showVolume ? (
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  yAxisId="price"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="volume"
                  type="monotone"
                  dataKey="volume"
                  stroke="#6366f1"
                  strokeWidth={1}
                  fill="url(#volumeGradient)"
                  strokeOpacity={0.6}
                />
                <Area
                  yAxisId="price"
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            ) : (
              <LineChart data={mockChartData}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  strokeOpacity={0.9}
                  filter="drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}