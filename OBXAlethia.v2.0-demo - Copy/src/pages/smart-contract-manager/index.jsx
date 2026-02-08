import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import ContractTemplateCard from './components/ContractTemplateCard';
import DeploymentWorkspace from './components/DeploymentWorkspace';
import ActiveContractsTable from './components/ActiveContractsTable';
import ContractDetailsModal from './components/ContractDetailsModal';
import AIOptimizationPanel from './components/AIOptimizationPanel';

const SmartContractManager = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeployment, setShowDeployment] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [viewMode, setViewMode] = useState('templates');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'private-equity', label: 'Private Equity' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'mining-energy', label: 'Mining & Energy' },
    { value: 'art-collectibles', label: 'Art & Collectibles' },
    { value: 'education', label: 'Education' }
  ];

  const contractTemplates = [
    {
      id: 1,
      name: 'Series A Investment Agreement',
      category: 'Private Equity',
      icon: 'TrendingUp',
      description: 'Comprehensive equity investment contract with vesting schedules, liquidation preferences, and board representation terms for Series A funding rounds',
      complexity: 'High',
      deployCost: '0.0245 ETH',
      avgTime: '3-5 min',
      compliance: ['SEC Reg D', 'Accredited Investor', 'KYC/AML']
    },
    {
      id: 2,
      name: 'Commercial Property Lease',
      category: 'Real Estate',
      icon: 'Building2',
      description: 'Multi-party commercial real estate lease agreement with automated rent collection, maintenance escrow, and tenant improvement allowances',
      complexity: 'Medium',
      deployCost: '0.0189 ETH',
      avgTime: '2-3 min',
      compliance: ['Property Law', 'Zoning', 'Insurance']
    },
    {
      id: 3,
      name: 'Agricultural Futures Contract',
      category: 'Agriculture',
      icon: 'Wheat',
      description: 'Commodity futures agreement for agricultural products with weather derivatives, crop insurance integration, and automated settlement',
      complexity: 'Medium',
      deployCost: '0.0198 ETH',
      avgTime: '2-4 min',
      compliance: ['CFTC', 'Commodity Exchange', 'USDA']
    },
    {
      id: 4,
      name: 'Mining Rights Partnership',
      category: 'Mining & Energy',
      icon: 'Pickaxe',
      description: 'Joint venture agreement for mineral extraction rights with revenue sharing, environmental compliance tracking, and royalty distribution',
      complexity: 'High',
      deployCost: '0.0267 ETH',
      avgTime: '4-6 min',
      compliance: ['EPA', 'Mining Law', 'Environmental']
    },
    {
      id: 5,
      name: 'Tokenized Artwork Sale',
      category: 'Art & Collectibles',
      icon: 'Palette',
      description: 'NFT-based artwork sale contract with provenance tracking, royalty automation, and fractional ownership capabilities',
      complexity: 'Low',
      deployCost: '0.0156 ETH',
      avgTime: '1-2 min',
      compliance: ['Copyright', 'Authenticity', 'Tax']
    },
    {
      id: 6,
      name: 'Education Funding Agreement',
      category: 'Education',
      icon: 'GraduationCap',
      description: 'Income share agreement for education financing with automated repayment based on graduate earnings and career outcomes',
      complexity: 'Medium',
      deployCost: '0.0178 ETH',
      avgTime: '2-3 min',
      compliance: ['Student Loan', 'Privacy', 'Accreditation']
    }
  ];

  const activeContracts = [
    {
      id: 1,
      name: 'TechCorp Series A Investment',
      type: 'Private Equity',
      icon: 'TrendingUp',
      status: 'Active',
      parties: ['Goldman Sachs Ventures', 'TechCorp Inc.', 'Wilson & Partners LLP'],
      progress: 75,
      deployedAt: '2025-12-03',
      txHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      blockchainUrl: 'https://etherscan.io/tx/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    },
    {
      id: 2,
      name: 'Manhattan Office Lease 2025',
      type: 'Real Estate',
      icon: 'Building2',
      status: 'Pending',
      parties: ['Blackstone Real Estate', 'WeWork Global', 'Cushman & Wakefield'],
      progress: 45,
      deployedAt: '2025-12-02',
      txHash: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      blockchainUrl: 'https://etherscan.io/tx/0x8ba1f109551bD432803012645Ac136ddd64DBA72'
    },
    {
      id: 3,
      name: 'Wheat Futures Q1 2026',
      type: 'Agriculture',
      icon: 'Wheat',
      status: 'Active',
      parties: ['Cargill Trading', 'Midwest Farmers Co-op', 'Chicago Mercantile Exchange'],
      progress: 90,
      deployedAt: '2025-11-28',
      txHash: '0x1c8aff950685c2ed4bc3174f3472287b56d9517b',
      blockchainUrl: 'https://etherscan.io/tx/0x1c8aff950685c2ed4bc3174f3472287b56d9517b'
    },
    {
      id: 4,
      name: 'Copper Mine Joint Venture',
      type: 'Mining & Energy',
      icon: 'Pickaxe',
      status: 'Completed',
      parties: ['Rio Tinto', 'BHP Group', 'Environmental Defense Fund'],
      progress: 100,
      deployedAt: '2025-11-15',
      txHash: '0x9f4cda013e354b8fc285bf4b9a60460cee7f7ea9',
      blockchainUrl: 'https://etherscan.io/tx/0x9f4cda013e354b8fc285bf4b9a60460cee7f7ea9'
    },
    {
      id: 5,
      name: 'Picasso Digital Collection',
      type: 'Art & Collectibles',
      icon: 'Palette',
      status: 'Active',
      parties: ["Sotheby\'s", 'Museum of Modern Art', 'Christie\'s Ventures'],
      progress: 60,
      deployedAt: '2025-12-01',
      txHash: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
      blockchainUrl: 'https://etherscan.io/tx/0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be'
    }
  ];

  const filteredTemplates = contractTemplates?.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template?.category?.toLowerCase()?.replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || 
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeployTemplate = (template) => {
    setSelectedTemplate(template);
    setShowDeployment(true);
  };

  const handlePreviewTemplate = (template) => {
    console.log('Preview template:', template);
  };

  const handleDeploy = (deploymentData) => {
    console.log('Deploying contract:', deploymentData);
    setShowDeployment(false);
    setSelectedTemplate(null);
  };

  const handleViewContractDetails = (contract) => {
    setSelectedContract(contract);
  };

  const stats = [
    { label: 'Active Contracts', value: '24', icon: 'FileCheck', color: 'success' },
    { label: 'Pending Signatures', value: '7', icon: 'Clock', color: 'warning' },
    { label: 'Total Deployed', value: '156', icon: 'Rocket', color: 'secondary' },
    { label: 'Gas Saved', value: '2.4 ETH', icon: 'TrendingDown', color: 'accent' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Smart Contract Manager</h1>
                <p className="text-muted-foreground">Deploy, monitor, and manage blockchain-based contracts across multiple industries</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant={viewMode === 'templates' ? 'default' : 'outline'} 
                  size="sm"
                  iconName="Grid3x3"
                  onClick={() => setViewMode('templates')}
                >
                  Templates
                </Button>
                <Button 
                  variant={viewMode === 'active' ? 'default' : 'outline'} 
                  size="sm"
                  iconName="Activity"
                  onClick={() => setViewMode('active')}
                >
                  Active Contracts
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats?.map((stat, index) => (
                <div key={index} className="glass-surface rounded-lg p-4 hover:elevation-1 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-${stat?.color}/20 flex items-center justify-center`}>
                      <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color})`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <AIOptimizationPanel />
          </div>

          {viewMode === 'templates' && (
            <>
              <div className="glass-surface rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search contract templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        className="w-full pl-10 pr-4 py-3 bg-muted/20 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-64">
                    <Select
                      options={categories}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      placeholder="Filter by category"
                    />
                  </div>
                </div>
              </div>

              {showDeployment && selectedTemplate ? (
                <DeploymentWorkspace
                  selectedTemplate={selectedTemplate}
                  onClose={() => {
                    setShowDeployment(false);
                    setSelectedTemplate(null);
                  }}
                  onDeploy={handleDeploy}
                />
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Contract Templates ({filteredTemplates?.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates?.map((template) => (
                      <ContractTemplateCard
                        key={template?.id}
                        template={template}
                        onDeploy={handleDeployTemplate}
                        onPreview={handlePreviewTemplate}
                      />
                    ))}
                  </div>

                  {filteredTemplates?.length === 0 && (
                    <div className="glass-surface rounded-lg p-12 text-center">
                      <Icon name="FileSearch" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {viewMode === 'active' && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Active Contracts ({activeContracts?.length})
                </h2>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                    Export
                  </Button>
                  <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
                    Filter
                  </Button>
                </div>
              </div>

              <ActiveContractsTable
                contracts={activeContracts}
                onViewDetails={handleViewContractDetails}
              />
            </>
          )}
        </div>
      </main>
      {selectedContract && (
        <ContractDetailsModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </div>
  );
};

export default SmartContractManager;
