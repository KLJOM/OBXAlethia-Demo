import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const RiskMetrics = () => {
  const riskData = [
    { metric: 'Market Risk', portfolio: 7.2, benchmark: 8.5, fullMark: 10 },
    { metric: 'Credit Risk', portfolio: 5.8, benchmark: 6.2, fullMark: 10 },
    { metric: 'Liquidity Risk', portfolio: 4.5, benchmark: 5.0, fullMark: 10 },
    { metric: 'Operational Risk', portfolio: 3.2, benchmark: 4.8, fullMark: 10 },
    { metric: 'Concentration Risk', portfolio: 6.0, benchmark: 7.5, fullMark: 10 },
    { metric: 'Currency Risk', portfolio: 5.5, benchmark: 6.8, fullMark: 10 }
  ];

  const riskIndicators = [
    {
      title: "Value at Risk (VaR)",
      value: "$2.4M",
      subtitle: "95% confidence, 1-day",
      icon: "AlertTriangle",
      color: "warning",
      trend: "-5.2%",
      trendPositive: true
    },
    {
      title: "Expected Shortfall",
      value: "$3.8M",
      subtitle: "Conditional VaR",
      icon: "TrendingDown",
      color: "error",
      trend: "-3.1%",
      trendPositive: true
    },
    {
      title: "Beta",
      value: "0.87",
      subtitle: "vs S&P 500",
      icon: "Activity",
      color: "secondary",
      trend: "+0.05",
      trendPositive: false
    },
    {
      title: "Volatility",
      value: "12.4%",
      subtitle: "Annualized",
      icon: "BarChart3",
      color: "accent",
      trend: "-1.8%",
      trendPositive: true
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-surface p-3 rounded-lg elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{payload?.[0]?.payload?.metric}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span style={{ color: entry?.color }}>{entry?.name}:</span>
              <span className="font-semibold text-foreground">{entry?.value}/10</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">Risk Analysis</h2>
        <p className="text-sm text-muted-foreground">Multi-dimensional risk assessment and metrics</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="w-full h-80" aria-label="Risk Profile Radar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={riskData}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
              />
              <Radar
                name="Portfolio"
                dataKey="portfolio"
                stroke="var(--color-secondary)"
                fill="var(--color-secondary)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Benchmark"
                dataKey="benchmark"
                stroke="var(--color-accent)"
                fill="var(--color-accent)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="glass-surface-light rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Overall Risk Score</span>
              <span className="text-2xl font-bold text-success">7.2/10</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-success h-2 rounded-full transition-all"
                style={{ width: '72%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Lower risk profile compared to benchmark (8.1/10)
            </p>
          </div>

          {riskData?.map((item, index) => (
            <div key={index} className="glass-surface-light rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">{item?.metric}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    Portfolio: <span className="font-semibold text-foreground">{item?.portfolio}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Benchmark: <span className="font-semibold text-foreground">{item?.benchmark}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div
                    className="bg-secondary h-1.5 rounded-full"
                    style={{ width: `${(item?.portfolio / item?.fullMark) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div
                    className="bg-accent h-1.5 rounded-full"
                    style={{ width: `${(item?.benchmark / item?.fullMark) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskIndicators?.map((indicator, index) => (
          <div key={index} className="glass-surface-light rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg bg-${indicator?.color}/20`}>
                <Icon name={indicator?.icon} size={20} className={`text-${indicator?.color}`} />
              </div>
              <span className={`text-xs font-medium ${indicator?.trendPositive ? 'text-success' : 'text-error'}`}>
                {indicator?.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{indicator?.value}</p>
            <p className="text-xs text-muted-foreground">{indicator?.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{indicator?.subtitle}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start gap-3 glass-surface-light rounded-lg p-4">
          <Icon name="Info" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Risk Management Recommendation</p>
            <p className="text-xs text-muted-foreground">
              Current portfolio demonstrates strong risk-adjusted returns with lower volatility than benchmark. 
              Consider increasing allocation to alternative assets to further diversify concentration risk. 
              Monitor currency exposure in international holdings as USD strengthens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;
