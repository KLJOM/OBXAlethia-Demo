import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [timeframe, setTimeframe] = useState('1Y');
  const [chartType, setChartType] = useState('line');

  const performanceData = [
    { month: 'Jan', portfolio: 2400000, benchmark: 2200000, alpha: 200000 },
    { month: 'Feb', portfolio: 2550000, benchmark: 2350000, alpha: 200000 },
    { month: 'Mar', portfolio: 2680000, benchmark: 2480000, alpha: 200000 },
    { month: 'Apr', portfolio: 2820000, benchmark: 2600000, alpha: 220000 },
    { month: 'May', portfolio: 2950000, benchmark: 2720000, alpha: 230000 },
    { month: 'Jun', portfolio: 3100000, benchmark: 2850000, alpha: 250000 },
    { month: 'Jul', portfolio: 3280000, benchmark: 2980000, alpha: 300000 },
    { month: 'Aug', portfolio: 3420000, benchmark: 3100000, alpha: 320000 },
    { month: 'Sep', portfolio: 3580000, benchmark: 3220000, alpha: 360000 },
    { month: 'Oct', portfolio: 3750000, benchmark: 3350000, alpha: 400000 },
    { month: 'Nov', portfolio: 3920000, benchmark: 3480000, alpha: 440000 },
    { month: 'Dec', portfolio: 4100000, benchmark: 3600000, alpha: 500000 }
  ];

  const timeframes = ['1M', '3M', '6M', '1Y', 'YTD', 'ALL'];
  const chartTypes = [
    { type: 'line', icon: 'TrendingUp', label: 'Line' },
    { type: 'area', icon: 'AreaChart', label: 'Area' },
    { type: 'bar', icon: 'BarChart3', label: 'Bar' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-surface p-4 rounded-lg elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{payload?.[0]?.payload?.month}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span style={{ color: entry?.color }}>{entry?.name}:</span>
              <span className="font-semibold text-foreground">
                ${(entry?.value / 1000000)?.toFixed(2)}M
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: performanceData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" tickFormatter={(value) => `$${(value / 1000000)?.toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="portfolio" stroke="var(--color-secondary)" fill="url(#portfolioGradient)" strokeWidth={2} name="Portfolio Value" />
            <Area type="monotone" dataKey="benchmark" stroke="var(--color-accent)" fill="url(#benchmarkGradient)" strokeWidth={2} name="Benchmark" />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" tickFormatter={(value) => `$${(value / 1000000)?.toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="portfolio" fill="var(--color-secondary)" name="Portfolio Value" radius={[4, 4, 0, 0]} />
            <Bar dataKey="benchmark" fill="var(--color-accent)" name="Benchmark" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" tickFormatter={(value) => `$${(value / 1000000)?.toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="portfolio" stroke="var(--color-secondary)" strokeWidth={3} dot={{ r: 4 }} name="Portfolio Value" />
            <Line type="monotone" dataKey="benchmark" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4 }} name="Benchmark" />
            <Line type="monotone" dataKey="alpha" stroke="var(--color-success)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Alpha Generation" />
          </LineChart>
        );
    }
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Portfolio Performance</h2>
          <p className="text-sm text-muted-foreground">Comparative analysis vs benchmark index</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 glass-surface-light rounded-lg p-1">
            {timeframes?.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 glass-surface-light rounded-lg p-1">
            {chartTypes?.map((ct) => (
              <button
                key={ct?.type}
                onClick={() => setChartType(ct?.type)}
                className={`p-2 rounded transition-all ${
                  chartType === ct?.type
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={ct?.label}
              >
                <Icon name={ct?.icon} size={16} />
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      <div className="w-full h-80" aria-label="Portfolio Performance Chart">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Return</p>
          <p className="text-2xl font-bold text-success">+70.83%</p>
          <p className="text-xs text-muted-foreground mt-1">vs +63.64% benchmark</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Sharpe Ratio</p>
          <p className="text-2xl font-bold text-foreground">2.34</p>
          <p className="text-xs text-success mt-1">Excellent risk-adjusted returns</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Max Drawdown</p>
          <p className="text-2xl font-bold text-warning">-8.2%</p>
          <p className="text-xs text-muted-foreground mt-1">Better than -12.5% benchmark</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
