import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveContractsTable = ({ contracts, onViewDetails }) => {
  const [sortField, setSortField] = useState('deployedAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const getStatusBadge = (status) => {
    const badges = {
      'Active': { color: 'bg-success/20 text-success', icon: 'CheckCircle' },
      'Pending': { color: 'bg-warning/20 text-warning', icon: 'Clock' },
      'Completed': { color: 'bg-accent/20 text-accent', icon: 'CheckCheck' },
      'Failed': { color: 'bg-error/20 text-error', icon: 'XCircle' }
    };
    return badges?.[status] || badges?.['Pending'];
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedContracts = [...contracts]?.sort((a, b) => {
    const aVal = a?.[sortField];
    const bVal = b?.[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    return aVal > bVal ? modifier : -modifier;
  });

  return (
    <div className="glass-surface rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/10 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-secondary transition-colors"
                >
                  Contract Name
                  <Icon name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button 
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-secondary transition-colors"
                >
                  Status
                  <Icon name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Parties</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Progress</th>
              <th className="px-6 py-4 text-left">
                <button 
                  onClick={() => handleSort('deployedAt')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-secondary transition-colors"
                >
                  Deployed
                  <Icon name={sortField === 'deployedAt' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Blockchain</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedContracts?.map((contract) => {
              const statusBadge = getStatusBadge(contract?.status);
              return (
                <tr key={contract?.id} className="hover:bg-muted/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={contract?.icon} size={20} color="var(--color-secondary)" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{contract?.name}</p>
                        <p className="text-xs text-muted-foreground">{contract?.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusBadge?.color} text-xs font-medium`}>
                      <Icon name={statusBadge?.icon} size={14} />
                      {contract?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {contract?.parties?.slice(0, 3)?.map((party, index) => (
                        <div 
                          key={index}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-xs font-semibold text-white border-2 border-background"
                          title={party}
                        >
                          {party?.charAt(0)}
                        </div>
                      ))}
                      {contract?.parties?.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground border-2 border-background">
                          +{contract?.parties?.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-500"
                          style={{ width: `${contract?.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-foreground w-12 text-right">{contract?.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{contract?.deployedAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={contract?.blockchainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-accent transition-colors"
                    >
                      <Icon name="ExternalLink" size={14} />
                      <span className="font-mono text-xs">{contract?.txHash?.slice(0, 8)}...{contract?.txHash?.slice(-6)}</span>
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Eye"
                        onClick={() => onViewDetails(contract)}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveContractsTable;
