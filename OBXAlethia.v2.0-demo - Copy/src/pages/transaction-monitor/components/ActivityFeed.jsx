import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'confirmation': 'CheckCircle2',
      'settlement': 'DollarSign',
      'execution': 'Play',
      'approval': 'ThumbsUp',
      'rejection': 'ThumbsDown',
      'alert': 'AlertTriangle'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'confirmation': 'text-success bg-success/20',
      'settlement': 'text-secondary bg-secondary/20',
      'execution': 'text-accent bg-accent/20',
      'approval': 'text-success bg-success/20',
      'rejection': 'text-error bg-error/20',
      'alert': 'text-warning bg-warning/20'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted/20';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="glass-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Real-Time Activity Feed</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success">Live</span>
        </div>
      </div>
      <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex gap-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimestamp(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
              
              {activity?.details && (
                <div className="flex flex-wrap gap-2">
                  {activity?.details?.map((detail, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-muted/30 rounded text-xs text-foreground">
                      <Icon name={detail?.icon} size={12} />
                      {detail?.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;