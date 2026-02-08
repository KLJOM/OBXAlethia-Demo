import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ onFilterChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    network: '',
    status: '',
    amountRange: ''
  });

  const transactionTypes = [
    { value: '', label: 'All Types' },
    { value: 'smart-contract', label: 'Smart Contract' },
    { value: 'payment', label: 'Payment' },
    { value: 'swap', label: 'Token Swap' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'staking', label: 'Staking' }
  ];

  const networks = [
    { value: '', label: 'All Networks' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'bsc', label: 'BSC' },
    { value: 'avalanche', label: 'Avalanche' },
    { value: 'swift', label: 'SWIFT' }
  ];

  const statuses = [
    { value: '', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const amountRanges = [
    { value: '', label: 'All Amounts' },
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1000-10000', label: '$1,000 - $10,000' },
    { value: '10000-100000', label: '$10,000 - $100,000' },
    { value: '100000+', label: '$100,000+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleReset = () => {
    const resetFilters = {
      type: '',
      network: '',
      status: '',
      amountRange: ''
    };
    setFilters(resetFilters);
    setSearchTerm('');
    onFilterChange(resetFilters);
    onSearch('');
  };

  return (
    <div className="glass-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
        >
          <Icon name="RotateCcw" size={16} />
          Reset
        </button>
      </div>
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="Search by hash, address, or party name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e?.target?.value)}
          className="w-full"
        />

        <Select
          label="Transaction Type"
          options={transactionTypes}
          value={filters?.type}
          onChange={(value) => handleFilterChange('type', value)}
        />

        <Select
          label="Network"
          options={networks}
          value={filters?.network}
          onChange={(value) => handleFilterChange('network', value)}
        />

        <Select
          label="Status"
          options={statuses}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          label="Amount Range"
          options={amountRanges}
          value={filters?.amountRange}
          onChange={(value) => handleFilterChange('amountRange', value)}
        />

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Quick Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 text-xs font-medium bg-warning/20 text-warning rounded-full hover:bg-warning/30 transition-colors">
              High Priority
            </button>
            <button className="px-3 py-1 text-xs font-medium bg-error/20 text-error rounded-full hover:bg-error/30 transition-colors">
              Failed
            </button>
            <button className="px-3 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full hover:bg-secondary/30 transition-colors">
              Pending Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
