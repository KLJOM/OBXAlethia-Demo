import React from 'react';
import Icon from '../../../components/AppIcon';

const AIAdvisoryCard = ({ advisory }) => {
  const getTypeColor = () => {
    switch (advisory?.type) {
      case 'opportunity': return 'var(--color-success)';
      case 'risk': return 'var(--color-error)';
      case 'optimization': return 'var(--color-secondary)';
      default: return 'var(--color-accent)';
    }
  };

  const getTypeIcon = () => {
    switch (advisory?.type) {
      case 'opportunity': return 'TrendingUp';
      case 'risk': return 'Shield';
      case 'optimization': return 'Zap';
      default: return 'Sparkles';
    }
  };

  return (
    <div className="glass-surface rounded-lg p-4 mb-3 elevation-2 animate-fade-in">
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${getTypeColor()}20` }}
        >
          <Icon name={getTypeIcon()} size={20} color={getTypeColor()} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="text-sm font-semibold text-foreground">{advisory?.title}</h5>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{
              background: `${getTypeColor()}20`,
              color: getTypeColor()
            }}>
              {advisory?.type}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{advisory?.description}</p>
        </div>
      </div>
      {advisory?.metrics && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {advisory?.metrics?.map((metric, index) => (
            <div key={index} className="glass-surface-light rounded p-2">
              <p className="text-xs text-muted-foreground mb-1">{metric?.label}</p>
              <p className="text-sm font-semibold text-foreground">{metric?.value}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="Bot" size={14} color="var(--color-accent)" />
          <span className="text-xs text-muted-foreground">{advisory?.agent}</span>
        </div>
        <button className="text-xs font-medium text-secondary hover:text-accent transition-colors flex items-center gap-1">
          <span>View Details</span>
          <Icon name="ChevronRight" size={14} />
        </button>
      </div>
    </div>
  );
};

export default AIAdvisoryCard;
