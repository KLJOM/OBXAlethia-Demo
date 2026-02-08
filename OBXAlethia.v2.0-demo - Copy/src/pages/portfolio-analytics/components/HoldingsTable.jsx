import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HoldingsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssetClass, setFilterAssetClass] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'value', direction: 'desc' });

  const holdings = [
  {
    id: 1,
    name: "Blackstone Real Estate Fund VII",
    assetClass: "Private Equity",
    sector: "Real Estate",
    value: 8500000,
    cost: 7200000,
    return: 18.06,
    allocation: 20.73,
    risk: "Medium",
    lastUpdate: "2025-12-03",
    logo: "https://images.unsplash.com/photo-1721240608299-cdf5ee26c235",
    logoAlt: "Modern glass office building exterior with blue sky reflecting in windows representing Blackstone Real Estate investment property"
  },
  {
    id: 2,
    name: "Picasso Blue Period Collection",
    assetClass: "Art & Collectibles",
    sector: "Fine Art",
    value: 6200000,
    cost: 4800000,
    return: 29.17,
    allocation: 15.12,
    risk: "High",
    lastUpdate: "2025-12-02",
    logo: "https://images.unsplash.com/photo-1667470928088-57bfc3f28cf8",
    logoAlt: "Abstract blue and white painting with geometric shapes in modern art gallery representing Picasso artwork collection"
  },
  {
    id: 3,
    name: "KKR Infrastructure Fund III",
    assetClass: "Private Equity",
    sector: "Infrastructure",
    value: 5800000,
    cost: 5000000,
    return: 16.00,
    allocation: 14.15,
    risk: "Low",
    lastUpdate: "2025-12-03",
    logo: "https://images.unsplash.com/photo-1726087165132-d64b2401728a",
    logoAlt: "Large industrial construction site with cranes and steel framework against sunset sky representing infrastructure investment"
  },
  {
    id: 4,
    name: "Manhattan Prime Office Tower",
    assetClass: "Real Estate",
    sector: "Commercial",
    value: 4900000,
    cost: 4200000,
    return: 16.67,
    allocation: 11.95,
    risk: "Medium",
    lastUpdate: "2025-12-01",
    logo: "https://images.unsplash.com/photo-1624905007803-16d923fbf94d",
    logoAlt: "Tall modern skyscraper with reflective glass facade in Manhattan financial district during golden hour"
  },
  {
    id: 5,
    name: "Rio Tinto Copper Mining JV",
    assetClass: "Mining & Energy",
    sector: "Mining",
    value: 3700000,
    cost: 3500000,
    return: 5.71,
    allocation: 9.02,
    risk: "High",
    lastUpdate: "2025-12-03",
    logo: "https://images.unsplash.com/photo-1559774945-138787f3a94e",
    logoAlt: "Open pit copper mine with terraced levels and large mining equipment operating under clear blue sky"
  },
  {
    id: 6,
    name: "Napa Valley Vineyard Estate",
    assetClass: "Agriculture",
    sector: "Wine Production",
    value: 3200000,
    cost: 2800000,
    return: 14.29,
    allocation: 7.80,
    risk: "Medium",
    lastUpdate: "2025-11-30",
    logo: "https://images.unsplash.com/photo-1710563447214-a856ea672171",
    logoAlt: "Rows of green grapevines on rolling hills in Napa Valley with mountains in background during harvest season"
  },
  {
    id: 7,
    name: "Carlyle Growth Capital IV",
    assetClass: "Private Equity",
    sector: "Technology",
    value: 2900000,
    cost: 2500000,
    return: 16.00,
    allocation: 7.07,
    risk: "High",
    lastUpdate: "2025-12-02",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15b9cfc75-1764651774193.png",
    logoAlt: "Digital technology network visualization with glowing blue connections and data nodes on dark background"
  },
  {
    id: 8,
    name: "Contemporary Art Portfolio",
    assetClass: "Art & Collectibles",
    sector: "Modern Art",
    value: 2400000,
    cost: 2000000,
    return: 20.00,
    allocation: 5.85,
    risk: "High",
    lastUpdate: "2025-12-01",
    logo: "https://images.unsplash.com/photo-1591163088186-367c5daff7b0",
    logoAlt: "Vibrant contemporary art gallery with colorful abstract paintings on white walls and polished concrete floor"
  },
  {
    id: 9,
    name: "Texas Wind Farm Project",
    assetClass: "Mining & Energy",
    sector: "Renewable Energy",
    value: 2100000,
    cost: 2000000,
    return: 5.00,
    allocation: 5.12,
    risk: "Low",
    lastUpdate: "2025-12-03",
    logo: "https://images.unsplash.com/photo-1622915710364-959c18fd75e2",
    logoAlt: "Row of white wind turbines on green hills against blue sky generating renewable energy in Texas"
  },
  {
    id: 10,
    name: "Organic Farming Cooperative",
    assetClass: "Agriculture",
    sector: "Sustainable Agriculture",
    value: 1500000,
    cost: 1400000,
    return: 7.14,
    allocation: 3.66,
    risk: "Medium",
    lastUpdate: "2025-11-29",
    logo: "https://images.unsplash.com/photo-1726985202405-48ac2c376a81",
    logoAlt: "Lush green organic farm fields with rows of vegetables and modern greenhouse structures in rural countryside"
  }];


  const assetClassOptions = [
  { value: 'all', label: 'All Asset Classes' },
  { value: 'Private Equity', label: 'Private Equity' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Art & Collectibles', label: 'Art & Collectibles' },
  { value: 'Mining & Energy', label: 'Mining & Energy' },
  { value: 'Agriculture', label: 'Agriculture' }];


  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredAndSortedHoldings = holdings?.filter((holding) => {
    const matchesSearch = holding?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    holding?.sector?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = filterAssetClass === 'all' || holding?.assetClass === filterAssetClass;
    return matchesSearch && matchesFilter;
  })?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    const direction = sortConfig?.direction === 'asc' ? 1 : -1;
    return aValue > bValue ? direction : -direction;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ChevronsUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' ?
    <Icon name="ChevronUp" size={14} className="text-secondary" /> :

    <Icon name="ChevronDown" size={14} className="text-secondary" />;

  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':return 'text-success bg-success/20';
      case 'Medium':return 'text-warning bg-warning/20';
      case 'High':return 'text-error bg-error/20';
      default:return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Portfolio Holdings</h2>
          <p className="text-sm text-muted-foreground">Detailed investment positions and performance</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search holdings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)} />

          </div>
          <div className="w-full sm:w-48">
            <Select
              options={assetClassOptions}
              value={filterAssetClass}
              onChange={setFilterAssetClass}
              placeholder="Filter by class" />

          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Investment
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('assetClass')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors">

                  Asset Class
                  <SortIcon columnKey="assetClass" />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('value')}
                  className="flex items-center gap-1 ml-auto hover:text-foreground transition-colors">

                  Current Value
                  <SortIcon columnKey="value" />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('return')}
                  className="flex items-center gap-1 ml-auto hover:text-foreground transition-colors">

                  Return
                  <SortIcon columnKey="return" />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('allocation')}
                  className="flex items-center gap-1 ml-auto hover:text-foreground transition-colors">

                  Allocation
                  <SortIcon columnKey="allocation" />
                </button>
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Risk
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedHoldings?.map((holding) =>
            <tr
              key={holding?.id}
              className="border-b border-border hover:bg-muted/30 transition-colors">

                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                      src={holding?.logo}
                      alt={holding?.logoAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{holding?.name}</p>
                      <p className="text-xs text-muted-foreground">{holding?.sector}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground">{holding?.assetClass}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-sm font-semibold text-foreground">
                    ${(holding?.value / 1000000)?.toFixed(2)}M
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cost: ${(holding?.cost / 1000000)?.toFixed(2)}M
                  </p>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`text-sm font-semibold ${holding?.return > 0 ? 'text-success' : 'text-error'}`}>
                    {holding?.return > 0 ? '+' : ''}{holding?.return?.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-muted rounded-full h-1.5">
                      <div
                      className="bg-secondary h-1.5 rounded-full"
                      style={{ width: `${Math.min(holding?.allocation * 5, 100)}%` }} />

                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {holding?.allocation?.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRiskColor(holding?.risk)}`}>
                      {holding?.risk}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    title="View Details">

                      <Icon name="Eye" size={16} className="text-muted-foreground" />
                    </button>
                    <button
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    title="Edit">

                      <Icon name="Edit" size={16} className="text-muted-foreground" />
                    </button>
                    <button
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    title="More Options">

                      <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredAndSortedHoldings?.length === 0 &&
      <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-foreground font-medium mb-1">No holdings found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      }
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedHoldings?.length} of {holdings?.length} holdings
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded bg-secondary text-secondary-foreground text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 rounded hover:bg-muted text-sm font-medium text-muted-foreground">
              2
            </button>
            <button className="w-8 h-8 rounded hover:bg-muted text-sm font-medium text-muted-foreground">
              3
            </button>
          </div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>);

};

export default HoldingsTable;
