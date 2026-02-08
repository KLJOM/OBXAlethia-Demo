import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = () => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const insights = {
    recommendations: [
      {
        id: 1,
        title: "Rebalancing Opportunity Detected",
        description: "Private equity allocation has exceeded target by 3.2%. Consider reallocating $1.3M to real estate sector to maintain optimal diversification.",
        priority: "high",
        impact: "+0.8% expected return",
        confidence: 87,
        icon: "TrendingUp"
      },
      {
        id: 2,
        title: "Emerging Market Exposure",
        description: "Asia Pacific holdings showing strong momentum. Increasing allocation by 5% could capture additional growth while maintaining risk profile.",
        priority: "medium",
        impact: "+1.2% potential upside",
        confidence: 72,
        icon: "Globe"
      },
      {
        id: 3,
        title: "ESG Compliance Enhancement",
        description: "Portfolio ESG score can be improved by 12 points through strategic reallocation to sustainable agriculture and renewable energy assets.",
        priority: "medium",
        impact: "Improved ESG rating",
        confidence: 81,
        icon: "Leaf"
      },
      {
        id: 4,
        title: "Tax Loss Harvesting",
        description: "Mining sector position down 2.1% presents tax optimization opportunity. Harvest losses and reinvest in correlated energy sector.",
        priority: "low",
        impact: "$74K tax savings",
        confidence: 94,
        icon: "DollarSign"
      }
    ],
    scenarios: [
      {
        id: 1,
        name: "Market Correction (-15%)",
        portfolioImpact: "-$6.2M",
        probability: "18%",
        hedgeStrategy: "Increase cash position to 8%, add protective puts on equity exposure",
        icon: "TrendingDown"
      },
      {
        id: 2,
        name: "Interest Rate Hike (+2%)",
        portfolioImpact: "-$2.8M",
        probability: "35%",
        hedgeStrategy: "Reduce duration in fixed income, increase floating rate exposure",
        icon: "Percent"
      },
      {
        id: 3,
        name: "Commodity Boom (+25%)",
        portfolioImpact: "+$4.5M",
        probability: "22%",
        hedgeStrategy: "Maintain current mining and energy allocation, consider profit taking at +30%",
        icon: "Zap"
      },
      {
        id: 4,
        name: "Currency Volatility",
        portfolioImpact: "-$1.2M",
        probability: "42%",
        hedgeStrategy: "Implement currency hedging on 60% of international exposure",
        icon: "DollarSign"
      }
    ],
    optimization: [
      {
        id: 1,
        metric: "Sharpe Ratio",
        current: 2.34,
        optimized: 2.67,
        improvement: "+14.1%",
        action: "Reduce high-volatility art holdings by 3%, increase infrastructure allocation"
      },
      {
        id: 2,
        metric: "Maximum Drawdown",
        current: "-8.2%",
        optimized: "-6.5%",
        improvement: "+20.7%",
        action: "Add tail risk hedging through put options on 15% of equity exposure"
      },
      {
        id: 3,
        metric: "Diversification Ratio",
        current: 8.7,
        optimized: 9.2,
        improvement: "+5.7%",
        action: "Introduce emerging market debt and commodities to reduce correlation"
      },
      {
        id: 4,
        metric: "Information Ratio",
        current: 1.82,
        optimized: 2.15,
        improvement: "+18.1%",
        action: "Increase active management in private equity and reduce passive index exposure"
      }
    ]
  };

  const tabs = [
    { id: 'recommendations', label: 'AI Recommendations', icon: 'Sparkles' },
    { id: 'scenarios', label: 'Scenario Analysis', icon: 'GitBranch' },
    { id: 'optimization', label: 'Portfolio Optimization', icon: 'Target' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'low': return 'text-success bg-success/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="glass-surface rounded-xl p-6 elevation-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">AI-Powered Insights</h2>
          <p className="text-sm text-muted-foreground">Advanced analytics and optimization recommendations</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 glass-surface-light rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">AI Model Active</span>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab?.id
                ? 'text-secondary border-b-2 border-secondary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          {insights?.recommendations?.map((rec) => (
            <div key={rec?.id} className="glass-surface-light rounded-lg p-4 hover:elevation-1 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-secondary/20 flex-shrink-0">
                  <Icon name={rec?.icon} size={24} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-semibold text-foreground">{rec?.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec?.priority)}`}>
                      {rec?.priority?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={14} className="text-success" />
                      <span className="text-xs font-medium text-success">{rec?.impact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Brain" size={14} className="text-secondary" />
                      <span className="text-xs text-muted-foreground">
                        Confidence: <span className="font-semibold text-foreground">{rec?.confidence}%</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                  <Button variant="default" size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          {insights?.scenarios?.map((scenario) => (
            <div key={scenario?.id} className="glass-surface-light rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/20 flex-shrink-0">
                  <Icon name={scenario?.icon} size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-semibold text-foreground">{scenario?.name}</h3>
                    <span className="text-xs font-medium text-muted-foreground">
                      Probability: <span className="text-foreground">{scenario?.probability}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Portfolio Impact</p>
                      <p className={`text-lg font-bold ${scenario?.portfolioImpact?.startsWith('+') ? 'text-success' : 'text-error'}`}>
                        {scenario?.portfolioImpact}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Hedge Strategy</p>
                      <p className="text-sm text-foreground">{scenario?.hedgeStrategy}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" iconName="Play" iconPosition="left">
                    Run Simulation
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'optimization' && (
        <div className="space-y-4">
          {insights?.optimization?.map((opt) => (
            <div key={opt?.id} className="glass-surface-light rounded-lg p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{opt?.metric}</h3>
                  <p className="text-sm text-muted-foreground">{opt?.action}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-success/20 text-success">
                  {opt?.improvement}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-surface rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Current</p>
                  <p className="text-xl font-bold text-foreground">{opt?.current}</p>
                </div>
                <div className="glass-surface rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Optimized</p>
                  <p className="text-xl font-bold text-success">{opt?.optimized}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center pt-4">
            <Button variant="default" iconName="Zap" iconPosition="left">
              Apply All Optimizations
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
