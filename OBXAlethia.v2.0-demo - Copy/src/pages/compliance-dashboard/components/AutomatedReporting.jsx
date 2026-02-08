import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AutomatedReporting = ({ reports }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', className: 'bg-success/20 text-success' };
      case 'pending':
        return { label: 'Pending', className: 'bg-warning/20 text-warning' };
      case 'overdue':
        return { label: 'Overdue', className: 'bg-error/20 text-error' };
      default:
        return { label: 'Scheduled', className: 'bg-secondary/20 text-secondary' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="glass-surface rounded-lg p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Automated Reporting</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Schedule Report
        </Button>
      </div>
      <div className="space-y-3">
        {reports?.map((report) => {
          const statusBadge = getStatusBadge(report?.status);
          return (
            <div key={report?.id} className="flex items-center justify-between p-4 glass-surface-light rounded-lg hover:elevation-1 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{report?.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      Due: {formatDate(report?.dueDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Building2" size={12} />
                      {report?.jurisdiction}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge?.className}`}>
                  {statusBadge?.label}
                </span>
                <button className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors">
                  <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutomatedReporting;
