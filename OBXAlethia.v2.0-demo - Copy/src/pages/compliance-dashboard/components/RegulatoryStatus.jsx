import React from 'react';
import Icon from '../../../components/AppIcon';

const RegulatoryStatus = ({ jurisdictions }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return { icon: 'CheckCircle2', color: 'text-success' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'critical':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'Clock', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="glass-surface rounded-lg p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Regulatory Status</h2>
        <button className="text-sm text-secondary hover:text-secondary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {jurisdictions?.map((jurisdiction) => {
          const statusConfig = getStatusIcon(jurisdiction?.status);
          return (
            <div key={jurisdiction?.id} className="flex items-center justify-between p-4 glass-surface-light rounded-lg hover:elevation-1 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-lg ${jurisdiction?.status === 'compliant' ? 'bg-success/10' : jurisdiction?.status === 'warning' ? 'bg-warning/10' : 'bg-error/10'} flex items-center justify-center`}>
                  <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{jurisdiction?.name}</h3>
                  <p className="text-xs text-muted-foreground">{jurisdiction?.requirements} requirements</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{jurisdiction?.score}%</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegulatoryStatus;