import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DecisionSupportPanel = ({ recommendations, onExecuteDecision }) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  const getImpactColor = (impact) => {
    const colors = {
      'High': 'text-success',
      'Medium': 'text-warning',
      'Low': 'text-muted-foreground'
    };
    return colors?.[impact] || 'text-muted-foreground';
  };

  const getImpactBgColor = (impact) => {
    const colors = {
      'High': 'bg-success/20',
      'Medium': 'bg-warning/20',
      'Low': 'bg-muted/20'
    };
    return colors?.[impact] || 'bg-muted/20';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-accent';
    if (confidence >= 50) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Lightbulb" size={24} color="var(--color-accent)" />
          <h2 className="text-xl font-semibold text-foreground">AI Recommendations</h2>
        </div>
        <button className="px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors text-sm font-medium flex items-center gap-2">
          <Icon name="RefreshCw" size={16} />
          <span>Refresh</span>
        </button>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec) => (
          <div
            key={rec?.id}
            className={`glass-surface-light rounded-lg p-5 cursor-pointer transition-all duration-200 ${
              selectedRecommendation?.id === rec?.id
                ? 'ring-2 ring-secondary elevation-2' :'hover:elevation-2'
            }`}
            onClick={() => setSelectedRecommendation(rec)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-foreground">{rec?.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactBgColor(rec?.impact)} ${getImpactColor(rec?.impact)}`}>
                    {rec?.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} color="var(--color-accent)" />
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className={`text-sm font-semibold ${getConfidenceColor(rec?.confidence)}`}>
                  {rec?.confidence}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="DollarSign" size={16} color="var(--color-success)" />
                <span className="text-sm text-muted-foreground">Expected ROI:</span>
                <span className="text-sm font-semibold text-success">{rec?.expectedROI}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} color="var(--color-warning)" />
                <span className="text-sm text-muted-foreground">Timeline:</span>
                <span className="text-sm font-semibold text-foreground">{rec?.timeline}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">Key Factors:</h4>
              <div className="flex flex-wrap gap-2">
                {rec?.keyFactors?.map((factor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">Risks:</h4>
              <ul className="space-y-1">
                {rec?.risks?.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  onExecuteDecision(rec);
                }}
                className="flex-1 py-2.5 px-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium text-sm transition-all interactive-scale flex items-center justify-center gap-2"
              >
                <Icon name="CheckCircle" size={18} />
                <span>Execute Decision</span>
              </button>
              <button
                onClick={(e) => e?.stopPropagation()}
                className="px-4 py-2.5 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                title="More Details"
              >
                <Icon name="MoreHorizontal" size={18} color="var(--color-muted-foreground)" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">AI Analysis Note</h4>
            <p className="text-sm text-muted-foreground">
              Recommendations are generated using advanced machine learning models analyzing market data, historical performance, and risk factors. All decisions should be reviewed by qualified professionals before execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSupportPanel;
