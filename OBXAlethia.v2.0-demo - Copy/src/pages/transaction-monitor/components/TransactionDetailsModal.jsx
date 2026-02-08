import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionDetailsModal = ({ transaction, onClose, onExpedite, onGenerateAudit }) => {
  if (!transaction) return null;

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-[1000] flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar elevation-modal">
        <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/30 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Transaction Hash</label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                  <span className="text-sm font-mono text-foreground flex-1 truncate">{transaction?.hash}</span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(transaction?.hash)}
                    className="p-1 hover:bg-muted/30 rounded transition-colors"
                  >
                    <Icon name="Copy" size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Status</label>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium ${
                    transaction?.status === 'Confirmed' ? 'bg-success/20 text-success' :
                    transaction?.status === 'Pending' ? 'bg-warning/20 text-warning' :
                    transaction?.status === 'Processing'? 'bg-secondary/20 text-secondary' : 'bg-error/20 text-error'
                  }`}>
                    {transaction?.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {transaction?.confirmations} confirmations
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Amount</label>
                <div className="text-2xl font-bold text-foreground">
                  {formatAmount(transaction?.amount, transaction?.currency)}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Network</label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                  <Icon name="Network" size={16} className="text-secondary" />
                  <span className="text-sm text-foreground">{transaction?.network}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">From</label>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="User" size={16} className="text-foreground" />
                    <span className="text-sm font-medium text-foreground">{transaction?.sender}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">To</label>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="User" size={16} className="text-foreground" />
                    <span className="text-sm font-medium text-foreground">{transaction?.receiver}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">0x8ba1f109551bD432803012645Ac136ddd64DBA72</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Transaction Type</label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                  <Icon name={transaction?.typeIcon} size={16} className="text-secondary" />
                  <span className="text-sm text-foreground">{transaction?.type}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Priority</label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                  <Icon name="AlertCircle" size={16} className={
                    transaction?.priority === 'Critical' ? 'text-error' :
                    transaction?.priority === 'High'? 'text-warning' : 'text-secondary'
                  } />
                  <span className="text-sm text-foreground">{transaction?.priority}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Transaction Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <Icon name="CheckCircle2" size={16} className="text-success" />
                  </div>
                  <div className="w-0.5 h-full bg-border"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-foreground">Transaction Initiated</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction?.timestamp)}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <Icon name="CheckCircle2" size={16} className="text-success" />
                  </div>
                  <div className="w-0.5 h-full bg-border"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-foreground">Blockchain Confirmation</p>
                  <p className="text-xs text-muted-foreground">{formatDate(new Date(transaction.timestamp)?.getTime() + 300000)}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Settlement Processing</p>
                  <p className="text-xs text-muted-foreground">ETA: {transaction?.eta}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Gas & Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Gas Price</p>
                <p className="text-lg font-semibold text-foreground">45 Gwei</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Gas Used</p>
                <p className="text-lg font-semibold text-foreground">21,000</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Transaction Fee</p>
                <p className="text-lg font-semibold text-foreground">$12.50</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-border">
            <Button
              variant="secondary"
              iconName="Download"
              iconPosition="left"
              onClick={() => onGenerateAudit(transaction)}
              fullWidth
            >
              Generate Audit Trail
            </Button>
            {transaction?.status === 'Pending' && (
              <Button
                variant="default"
                iconName="Zap"
                iconPosition="left"
                onClick={() => onExpedite(transaction)}
                fullWidth
              >
                Expedite Transaction
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
