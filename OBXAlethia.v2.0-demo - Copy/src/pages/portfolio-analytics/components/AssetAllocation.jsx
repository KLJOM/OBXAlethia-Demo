import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetAllocation = () => {
  const [viewMode, setViewMode] = useState('sector');

  const sectorData = [
    { name: 'Private Equity', value: 35, color: '#3B82F6', change: '+5.2%' },
    { name: 'Real Estate', value: 25, color: '#06B6D4', change: '+3.8%' },
    { name: 'Art & Collectibles', value: 15, color: '#10B981', change: '+12.4%' },
    { name: 'Mining & Energy', value: 12, color: '#F59E0B', change: '-2.1%' },
    { name: 'Agriculture', value: 8, color: '#8B5CF6', change: '+6.7%' },
    { name: 'Cash & Equivalents', value: 5, color: '#64748B', change: '+0.5%' }
  ];

  const geographyData = [
    { name: 'North America', value: 45, color: '#3B82F6', change: '+4.2%' },
    { name: 'Europe', value: 28, color: '#06B6D4', change: '+3.1%' },
    { name: 'Asia Pacific', value: 18, color: '#10B981', change: '+8.9%' },
    { name: 'Latin America', value: 6, color: '#F59E0B', change: '+2.5%' },
    { name: 'Middle East & Africa', value: 3, color: '#8B5CF6', change: '+1.8%' }
  ];

  const currentData = viewMode === 'sector' ? sectorData : geographyData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-surface p-3 rounded-lg elevation-2">
          <p className="text-sm font-medium text-foreground mb-1">{payload?.[0]?.name}</p>
          <p className="text-lg font-bold" style={{ color: payload?.[0]?.payload?.color }}>
            {payload?.[0]?.value}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Change: {payload?.[0]?.payload?.change}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Asset Allocation</h2>
          <p className="text-sm text-muted-foreground">Portfolio distribution analysis</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 glass-surface-light rounded-lg p-1">
            <button
              onClick={() => setViewMode('sector')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                viewMode === 'sector' ?'bg-secondary text-secondary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              By Sector
            </button>
            <button
              onClick={() => setViewMode('geography')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                viewMode === 'geography' ?'bg-secondary text-secondary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              By Geography
            </button>
          </div>

          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Rebalance
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full h-80" aria-label="Asset Allocation Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {currentData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {currentData?.map((item, index) => (
            <div key={index} className="glass-surface-light rounded-lg p-4 hover:elevation-1 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{item?.name}</span>
                </div>
                <span className="text-lg font-bold text-foreground">{item?.value}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-full bg-muted rounded-full h-2 mr-3">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${item?.value}%`, backgroundColor: item?.color }}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    item?.change?.startsWith('+') ? 'text-success' : 'text-error'
                  }`}
                >
                  {item?.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="glass-surface-light rounded-lg p-4 text-center">
          <Icon name="TrendingUp" size={20} className="mx-auto mb-2 text-success" />
          <p className="text-xs text-muted-foreground mb-1">Diversification Score</p>
          <p className="text-xl font-bold text-foreground">8.7/10</p>
        </div>
        <div className="glass-surface-light rounded-lg p-4 text-center">
          <Icon name="Shield" size={20} className="mx-auto mb-2 text-secondary" />
          <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
          <p className="text-xl font-bold text-foreground">Moderate</p>
        </div>
        <div className="glass-surface-light rounded-lg p-4 text-center">
          <Icon name="Target" size={20} className="mx-auto mb-2 text-accent" />
          <p className="text-xs text-muted-foreground mb-1">Target Allocation</p>
          <p className="text-xl font-bold text-success">98% Match</p>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;
