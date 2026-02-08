import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="glass-surface rounded-lg p-6 elevation-2 interactive-scale cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ background: `${iconColor}20` }}
          >
            <Icon name={icon} size={24} color={iconColor} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
          <span className={`text-sm font-medium ${getChangeColor()}`}>{change}</span>
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {trend?.map((height, index) => (
                <div
                  key={index}
                  className="w-1 rounded-full bg-secondary"
                  style={{ height: `${height}px`, opacity: 0.3 + (index * 0.15) }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;