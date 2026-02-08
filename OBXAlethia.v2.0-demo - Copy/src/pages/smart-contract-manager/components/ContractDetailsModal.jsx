import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContractDetailsModal = ({ contract, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'parties', label: 'Parties', icon: 'Users' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'compliance', label: 'Compliance', icon: 'Shield' }
  ];

  const timelineEvents = [
    {
      date: '2025-12-03 14:30',
      event: 'Contract Deployed',
      description: 'Smart contract successfully deployed to Ethereum mainnet',
      status: 'completed',
      txHash: contract?.txHash
    },
    {
      date: '2025-12-03 15:45',
      event: 'First Signature Received',
      description: 'Party A (Investor) signed the contract',
      status: 'completed',
      signer: 'Goldman Sachs Ventures'
    },
    {
      date: '2025-12-03 16:20',
      event: 'Second Signature Received',
      description: 'Party B (Company) signed the contract',
      status: 'completed',
      signer: 'TechCorp Inc.'
    },
    {
      date: 'Pending',
      event: 'Awaiting Final Signature',
      description: 'Party C (Legal Counsel) signature required',
      status: 'pending',
      signer: 'Wilson & Partners LLP'
    }
  ];

  const complianceChecks = [
    { name: 'SEC Regulation D', status: 'passed', date: '2025-12-03' },
    { name: 'KYC/AML Verification', status: 'passed', date: '2025-12-03' },
    { name: 'Accredited Investor Status', status: 'passed', date: '2025-12-03' },
    { name: 'Anti-Money Laundering', status: 'passed', date: '2025-12-03' },
    { name: 'GDPR Compliance', status: 'passed', date: '2025-12-03' }
  ];

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-[1000] flex items-center justify-center p-6 animate-fade-in">
      <div className="glass-surface rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Icon name={contract?.icon} size={24} color="var(--color-secondary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{contract?.name}</h2>
              <p className="text-sm text-muted-foreground">{contract?.type}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted/20 rounded-lg transition-colors">
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-secondary border-b-2 border-secondary bg-secondary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/5'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              {tab?.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-surface-light rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Calendar" size={18} color="var(--color-accent)" />
                    <span className="text-sm text-muted-foreground">Deployed Date</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{contract?.deployedAt}</p>
                </div>
                <div className="glass-surface-light rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="TrendingUp" size={18} color="var(--color-accent)" />
                    <span className="text-sm text-muted-foreground">Progress</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{contract?.progress}%</p>
                </div>
              </div>

              <div className="glass-surface-light rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Link" size={18} />
                  Blockchain Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Transaction Hash:</span>
                    <a 
                      href={contract?.blockchainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:text-accent transition-colors font-mono"
                    >
                      {contract?.txHash}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network:</span>
                    <span className="text-sm text-foreground">Ethereum Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gas Used:</span>
                    <span className="text-sm text-foreground">245,892 Gwei</span>
                  </div>
                </div>
              </div>

              <div className="glass-surface-light rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="FileText" size={18} />
                  Contract Terms
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Investment Amount: $5,000,000 USD</p>
                  <p>• Equity Stake: 15% Series A Preferred Stock</p>
                  <p>• Vesting Period: 4 years with 1-year cliff</p>
                  <p>• Board Seat: 1 observer seat granted</p>
                  <p>• Liquidation Preference: 1x non-participating</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parties' && (
            <div className="space-y-4">
              {contract?.parties?.map((party, index) => (
                <div key={index} className="glass-surface-light rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-lg font-semibold text-white">
                      {party?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground">{party}</h4>
                      <p className="text-xs text-muted-foreground">Wallet: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium flex items-center gap-1">
                        <Icon name="CheckCircle" size={14} />
                        Signed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {timelineEvents?.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event?.status === 'completed' ? 'bg-success/20' : 'bg-warning/20'
                    }`}>
                      <Icon 
                        name={event?.status === 'completed' ? 'CheckCircle' : 'Clock'} 
                        size={20} 
                        color={event?.status === 'completed' ? 'var(--color-success)' : 'var(--color-warning)'}
                      />
                    </div>
                    {index < timelineEvents?.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="glass-surface-light rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-foreground">{event?.event}</h4>
                        <span className="text-xs text-muted-foreground">{event?.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                      {event?.signer && (
                        <p className="text-xs text-accent">Signer: {event?.signer}</p>
                      )}
                      {event?.txHash && (
                        <a 
                          href={contract?.blockchainUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-secondary hover:text-accent transition-colors font-mono"
                        >
                          View Transaction →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <div className="glass-surface-light rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Icon name="ShieldCheck" size={24} color="var(--color-success)" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">All Compliance Checks Passed</h3>
                    <p className="text-xs text-muted-foreground">Contract meets all regulatory requirements</p>
                  </div>
                </div>
              </div>

              {complianceChecks?.map((check, index) => (
                <div key={index} className="glass-surface-light rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{check?.name}</h4>
                        <p className="text-xs text-muted-foreground">Verified on {check?.date}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                      Passed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailsModal;
