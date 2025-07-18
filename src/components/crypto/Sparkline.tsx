import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  color: string;
}

export function Sparkline({ data, color }: SparklineProps) {
  const chartData = data.map((value, index) => ({
    value,
    index,
  }));

  return (
    <div className="sparkline">
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