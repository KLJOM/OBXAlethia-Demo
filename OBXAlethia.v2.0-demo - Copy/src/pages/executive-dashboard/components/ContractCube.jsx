import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContractCube = ({ contract, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (contract?.status) {
      case 'active': return 'var(--color-success)';
      case 'pending': return 'var(--color-warning)';
      case 'review': return 'var(--color-secondary)';
      default: return 'var(--color-muted)';
    }
  };

  const getIndustryIcon = () => {
    switch (contract?.industry) {
      case 'Private Equity': return 'TrendingUp';
      case 'Real Estate': return 'Building2';
      case 'Mining': return 'Pickaxe';
      case 'Agriculture': return 'Sprout';
      case 'Art': return 'Palette';
      default: return 'FileText';
    }
  };

  return (
    <div
      className="glass-surface-light rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 elevation-2"
      style={{
        borderLeft: `4px solid ${getStatusColor()}`,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(contract)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${getStatusColor()}20` }}
          >
            <Icon name={getIndustryIcon()} size={20} color={getStatusColor()} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">{contract?.name}</h4>
            <p className="text-xs text-muted-foreground">{contract?.industry}</p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full" style={{ 
          background: `${getStatusColor()}20`,
          color: getStatusColor()
        }}>
          {contract?.status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Value</span>
          <span className="font-semibold text-foreground">{contract?.value}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Parties</span>
          <span className="font-medium text-foreground">{contract?.parties}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Deployed</span>
          <span className="font-medium text-foreground">{contract?.deployedDate}</span>
        </div>
      </div>
      {contract?.aiAlert && (
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
          <Icon name="Sparkles" size={14} color="var(--color-accent)" />
          <span className="text-xs text-accent">{contract?.aiAlert}</span>
        </div>
      )}
    </div>
  );
};

export default ContractCube;
