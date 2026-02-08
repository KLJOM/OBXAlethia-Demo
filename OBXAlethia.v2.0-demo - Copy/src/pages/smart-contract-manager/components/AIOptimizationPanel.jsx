import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIOptimizationPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const suggestions = [
    {
      id: 1,
      title: 'Gas Optimization Opportunity',
      description: 'Reduce deployment cost by 18% by optimizing contract bytecode and removing redundant storage operations',
      impact: 'High',
      savings: '0.0044 ETH',
      icon: 'Zap',
      color: 'warning'
    },
    {
      id: 2,
      title: 'Security Enhancement',
      description: 'Add reentrancy guard to prevent potential attack vectors in fund transfer functions',
      impact: 'Critical',
      savings: 'Risk Mitigation',
      icon: 'Shield',
      color: 'error'
    },
    {
      id: 3,
      title: 'Compliance Automation',
      description: 'Integrate automated KYC verification to streamline onboarding and reduce manual review time',
      impact: 'Medium',
      savings: '2-3 days',
      icon: 'CheckCircle',
      color: 'success'
    }
  ];

  const getImpactColor = (impact) => {
    const colors = {
      'Critical': 'bg-error/20 text-error',
      'High': 'bg-warning/20 text-warning',
      'Medium': 'bg-accent/20 text-accent',
      'Low': 'bg-success/20 text-success'
    };
    return colors?.[impact] || colors?.['Medium'];
  };

  return (
    <div className="glass-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <Icon name="Sparkles" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Optimization Suggestions</h3>
            <p className="text-sm text-muted-foreground">Powered by machine learning analysis</p>
          </div>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-muted/20 rounded-lg transition-colors"
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-3 animate-slide-up">
          {suggestions?.map((suggestion) => (
            <div key={suggestion?.id} className="glass-surface-light rounded-lg p-4 hover:elevation-1 transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${suggestion?.color}/20 flex items-center justify-center flex-shrink-0`}>
                  <Icon name={suggestion?.icon} size={20} color={`var(--color-${suggestion?.color})`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{suggestion?.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(suggestion?.impact)}`}>
                      {suggestion?.impact}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{suggestion?.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingDown" size={16} color="var(--color-success)" />
                      <span className="text-sm font-medium text-success">Save: {suggestion?.savings}</span>
                    </div>
                    <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="glass-surface-light rounded-lg p-4 mt-4">
            <div className="flex items-center gap-3">
              <Icon name="Info" size={20} color="var(--color-accent)" />
              <p className="text-sm text-muted-foreground">
                AI suggestions are based on analysis of 10,000+ deployed contracts and industry best practices
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIOptimizationPanel;
