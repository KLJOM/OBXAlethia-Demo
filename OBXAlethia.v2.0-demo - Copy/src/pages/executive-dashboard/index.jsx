import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ContractCube from './components/ContractCube';
import TransactionItem from './components/TransactionItem';
import AIAdvisoryCard from './components/AIAdvisoryCard';
import PortfolioChart from './components/PortfolioChart';
import ComplianceStatus from './components/ComplianceStatus.jsx';
import QuickActionButton from './components/QuickActionButton';
import Icon from '../../components/AppIcon';

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  const [selectedContract, setSelectedContract] = useState(null);
  const [chartType, setChartType] = useState('area');

  const metrics = [
    {
      title: "Portfolio Valuation",
      value: "$847.2M",
      change: "+12.4% vs last quarter",
      changeType: "positive",
      icon: "TrendingUp",
      iconColor: "var(--color-success)",
      trend: [8, 12, 10, 15, 18, 16, 20]
    },
    {
      title: "Active Smart Contracts",
      value: "24",
      change: "+3 this month",
      changeType: "positive",
      icon: "FileText",
      iconColor: "var(--color-secondary)",
      trend: [10, 12, 11, 14, 16, 15, 18]
    },
    {
      title: "Pending Transactions",
      value: "7",
      change: "2 require attention",
      changeType: "neutral",
      icon: "ArrowLeftRight",
      iconColor: "var(--color-warning)",
      trend: [15, 13, 14, 12, 10, 11, 9]
    },
    {
      title: "AI Advisory Alerts",
      value: "5",
      change: "3 opportunities identified",
      changeType: "positive",
      icon: "Sparkles",
      iconColor: "var(--color-accent)",
      trend: [6, 8, 7, 10, 12, 11, 14]
    }
  ];

  const contracts = [
    {
      id: 1,
      name: "Vista Equity Fund IV",
      industry: "Private Equity",
      status: "active",
      value: "$125M",
      parties: "4",
      deployedDate: "Nov 15, 2025",
      aiAlert: "Capital call scheduled Dec 10"
    },
    {
      id: 2,
      name: "Manhattan Tower Acquisition",
      industry: "Real Estate",
      status: "pending",
      value: "$89M",
      parties: "6",
      deployedDate: "Nov 28, 2025",
      aiAlert: "Due diligence phase 2 complete"
    },
    {
      id: 3,
      name: "Copper Mine Joint Venture",
      industry: "Mining",
      status: "active",
      value: "$210M",
      parties: "3",
      deployedDate: "Oct 22, 2025",
      aiAlert: null
    },
    {
      id: 4,
      name: "Napa Valley Vineyard",
      industry: "Agriculture",
      status: "review",
      value: "$45M",
      parties: "5",
      deployedDate: "Dec 01, 2025",
      aiAlert: "Environmental compliance review needed"
    },
    {
      id: 5,
      name: "Contemporary Art Collection",
      industry: "Art",
      status: "active",
      value: "$32M",
      parties: "2",
      deployedDate: "Nov 10, 2025",
      aiAlert: null
    },
    {
      id: 6,
      name: "Tech Startup Series B",
      industry: "Private Equity",
      status: "pending",
      value: "$67M",
      parties: "8",
      deployedDate: "Nov 30, 2025",
      aiAlert: "Board approval pending"
    }
  ];

  const transactions = [
    {
      title: "Capital Distribution - Vista Fund",
      type: "Distribution",
      priority: "high",
      amount: "$12.5M",
      counterparty: "Vista Equity Partners",
      deadline: "Dec 10, 2025",
      progress: 75
    },
    {
      title: "Property Acquisition Payment",
      type: "Payment",
      priority: "critical",
      amount: "$89M",
      counterparty: "Manhattan Realty Group",
      deadline: "Dec 05, 2025",
      progress: 45
    },
    {
      title: "Mining Royalty Settlement",
      type: "Settlement",
      priority: "medium",
      amount: "$3.2M",
      counterparty: "Copper Mining Corp",
      deadline: "Dec 15, 2025",
      progress: 90
    },
    {
      title: "Art Auction Payment",
      type: "Payment",
      priority: "high",
      amount: "$8.7M",
      counterparty: "Christie\'s Auction House",
      deadline: "Dec 08, 2025",
      progress: 60
    }
  ];

  const aiAdvisories = [
    {
      title: "Capital Structure Optimization",
      type: "optimization",
      description: "Analysis suggests refinancing Manhattan Tower debt could reduce interest costs by $2.1M annually with current market rates.",
      agent: "Capital Advisory AI",
      metrics: [
        { label: "Potential Savings", value: "$2.1M/year" },
        { label: "Implementation Time", value: "45 days" }
      ]
    },
    {
      title: "Market Opportunity Detected",
      type: "opportunity",
      description: "Copper prices trending upward. Consider accelerating production timeline for joint venture to capitalize on 18% price increase.",
      agent: "Market Intelligence AI",
      metrics: [
        { label: "Price Increase", value: "+18%" },
        { label: "Revenue Impact", value: "+$12.4M" }
      ]
    },
    {
      title: "Risk Assessment Alert",
      type: "risk",
      description: "Regulatory changes in agricultural sector may impact Napa Valley operations. Recommend compliance review within 30 days.",
      agent: "Risk Management AI",
      metrics: [
        { label: "Risk Level", value: "Medium" },
        { label: "Action Required", value: "30 days" }
      ]
    }
  ];

  const portfolioData = [
    { month: "Jul", privateEquity: 285, realEstate: 198, mining: 156 },
    { month: "Aug", privateEquity: 298, realEstate: 210, mining: 168 },
    { month: "Sep", privateEquity: 312, realEstate: 225, mining: 175 },
    { month: "Oct", privateEquity: 328, realEstate: 238, mining: 182 },
    { month: "Nov", privateEquity: 345, realEstate: 252, mining: 195 },
    { month: "Dec", privateEquity: 362, realEstate: 268, mining: 208 }
  ];

  const complianceItems = [
    {
      requirement: "SEC Form D Filing",
      category: "Securities Regulation",
      status: "compliant",
      dueDate: "Dec 31, 2025"
    },
    {
      requirement: "KYC Documentation Update",
      category: "AML Compliance",
      status: "pending",
      dueDate: "Dec 15, 2025"
    },
    {
      requirement: "Environmental Impact Report",
      category: "ESG Compliance",
      status: "overdue",
      dueDate: "Nov 30, 2025"
    },
    {
      requirement: "Annual Audit Submission",
      category: "Financial Reporting",
      status: "compliant",
      dueDate: "Jan 15, 2026"
    }
  ];

  const quickActions = [
    {
      icon: "Plus",
      label: "Deploy Contract",
      color: "var(--color-secondary)",
      action: () => navigate('/smart-contract-manager')
    },
    {
      icon: "Users",
      label: "Virtual Boardroom",
      color: "var(--color-accent)",
      action: () => navigate('/virtual-boardroom')
    },
    {
      icon: "FileText",
      label: "Generate Report",
      color: "var(--color-success)",
      action: () => navigate('/portfolio-analytics')
    },
    {
      icon: "Shield",
      label: "Compliance Check",
      color: "var(--color-warning)",
      action: () => navigate('/compliance-dashboard')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('WebSocket: Real-time data update simulation');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleContractClick = (contract) => {
    setSelectedContract(contract);
    navigate('/smart-contract-manager', { state: { contractId: contract?.id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Executive Dashboard</h1>
              <div className="flex items-center gap-2">
                <div className="glass-surface rounded-lg px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live Updates</span>
                </div>
                <button className="glass-surface rounded-lg p-2 hover:elevation-2 transition-all">
                  <Icon name="Settings" size={20} color="var(--color-muted-foreground)" />
                </button>
              </div>
            </div>
            <p className="text-muted-foreground">Comprehensive oversight of multi-industry portfolios and smart contracts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-surface rounded-lg p-6 elevation-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Portfolio Performance</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setChartType('line')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        chartType === 'line' ?'bg-secondary text-secondary-foreground' :'glass-surface-light text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Line
                    </button>
                    <button
                      onClick={() => setChartType('area')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        chartType === 'area' ?'bg-secondary text-secondary-foreground' :'glass-surface-light text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Area
                    </button>
                  </div>
                </div>
                <PortfolioChart data={portfolioData} type={chartType} />
              </div>

              <div className="glass-surface rounded-lg p-6 elevation-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Active Smart Contracts</h2>
                  <button 
                    onClick={() => navigate('/smart-contract-manager')}
                    className="text-sm font-medium text-secondary hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <span>View All</span>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contracts?.map((contract) => (
                    <ContractCube 
                      key={contract?.id} 
                      contract={contract} 
                      onClick={handleContractClick}
                    />
                  ))}
                </div>
              </div>

              <div className="glass-surface rounded-lg p-6 elevation-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions?.map((action, index) => (
                    <QuickActionButton key={index} {...action} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-surface rounded-lg p-6 elevation-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Pending Transactions</h2>
                  <button 
                    onClick={() => navigate('/transaction-monitor')}
                    className="text-sm font-medium text-secondary hover:text-accent transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {transactions?.map((transaction, index) => (
                    <TransactionItem key={index} transaction={transaction} />
                  ))}
                </div>
              </div>

              <div className="glass-surface rounded-lg p-6 elevation-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">AI Advisory</h2>
                  <div className="flex items-center gap-1">
                    <Icon name="Sparkles" size={16} color="var(--color-accent)" />
                    <span className="text-xs text-accent font-medium">Active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {aiAdvisories?.map((advisory, index) => (
                    <AIAdvisoryCard key={index} advisory={advisory} />
                  ))}
                </div>
              </div>

              <div className="glass-surface rounded-lg p-6 elevation-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Compliance Status</h2>
                  <button 
                    onClick={() => navigate('/compliance-dashboard')}
                    className="text-sm font-medium text-secondary hover:text-accent transition-colors"
                  >
                    View All
                  </button>
                </div>
                <ComplianceStatus items={complianceItems} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveDashboard;
