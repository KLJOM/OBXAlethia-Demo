import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import PerformanceMetrics from './components/PerformanceMetrics.jsx';
import PerformanceChart from './components/PerformanceChart';
import AssetAllocation from './components/AssetAllocation';
import HoldingsTable from './components/HoldingsTable';
import RiskMetrics from './components/RiskMetrics';
import AIInsights from './components/AIInsights';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PortfolioAnalytics = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio Analytics - OBXAlethia</title>
        <meta name="description" content="Comprehensive portfolio performance analysis and risk assessment across multi-industry investments" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="main-content">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Analytics</h1>
                  <p className="text-muted-foreground">
                    Comprehensive performance analysis and risk assessment across multi-industry investments
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    Export Report
                  </Button>
                  <Button variant="outline" iconName="RefreshCw" iconPosition="left">
                    Rebalance
                  </Button>
                  <Button variant="default" iconName="FileText" iconPosition="left">
                    Generate Analysis
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 glass-surface-light rounded-lg px-4 py-3 w-fit">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last updated: December 3, 2025 at 10:17 PM
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <PerformanceMetrics />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceChart />
                <AssetAllocation />
              </div>

              <HoldingsTable />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RiskMetrics />
                <AIInsights />
              </div>

              <div className="glass-surface rounded-xl p-6 elevation-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-secondary/20 flex-shrink-0">
                    <Icon name="Info" size={24} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      Portfolio Performance Summary
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your portfolio has demonstrated exceptional performance over the past 12 months with a total return of +70.83%, 
                      significantly outperforming the benchmark by +7.19%. The Sharpe ratio of 2.34 indicates excellent risk-adjusted 
                      returns, while the maximum drawdown of -8.2% shows strong downside protection. Current asset allocation maintains 
                      optimal diversification across private equity (35%), real estate (25%), art & collectibles (15%), mining & energy (12%), 
                      agriculture (8%), and cash equivalents (5%). AI-powered analysis suggests minor rebalancing opportunities to further 
                      optimize risk-adjusted returns and enhance ESG compliance scores.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-success/20 text-success">
                        <Icon name="CheckCircle" size={14} className="mr-1" />
                        Outperforming Benchmark
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                        <Icon name="Shield" size={14} className="mr-1" />
                        Strong Risk Management
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                        <Icon name="TrendingUp" size={14} className="mr-1" />
                        Positive Alpha Generation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PortfolioAnalytics;
