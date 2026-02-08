import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PortfolioChart = ({ data, type = 'line' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-surface rounded-lg p-3 elevation-3">
          <p className="text-xs text-muted-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <span className="text-xs font-medium" style={{ color: entry?.color }}>
                {entry?.name}
              </span>
              <span className="text-xs font-semibold text-foreground">
                ${entry?.value?.toLocaleString()}M
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80" aria-label="Portfolio Performance Chart">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'area' ? (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrivateEquity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRealEstate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMining" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: 'var(--color-foreground)' }}
            />
            <Area 
              type="monotone" 
              dataKey="privateEquity" 
              stroke="var(--color-secondary)" 
              fillOpacity={1} 
              fill="url(#colorPrivateEquity)" 
              name="Private Equity"
            />
            <Area 
              type="monotone" 
              dataKey="realEstate" 
              stroke="var(--color-accent)" 
              fillOpacity={1} 
              fill="url(#colorRealEstate)" 
              name="Real Estate"
            />
            <Area 
              type="monotone" 
              dataKey="mining" 
              stroke="var(--color-success)" 
              fillOpacity={1} 
              fill="url(#colorMining)" 
              name="Mining"
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)" 
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: 'var(--color-foreground)' }}
            />
            <Line 
              type="monotone" 
              dataKey="privateEquity" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-secondary)', r: 4 }}
              name="Private Equity"
            />
            <Line 
              type="monotone" 
              dataKey="realEstate" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', r: 4 }}
              name="Real Estate"
            />
            <Line 
              type="monotone" 
              dataKey="mining" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', r: 4 }}
              name="Mining"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
