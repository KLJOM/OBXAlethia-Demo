import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = () => {
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: "$41.0M",
      change: "+$8.9M",
      changePercent: "+27.7%",
      period: "YTD",
      icon: "Wallet",
      color: "secondary",
      trend: "up"
    },
    {
      title: "Total Return",
      value: "+70.83%",
      change: "+7.19%",
      changePercent: "vs benchmark",
      period: "12 months",
      icon: "TrendingUp",
      color: "success",
      trend: "up"
    },
    {
      title: "Sharpe Ratio",
      value: "2.34",
      change: "+0.42",
      changePercent: "vs benchmark",
      period: "Risk-adjusted",
      icon: "Activity",
      color: "accent",
      trend: "up"
    },
    {
      title: "Alpha Generation",
      value: "+8.5%",
      change: "+2.1%",
      changePercent: "vs last quarter",
      period: "Annualized",
      icon: "Zap",
      color: "warning",
      trend: "up"
    }
  ];

  const additionalMetrics = [
    { label: "Beta", value: "0.87", description: "Lower volatility than market" },
    { label: "Information Ratio", value: "1.82", description: "Strong active management" },
    { label: "Treynor Ratio", value: "18.4%", description: "Excellent risk-adjusted returns" },
    { label: "Jensen\'s Alpha", value: "+6.2%", description: "Outperforming expectations" },
    { label: "Tracking Error", value: "4.8%", description: "Moderate deviation from benchmark" },
    { label: "Sortino Ratio", value: "3.12", description: "Superior downside protection" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="glass-surface rounded-xl p-6 elevation-2 hover:elevation-3 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${metric?.color}/20`}>
                <Icon name={metric?.icon} size={24} className={`text-${metric?.color}`} />
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                  size={16}
                  className={metric?.trend === 'up' ? 'text-success' : 'text-error'}
                />
                <span className={`text-xs font-medium ${metric?.trend === 'up' ? 'text-success' : 'text-error'}`}>
                  {metric?.change}
                </span>
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-2">{metric?.title}</h3>
            <p className="text-3xl font-bold text-foreground mb-1">{metric?.value}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{metric?.changePercent}</span>
              <span className="text-xs text-muted-foreground">{metric?.period}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="glass-surface rounded-xl p-6 elevation-2">
        <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Performance Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalMetrics?.map((metric, index) => (
            <div key={index} className="glass-surface-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{metric?.label}</span>
                <span className="text-xl font-bold text-secondary">{metric?.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;