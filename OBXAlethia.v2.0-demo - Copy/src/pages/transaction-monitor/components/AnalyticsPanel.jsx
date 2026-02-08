import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsPanel = ({ volumeData, successRates, networkCongestion }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-surface p-3 rounded-lg border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              {entry?.name}: <span className="font-semibold text-foreground">{entry?.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="glass-surface rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Transaction Volume</h3>
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <span className="text-sm text-success font-medium">+12.5%</span>
          </div>
        </div>
        
        <div className="w-full h-64" aria-label="Transaction Volume Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.2)" />
              <XAxis 
                dataKey="time" 
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
                dataKey="volume" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', r: 4 }}
                activeDot={{ r: 6 }}
                name="Volume"
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', r: 4 }}
                activeDot={{ r: 6 }}
                name="Value (USD)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-surface rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Success Rates</h3>
          <div className="w-full h-64" aria-label="Success Rates Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successRates}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.2)" />
                <XAxis 
                  dataKey="network" 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="rate" 
                  fill="var(--color-success)" 
                  radius={[8, 8, 0, 0]}
                  name="Success Rate (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-surface rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Network Congestion</h3>
          <div className="space-y-4">
            {networkCongestion?.map((network) => (
              <div key={network?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="Network" size={16} className="text-foreground" />
                    <span className="text-sm font-medium text-foreground">{network?.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    network?.level === 'Low' ? 'text-success' :
                    network?.level === 'Medium'? 'text-warning' : 'text-error'
                  }`}>
                    {network?.level}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      network?.level === 'Low' ? 'bg-success' :
                      network?.level === 'Medium'? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${network?.percentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Gas: {network?.gasPrice} Gwei</span>
                  <span>TPS: {network?.tps}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
