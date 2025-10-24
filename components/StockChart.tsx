
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { HistoricalDataPoint } from '../types';

interface StockChartProps {
  data: HistoricalDataPoint[];
}

export const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const chartData = data.slice().reverse(); // Recharts expects data in chronological order

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis dataKey="month" stroke="#a0aec0" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#a0aec0" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} tickFormatter={(value) => `$${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(23, 30, 46, 0.8)',
            borderColor: '#4a5568',
            color: '#e2e8f0',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ fontWeight: 'bold' }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
        />
        <Area type="monotone" dataKey="price" stroke="#22d3ee" fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
