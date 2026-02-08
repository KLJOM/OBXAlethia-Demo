import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceStatus = ({ items }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'var(--color-success)';
      case 'pending': return 'var(--color-warning)';
      case 'overdue': return 'var(--color-error)';
      default: return 'var(--color-muted)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return 'CheckCircle2';
      case 'pending': return 'Clock';
      case 'overdue': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-3">
      {items?.map((item, index) => (
        <div key={index} className="glass-surface-light rounded-lg p-4 hover:elevation-2 transition-all duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${getStatusColor(item?.status)}20` }}
              >
                <Icon name={getStatusIcon(item?.status)} size={16} color={getStatusColor(item?.status)} />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-foreground">{item?.requirement}</h5>
                <p className="text-xs text-muted-foreground">{item?.category}</p>
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full" style={{
              background: `${getStatusColor(item?.status)}20`,
              color: getStatusColor(item?.status)
            }}>
              {item?.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Due Date</span>
            <span className="font-medium text-foreground">{item?.dueDate}</span>
          </div>

          {item?.status === 'pending' && (
            <div className="mt-3 pt-3 border-t border-border">
              <button className="text-xs font-medium text-secondary hover:text-accent transition-colors flex items-center gap-1">
                <Icon name="FileText" size={12} />
                <span>Submit Documentation</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplianceStatus;