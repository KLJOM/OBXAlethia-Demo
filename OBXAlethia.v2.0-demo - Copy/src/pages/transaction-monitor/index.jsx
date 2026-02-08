import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TransactionTable from './components/TransactionTable';
import ActivityFeed from './components/ActivityFeed';
import AnalyticsPanel from './components/AnalyticsPanel';
import FilterPanel from './components/FilterPanel';
import PendingNegotiationsSidebar from './components/PendingNegotiationsSidebar';
import TransactionDetailsModal from './components/TransactionDetailsModal';

const TransactionMonitor = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeView, setActiveView] = useState('table');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const mockTransactions = [
    {
      id: 1,
      hash: "0x8f3c...a2d9",
      sender: "Blackstone Capital",
      receiver: "Renaissance Art Fund",
      amount: 2500000,
      currency: "USD",
      type: "Smart Contract Execution",
      typeIcon: "FileCode",
      status: "Confirmed",
      priority: "High",
      network: "Ethereum",
      eta: "Completed",
      confirmations: 24,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      hash: "0x4b7e...f1c8",
      sender: "Goldman Sachs PE",
      receiver: "Vineyard Holdings LLC",
      amount: 8750000,
      currency: "USD",
      type: "Cross-Border Payment",
      typeIcon: "Globe",
      status: "Processing",
      priority: "Critical",
      network: "SWIFT",
      eta: "2h 15m",
      confirmations: 12,
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      hash: "0x9a2c...d4e7",
      sender: "KKR Infrastructure",
      receiver: "Mining Operations Corp",
      amount: 15000000,
      currency: "USD",
      type: "Token Transfer",
      typeIcon: "ArrowLeftRight",
      status: "Pending",
      priority: "High",
      network: "Polygon",
      eta: "45m",
      confirmations: 6,
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 4,
      hash: "0x6d1f...b3a5",
      sender: "Carlyle Real Estate",
      receiver: "Commercial Property Trust",
      amount: 5200000,
      currency: "USD",
      type: "Payment Settlement",
      typeIcon: "DollarSign",
      status: "Confirmed",
      priority: "Medium",
      network: "BSC",
      eta: "Completed",
      confirmations: 18,
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 5,
      hash: "0x2e8a...c9f2",
      sender: "Apollo Education Fund",
      receiver: "University Endowment",
      amount: 3800000,
      currency: "USD",
      type: "Smart Contract",
      typeIcon: "FileCode",
      status: "Processing",
      priority: "Medium",
      network: "Avalanche",
      eta: "1h 30m",
      confirmations: 8,
      timestamp: new Date(Date.now() - 1200000)
    },
    {
      id: 6,
      hash: "0x7c4b...e6d1",
      sender: "Sequoia Ventures",
      receiver: "AgriTech Innovations",
      amount: 1250000,
      currency: "USD",
      type: "Token Swap",
      typeIcon: "Repeat",
      status: "Failed",
      priority: "Low",
      network: "Ethereum",
      eta: "Failed",
      confirmations: 0,
      timestamp: new Date(Date.now() - 600000)
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: "confirmation",
      title: "Transaction Confirmed",
      description: "Smart contract execution between Blackstone Capital and Renaissance Art Fund completed successfully",
      timestamp: new Date(Date.now() - 180000),
      details: [
        { icon: "Hash", label: "0x8f3c...a2d9" },
        { icon: "CheckCircle2", label: "24 confirmations" }
      ]
    },
    {
      id: 2,
      type: "settlement",
      title: "Payment Settlement Initiated",
      description: "Cross-border payment of $8.75M from Goldman Sachs PE to Vineyard Holdings LLC",
      timestamp: new Date(Date.now() - 300000),
      details: [
        { icon: "Globe", label: "SWIFT Network" },
        { icon: "Clock", label: "ETA: 2h 15m" }
      ]
    },
    {
      id: 3,
      type: "execution",
      title: "Smart Contract Executed",
      description: "Mining operations contract deployed on Polygon network",
      timestamp: new Date(Date.now() - 450000),
      details: [
        { icon: "Network", label: "Polygon" },
        { icon: "DollarSign", label: "$15M" }
      ]
    },
    {
      id: 4,
      type: "approval",
      title: "Multi-Party Approval Received",
      description: "Real estate transaction approved by 3 of 5 required parties",
      timestamp: new Date(Date.now() - 600000),
      details: [
        { icon: "Users", label: "3/5 Approved" },
        { icon: "FileCheck", label: "Pending 2" }
      ]
    },
    {
      id: 5,
      type: "alert",
      title: "Network Congestion Alert",
      description: "Ethereum network experiencing high gas prices (120 Gwei)",
      timestamp: new Date(Date.now() - 750000),
      details: [
        { icon: "AlertTriangle", label: "High Priority" },
        { icon: "TrendingUp", label: "+45% Gas" }
      ]
    },
    {
      id: 6,
      type: "rejection",
      title: "Transaction Failed",
      description: "Token swap failed due to insufficient liquidity",
      timestamp: new Date(Date.now() - 900000),
      details: [
        { icon: "X", label: "Failed" },
        { icon: "RefreshCw", label: "Retry Available" }
      ]
    }
  ];

  const mockVolumeData = [
    { time: "00:00", volume: 45, value: 12500000 },
    { time: "04:00", volume: 62, value: 18750000 },
    { time: "08:00", volume: 89, value: 25300000 },
    { time: "12:00", volume: 124, value: 34200000 },
    { time: "16:00", volume: 98, value: 28900000 },
    { time: "20:00", volume: 76, value: 21400000 }
  ];

  const mockSuccessRates = [
    { network: "Ethereum", rate: 98.5 },
    { network: "Polygon", rate: 99.2 },
    { network: "BSC", rate: 97.8 },
    { network: "Avalanche", rate: 98.9 },
    { network: "SWIFT", rate: 99.7 }
  ];

  const mockNetworkCongestion = [
    { id: 1, name: "Ethereum", level: "High", percentage: 85, gasPrice: 120, tps: 15 },
    { id: 2, name: "Polygon", level: "Low", percentage: 35, gasPrice: 45, tps: 65 },
    { id: 3, name: "BSC", level: "Medium", percentage: 60, gasPrice: 8, tps: 55 },
    { id: 4, name: "Avalanche", level: "Low", percentage: 40, gasPrice: 25, tps: 4500 }
  ];

  const mockNegotiations = [
    {
      id: 1,
      title: "Real Estate Acquisition - Manhattan Tower",
      description: "Multi-party approval required for $45M commercial property purchase",
      type: "approval",
      approvals: 3,
      requiredApprovals: 5,
      deadline: new Date(Date.now() + 86400000),
      signatures: [
        { party: "Carlyle Group", signed: true },
        { party: "Property Trust", signed: true },
        { party: "Legal Counsel", signed: true },
        { party: "Regulatory Board", signed: false },
        { party: "Tax Authority", signed: false }
      ],
      checkpoints: [
        { name: "KYC Verification", completed: true },
        { name: "AML Screening", completed: true },
        { name: "Title Search", completed: false },
        { name: "Environmental Review", completed: false }
      ]
    },
    {
      id: 2,
      title: "Mining Rights Transfer - Colorado Operations",
      description: "Regulatory compliance review for $28M mining asset transfer",
      type: "compliance",
      approvals: 2,
      requiredApprovals: 4,
      deadline: new Date(Date.now() + 172800000),
      signatures: [
        { party: "KKR Infrastructure", signed: true },
        { party: "Mining Corp", signed: true },
        { party: "EPA Compliance", signed: false },
        { party: "State Authority", signed: false }
      ],
      checkpoints: [
        { name: "Environmental Impact", completed: true },
        { name: "Safety Compliance", completed: false },
        { name: "Permit Verification", completed: false }
      ]
    },
    {
      id: 3,
      title: "Art Collection Tokenization",
      description: "Smart contract deployment for $12M Renaissance art portfolio",
      type: "approval",
      approvals: 4,
      requiredApprovals: 6,
      deadline: new Date(Date.now() + 43200000),
      signatures: [
        { party: "Sotheby\'s", signed: true },
        { party: "Art Fund", signed: true },
        { party: "Blockchain Auditor", signed: true },
        { party: "Insurance Provider", signed: true },
        { party: "Custodian Bank", signed: false },
        { party: "Legal Team", signed: false }
      ],
      checkpoints: [
        { name: "Artwork Authentication", completed: true },
        { name: "Valuation Report", completed: true },
        { name: "Smart Contract Audit", completed: false }
      ]
    }
  ];

  useEffect(() => {
    setFilteredTransactions(mockTransactions);
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...mockTransactions];

    if (filters?.type) {
      filtered = filtered?.filter(t => t?.type?.toLowerCase()?.includes(filters?.type?.toLowerCase()));
    }
    if (filters?.network) {
      filtered = filtered?.filter(t => t?.network?.toLowerCase() === filters?.network?.toLowerCase());
    }
    if (filters?.status) {
      filtered = filtered?.filter(t => t?.status?.toLowerCase() === filters?.status?.toLowerCase());
    }

    setFilteredTransactions(filtered);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTransactions(mockTransactions);
      return;
    }

    let filtered = mockTransactions?.filter(t =>
      t?.hash?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      t?.sender?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      t?.receiver?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    setFilteredTransactions(filtered);
  };

  const handleExpedite = (transaction) => {
    console.log('Expediting transaction:', transaction);
    alert(`Expediting transaction ${transaction?.hash}. Additional gas fees will be applied.`);
  };

  const handleCancel = (transaction) => {
    console.log('Cancelling transaction:', transaction);
    if (window.confirm(`Are you sure you want to cancel transaction ${transaction?.hash}?`)) {
      alert('Transaction cancellation initiated. This may take a few minutes.');
    }
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleGenerateAudit = (transaction) => {
    console.log('Generating audit trail for:', transaction);
    alert(`Audit trail report for transaction ${transaction?.hash} will be generated and sent to your email.`);
  };

  const handleApproveNegotiation = (negotiation) => {
    console.log('Approving negotiation:', negotiation);
    alert(`Approval recorded for ${negotiation?.title}`);
  };

  const handleRejectNegotiation = (negotiation) => {
    console.log('Rejecting negotiation:', negotiation);
    if (window.confirm(`Are you sure you want to reject ${negotiation?.title}?`)) {
      alert('Rejection recorded. All parties will be notified.');
    }
  };

  const handleEscalateNegotiation = (negotiation) => {
    console.log('Escalating negotiation:', negotiation);
    alert(`${negotiation?.title} has been escalated to senior management.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Transaction Monitor</h1>
              <p className="text-muted-foreground">
                Real-time oversight of blockchain transactions and multi-party financial operations
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => alert('Exporting transaction data...')}
              >
                Export Data
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => alert('Initiating new transaction...')}
              >
                New Transaction
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="glass-surface rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Volume (24h)</span>
                <Icon name="TrendingUp" size={20} className="text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">$142.5M</div>
              <div className="flex items-center gap-1 text-xs text-success">
                <Icon name="ArrowUp" size={12} />
                <span>+12.5%</span>
              </div>
            </div>

            <div className="glass-surface rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Transactions</span>
                <Icon name="Activity" size={20} className="text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">247</div>
              <div className="flex items-center gap-1 text-xs text-secondary">
                <Icon name="Clock" size={12} />
                <span>18 pending</span>
              </div>
            </div>

            <div className="glass-surface rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <Icon name="CheckCircle2" size={20} className="text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">98.7%</div>
              <div className="flex items-center gap-1 text-xs text-success">
                <Icon name="TrendingUp" size={12} />
                <span>+0.3%</span>
              </div>
            </div>

            <div className="glass-surface rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg. Settlement</span>
                <Icon name="Clock" size={20} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">2.4h</div>
              <div className="flex items-center gap-1 text-xs text-accent">
                <Icon name="ArrowDown" size={12} />
                <span>-15 min</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 glass-surface rounded-lg p-2">
            <button
              onClick={() => setActiveView('table')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'table' ?'bg-secondary/20 text-secondary' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              <Icon name="Table" size={18} />
              Table View
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'analytics' ?'bg-secondary/20 text-secondary' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              <Icon name="BarChart3" size={18} />
              Analytics
            </button>
            <button
              onClick={() => setActiveView('activity')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'activity' ?'bg-secondary/20 text-secondary' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              <Icon name="Activity" size={18} />
              Activity Feed
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-1">
              <FilterPanel
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
              />
            </div>

            <div className="xl:col-span-2 space-y-6">
              {activeView === 'table' && (
                <TransactionTable
                  transactions={filteredTransactions}
                  onExpedite={handleExpedite}
                  onCancel={handleCancel}
                  onViewDetails={handleViewDetails}
                />
              )}

              {activeView === 'analytics' && (
                <AnalyticsPanel
                  volumeData={mockVolumeData}
                  successRates={mockSuccessRates}
                  networkCongestion={mockNetworkCongestion}
                />
              )}

              {activeView === 'activity' && (
                <ActivityFeed activities={mockActivities} />
              )}
            </div>

            <div className="xl:col-span-1">
              <PendingNegotiationsSidebar
                negotiations={mockNegotiations}
                onApprove={handleApproveNegotiation}
                onReject={handleRejectNegotiation}
                onEscalate={handleEscalateNegotiation}
              />
            </div>
          </div>
        </div>
      </main>

      {showDetailsModal && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={() => setShowDetailsModal(false)}
          onExpedite={handleExpedite}
          onGenerateAudit={handleGenerateAudit}
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default TransactionMonitor;