import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionTable = ({ transactions, onExpedite, onCancel, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'text-success bg-success/20',
      'Pending': 'text-warning bg-warning/20',
      'Processing': 'text-secondary bg-secondary/20',
      'Failed': 'text-error bg-error/20',
      'Cancelled': 'text-muted-foreground bg-muted/20'
    };
    return colors?.[status] || 'text-muted-foreground bg-muted/20';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Critical': 'text-error',
      'High': 'text-warning',
      'Medium': 'text-secondary',
      'Low': 'text-muted-foreground'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="glass-surface rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Transaction Hash</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Parties</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Priority</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ETA</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr key={transaction?.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Hash" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-mono text-foreground">{transaction?.hash}</span>
                    <button
                      onClick={() => navigator.clipboard?.writeText(transaction?.hash)}
                      className="p-1 hover:bg-muted/30 rounded transition-colors"
                      aria-label="Copy transaction hash"
                    >
                      <Icon name="Copy" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{transaction?.sender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="ArrowLeft" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{transaction?.receiver}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-foreground">
                    {formatAmount(transaction?.amount, transaction?.currency)}
                  </div>
                  <div className="text-xs text-muted-foreground">{transaction?.network}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name={transaction?.typeIcon} size={16} className="text-secondary" />
                    <span className="text-sm text-foreground">{transaction?.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                    {transaction?.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name="AlertCircle" size={16} className={getPriorityColor(transaction?.priority)} />
                    <span className={`text-sm font-medium ${getPriorityColor(transaction?.priority)}`}>
                      {transaction?.priority}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{transaction?.eta}</div>
                  <div className="text-xs text-muted-foreground">{transaction?.confirmations} confirmations</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetails(transaction)}
                      className="p-2 hover:bg-muted/30 rounded transition-colors"
                      aria-label="View details"
                    >
                      <Icon name="Eye" size={16} className="text-foreground" />
                    </button>
                    {transaction?.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => onExpedite(transaction)}
                          className="p-2 hover:bg-success/20 rounded transition-colors"
                          aria-label="Expedite transaction"
                        >
                          <Icon name="Zap" size={16} className="text-success" />
                        </button>
                        <button
                          onClick={() => onCancel(transaction)}
                          className="p-2 hover:bg-error/20 rounded transition-colors"
                          aria-label="Cancel transaction"
                        >
                          <Icon name="X" size={16} className="text-error" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
