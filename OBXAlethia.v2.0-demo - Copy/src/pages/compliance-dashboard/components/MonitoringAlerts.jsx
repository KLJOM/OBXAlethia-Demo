import React from 'react';
import Icon from '../../../components/AppIcon';

const MonitoringAlerts = ({ alerts }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return { icon: 'AlertCircle', color: 'text-error', bg: 'bg-error/10', border: 'border-error/30' };
      case 'high':
        return { icon: 'AlertTriangle', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' };
      case 'medium':
        return { icon: 'Info', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30' };
      default:
        return { icon: 'CheckCircle2', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' };
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="glass-surface rounded-lg p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Monitoring Alerts</h2>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-lg text-xs font-medium bg-error/20 text-error">
            {alerts?.filter(a => a?.severity === 'critical')?.length} Critical
          </button>
          <button className="px-3 py-1 rounded-lg text-xs font-medium bg-warning/20 text-warning">
            {alerts?.filter(a => a?.severity === 'high')?.length} High
          </button>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => {
          const config = getSeverityConfig(alert?.severity);
          return (
            <div key={alert?.id} className={`p-4 glass-surface-light rounded-lg border ${config?.border} hover:elevation-1 transition-all`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${config?.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={config?.icon} size={20} className={config?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{alert?.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{getTimeAgo(alert?.timestamp)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{alert?.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-muted/50 text-muted-foreground">
                      {alert?.category}
                    </span>
                    {alert?.requiresAction && (
                      <button className="text-xs font-medium text-secondary hover:text-secondary/80 transition-colors">
                        Take Action →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonitoringAlerts;