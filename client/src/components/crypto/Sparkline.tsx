import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  color: string;
}

export function Sparkline({ data, color }: SparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-24 h-12 flex items-center justify-center text-xs text-muted-foreground">
        No data
      </div>
    );
  }

  const chartData = data.map((value, index) => ({
    value,
    index,
  }));

  return (
    <div className="w-24 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            strokeOpacity={0.8}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}