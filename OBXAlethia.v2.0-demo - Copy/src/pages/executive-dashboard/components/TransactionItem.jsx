import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionItem = ({ transaction }) => {
  const getPriorityColor = () => {
    switch (transaction?.priority) {
      case 'critical': return 'var(--color-error)';
      case 'high': return 'var(--color-warning)';
      case 'medium': return 'var(--color-secondary)';
      default: return 'var(--color-muted)';
    }
  };

  const getPriorityIcon = () => {
    switch (transaction?.priority) {
      case 'critical': return 'AlertCircle';
      case 'high': return 'AlertTriangle';
      default: return 'Info';
    }
  };

  return (
    <div className="glass-surface-light rounded-lg p-4 mb-3 hover:elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${getPriorityColor()}20` }}
          >
            <Icon name={getPriorityIcon()} size={16} color={getPriorityColor()} />
          </div>
          <div>
            <h5 className="text-sm font-semibold text-foreground">{transaction?.title}</h5>
            <p className="text-xs text-muted-foreground">{transaction?.type}</p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full" style={{
          background: `${getPriorityColor()}20`,
          color: getPriorityColor()
        }}>
          {transaction?.priority}
        </span>
      </div>
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-semibold text-foreground">{transaction?.amount}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Counterparty</span>
          <span className="font-medium text-foreground">{transaction?.counterparty}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Deadline</span>
          <span className="font-medium text-foreground">{transaction?.deadline}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${transaction?.progress}%`,
              background: getPriorityColor()
            }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{transaction?.progress}%</span>
      </div>
    </div>
  );
};

export default TransactionItem;
