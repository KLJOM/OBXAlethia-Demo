import React from 'react';
import Icon from '../../../components/AppIcon';

const PendingNegotiationsSidebar = ({ negotiations, onApprove, onReject, onEscalate }) => {
  const getApprovalProgress = (approvals, required) => {
    return (approvals / required) * 100;
  };

  const formatTimeRemaining = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diffMs = end - now;
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffHours < 0) return 'Overdue';
    if (diffHours < 24) return `${diffHours}h remaining`;
    return `${Math.floor(diffHours / 24)}d remaining`;
  };

  return (
    <div className="glass-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Pending Negotiations</h3>
        <span className="px-2 py-1 bg-warning/20 text-warning text-xs font-medium rounded-full">
          {negotiations?.length}
        </span>
      </div>
      <div className="space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar">
        {negotiations?.map((negotiation) => (
          <div key={negotiation?.id} className="p-4 bg-muted/20 rounded-lg space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">{negotiation?.title}</h4>
                <p className="text-xs text-muted-foreground">{negotiation?.description}</p>
              </div>
              <Icon 
                name={negotiation?.type === 'approval' ? 'FileCheck' : 'AlertCircle'} 
                size={20} 
                className={negotiation?.type === 'approval' ? 'text-secondary' : 'text-warning'}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Approvals</span>
                <span className="text-foreground font-medium">
                  {negotiation?.approvals}/{negotiation?.requiredApprovals}
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="h-2 bg-secondary rounded-full transition-all"
                  style={{ width: `${getApprovalProgress(negotiation?.approvals, negotiation?.requiredApprovals)}%` }}
                ></div>
              </div>
            </div>

            {negotiation?.signatures && (
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Required Signatures</span>
                <div className="flex flex-wrap gap-2">
                  {negotiation?.signatures?.map((sig, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        sig?.signed 
                          ? 'bg-success/20 text-success' :'bg-muted/30 text-muted-foreground'
                      }`}
                    >
                      <Icon name={sig?.signed ? 'CheckCircle2' : 'Circle'} size={12} />
                      {sig?.party}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {negotiation?.checkpoints && (
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Regulatory Checkpoints</span>
                <div className="space-y-1">
                  {negotiation?.checkpoints?.map((checkpoint, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <Icon 
                        name={checkpoint?.completed ? 'CheckCircle2' : 'Circle'} 
                        size={12} 
                        className={checkpoint?.completed ? 'text-success' : 'text-muted-foreground'}
                      />
                      <span className={checkpoint?.completed ? 'text-success' : 'text-foreground'}>
                        {checkpoint?.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className={`text-xs font-medium ${
                formatTimeRemaining(negotiation?.deadline) === 'Overdue' ?'text-error' :'text-foreground'
              }`}>
                {formatTimeRemaining(negotiation?.deadline)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onApprove(negotiation)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-success/20 text-success hover:bg-success/30 rounded-lg text-xs font-medium transition-colors"
              >
                <Icon name="Check" size={14} />
                Approve
              </button>
              <button
                onClick={() => onReject(negotiation)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-error/20 text-error hover:bg-error/30 rounded-lg text-xs font-medium transition-colors"
              >
                <Icon name="X" size={14} />
                Reject
              </button>
              <button
                onClick={() => onEscalate(negotiation)}
                className="p-2 bg-warning/20 text-warning hover:bg-warning/30 rounded-lg transition-colors"
                aria-label="Escalate"
              >
                <Icon name="ArrowUpCircle" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingNegotiationsSidebar;
