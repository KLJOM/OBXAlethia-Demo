import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContractTemplateCard = ({ template, onDeploy, onPreview }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Private Equity': 'from-blue-500/20 to-cyan-500/20',
      'Real Estate': 'from-emerald-500/20 to-teal-500/20',
      'Agriculture': 'from-amber-500/20 to-orange-500/20',
      'Mining & Energy': 'from-purple-500/20 to-pink-500/20',
      'Art & Collectibles': 'from-rose-500/20 to-red-500/20',
      'Education': 'from-indigo-500/20 to-violet-500/20'
    };
    return colors?.[category] || 'from-slate-500/20 to-gray-500/20';
  };

  const getComplexityBadge = (complexity) => {
    const badges = {
      'Low': { color: 'bg-success/20 text-success', icon: 'CheckCircle' },
      'Medium': { color: 'bg-warning/20 text-warning', icon: 'AlertCircle' },
      'High': { color: 'bg-error/20 text-error', icon: 'AlertTriangle' }
    };
    return badges?.[complexity] || badges?.['Medium'];
  };

  const complexityBadge = getComplexityBadge(template?.complexity);

  return (
    <div className="glass-surface rounded-lg p-6 hover:elevation-2 transition-all duration-300 interactive-scale">
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(template?.category)} rounded-lg opacity-50`}></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Icon name={template?.icon} size={24} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{template?.name}</h3>
              <p className="text-sm text-muted-foreground">{template?.category}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full ${complexityBadge?.color} flex items-center gap-1.5 text-xs font-medium`}>
            <Icon name={complexityBadge?.icon} size={14} />
            <span>{template?.complexity}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{template?.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="glass-surface-light rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="DollarSign" size={16} color="var(--color-accent)" />
              <span className="text-xs text-muted-foreground">Deploy Cost</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{template?.deployCost}</p>
          </div>
          <div className="glass-surface-light rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Clock" size={16} color="var(--color-accent)" />
              <span className="text-xs text-muted-foreground">Avg. Time</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{template?.avgTime}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="text-xs font-medium text-muted-foreground">Compliance Requirements</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {template?.compliance?.map((req, index) => (
              <span key={index} className="px-2 py-1 rounded text-xs bg-muted/30 text-muted-foreground">
                {req}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Eye" 
            iconPosition="left"
            onClick={() => onPreview(template)}
            className="flex-1"
          >
            Preview
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            iconName="Rocket" 
            iconPosition="left"
            onClick={() => onDeploy(template)}
            className="flex-1"
          >
            Deploy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractTemplateCard;
