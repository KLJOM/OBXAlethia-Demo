import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceMetrics = ({ metrics }) => {
  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const getStatusBg = (percentage) => {
    if (percentage >= 90) return 'bg-success/10';
    if (percentage >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="glass-surface rounded-lg p-6 elevation-2">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${getStatusBg(metric?.percentage)} flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} className={getStatusColor(metric?.percentage)} />
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBg(metric?.percentage)} ${getStatusColor(metric?.percentage)}`}>
              {metric?.trend > 0 ? '+' : ''}{metric?.trend}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{metric?.value}</h3>
          <p className="text-sm text-muted-foreground mb-3">{metric?.label}</p>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                metric?.percentage >= 90 ? 'bg-success' : metric?.percentage >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${metric?.percentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{metric?.percentage}% compliance rate</p>
        </div>
      ))}
    </div>
  );
};

export default ComplianceMetrics;
