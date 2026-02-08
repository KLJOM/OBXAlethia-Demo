import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ComplianceMetrics from './components/ComplianceMetrics';
import RegulatoryStatus from './components/RegulatoryStatus';
import AutomatedReporting from './components/AutomatedReporting';
import MonitoringAlerts from './components/MonitoringAlerts';
import ComplianceAnalytics from './components/ComplianceAnalytics';
import AuditPreparation from './components/AuditPreparation';

const ComplianceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const metricsData = [
    {
      id: 1,
      label: "Overall Compliance",
      value: "94.2%",
      percentage: 94,
      trend: 2.3,
      icon: "Shield"
    },
    {
      id: 2,
      label: "Outstanding Issues",
      value: "12",
      percentage: 75,
      trend: -15,
      icon: "AlertTriangle"
    },
    {
      id: 3,
      label: "Regulatory Filings",
      value: "28/30",
      percentage: 93,
      trend: 5.2,
      icon: "FileText"
    },
    {
      id: 4,
      label: "Audit Readiness",
      value: "87%",
      percentage: 87,
      trend: 8.1,
      icon: "CheckCircle2"
    }
  ];

  const jurisdictionsData = [
    {
      id: 1,
      name: "SEC (United States)",
      requirements: 45,
      score: 96,
      status: "compliant"
    },
    {
      id: 2,
      name: "FINRA",
      requirements: 32,
      score: 92,
      status: "compliant"
    },
    {
      id: 3,
      name: "FCA (United Kingdom)",
      requirements: 38,
      score: 78,
      status: "warning"
    },
    {
      id: 4,
      name: "MAS (Singapore)",
      requirements: 28,
      score: 88,
      status: "compliant"
    },
    {
      id: 5,
      name: "ESMA (European Union)",
      requirements: 52,
      score: 65,
      status: "critical"
    }
  ];

  const reportsData = [
    {
      id: 1,
      title: "Form 10-K Annual Report",
      jurisdiction: "SEC",
      dueDate: "2026-03-31",
      status: "pending"
    },
    {
      id: 2,
      title: "AML Compliance Report",
      jurisdiction: "FINRA",
      dueDate: "2026-01-15",
      status: "completed"
    },
    {
      id: 3,
      title: "GDPR Data Protection Assessment",
      jurisdiction: "ESMA",
      dueDate: "2025-12-20",
      status: "overdue"
    },
    {
      id: 4,
      title: "Quarterly Financial Disclosure",
      jurisdiction: "SEC",
      dueDate: "2026-02-10",
      status: "scheduled"
    },
    {
      id: 5,
      title: "KYC Verification Report",
      jurisdiction: "MAS",
      dueDate: "2026-01-25",
      status: "pending"
    }
  ];

  const alertsData = [
    {
      id: 1,
      title: "Sanctions Screening Alert",
      description: "Potential match detected in transaction TX-2025-8847. Requires immediate review and escalation to compliance officer.",
      category: "AML/KYC",
      severity: "critical",
      timestamp: new Date(Date.now() - 15 * 60000),
      requiresAction: true
    },
    {
      id: 2,
      title: "PEP Identification",
      description: "New client flagged as Politically Exposed Person. Enhanced due diligence procedures must be initiated within 24 hours.",
      category: "KYC",
      severity: "high",
      timestamp: new Date(Date.now() - 45 * 60000),
      requiresAction: true
    },
    {
      id: 3,
      title: "Regulatory Change Impact",
      description: "SEC has updated disclosure requirements for digital assets. Impact assessment needed for 12 active smart contracts.",
      category: "Regulatory",
      severity: "medium",
      timestamp: new Date(Date.now() - 120 * 60000),
      requiresAction: false
    },
    {
      id: 4,
      title: "Transaction Monitoring Alert",
      description: "Unusual transaction pattern detected in account ACC-4521. Automated monitoring flagged for manual review.",
      category: "Transaction",
      severity: "high",
      timestamp: new Date(Date.now() - 180 * 60000),
      requiresAction: true
    },
    {
      id: 5,
      title: "Document Expiration Notice",
      description: "KYC documents for 8 clients will expire within 30 days. Renewal process should be initiated immediately.",
      category: "Documentation",
      severity: "medium",
      timestamp: new Date(Date.now() - 240 * 60000),
      requiresAction: false
    }
  ];

  const trendData = [
    { date: "Nov 3", compliance: 92, issues: 18 },
    { date: "Nov 10", compliance: 89, issues: 22 },
    { date: "Nov 17", compliance: 91, issues: 16 },
    { date: "Nov 24", compliance: 93, issues: 14 },
    { date: "Dec 1", compliance: 94, issues: 12 }
  ];

  const riskData = [
    { category: "AML", low: 45, medium: 12, high: 3 },
    { category: "KYC", low: 38, medium: 8, high: 2 },
    { category: "Sanctions", low: 52, medium: 5, high: 1 },
    { category: "Transaction", low: 41, medium: 15, high: 4 },
    { category: "Regulatory", low: 35, medium: 18, high: 7 }
  ];

  const auditItemsData = [
    {
      id: 1,
      title: "AML Policy Documentation",
      description: "Complete review and update of anti-money laundering policies and procedures",
      completion: 100,
      documentsReady: 15,
      totalDocuments: 15,
      assignedTo: "Compliance Team"
    },
    {
      id: 2,
      title: "Transaction Monitoring Records",
      description: "Compile and organize all transaction monitoring reports and escalation records",
      completion: 85,
      documentsReady: 34,
      totalDocuments: 40,
      assignedTo: "Risk Management"
    },
    {
      id: 3,
      title: "KYC/CDD Documentation",
      description: "Verify completeness of customer due diligence files and enhanced due diligence records",
      completion: 72,
      documentsReady: 128,
      totalDocuments: 178,
      assignedTo: "Operations Team"
    },
    {
      id: 4,
      title: "Regulatory Correspondence",
      description: "Organize all communications with regulatory bodies and responses to inquiries",
      completion: 95,
      documentsReady: 23,
      totalDocuments: 24,
      assignedTo: "Legal Department"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'monitoring', label: 'Monitoring', icon: 'Eye' },
    { id: 'reporting', label: 'Reporting', icon: 'FileText' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Compliance Dashboard</h1>
              <p className="text-muted-foreground">
                Regulatory oversight and automated compliance tracking across multi-jurisdictional operations
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="default" iconName="Download" iconPosition="left">
                Export Report
              </Button>
              <Button variant="default" size="default" iconName="FileText" iconPosition="left">
                Generate Report
              </Button>
              <Button variant="secondary" size="default" iconName="Calendar" iconPosition="left">
                Schedule Audit
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'bg-secondary/20 text-secondary' :'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <ComplianceMetrics metrics={metricsData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RegulatoryStatus jurisdictions={jurisdictionsData} />
              </div>
              <div>
                <div className="glass-surface rounded-lg p-6 elevation-2">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 glass-surface-light rounded-lg hover:elevation-1 transition-all text-left">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Submit Filing</p>
                        <p className="text-xs text-muted-foreground">Regulatory submission</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 glass-surface-light rounded-lg hover:elevation-1 transition-all text-left">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Icon name="AlertTriangle" size={20} className="text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Review Alerts</p>
                        <p className="text-xs text-muted-foreground">12 pending items</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 glass-surface-light rounded-lg hover:elevation-1 transition-all text-left">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <Icon name="CheckCircle2" size={20} className="text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Run Audit Check</p>
                        <p className="text-xs text-muted-foreground">Verify compliance</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AutomatedReporting reports={reportsData} />
              <MonitoringAlerts alerts={alertsData} />
            </div>

            <ComplianceAnalytics trendData={trendData} riskData={riskData} />

            <AuditPreparation auditItems={auditItemsData} />

            <div className="glass-surface rounded-lg p-6 elevation-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">AI-Powered Risk Prediction</h2>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                  <Icon name="Sparkles" size={14} />
                  <span>AI Insights</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 glass-surface-light rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                    <h3 className="text-sm font-semibold text-foreground">Compliance Forecast</h3>
                  </div>
                  <p className="text-2xl font-bold text-success mb-1">96.5%</p>
                  <p className="text-xs text-muted-foreground">Predicted compliance rate for Q1 2026 based on current trends and remediation efforts</p>
                </div>
                <div className="p-4 glass-surface-light rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                    <h3 className="text-sm font-semibold text-foreground">Risk Hotspots</h3>
                  </div>
                  <p className="text-2xl font-bold text-warning mb-1">3 Areas</p>
                  <p className="text-xs text-muted-foreground">Cross-border transactions, PEP monitoring, and GDPR compliance require immediate attention</p>
                </div>
                <div className="p-4 glass-surface-light rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Target" size={20} className="text-secondary" />
                    <h3 className="text-sm font-semibold text-foreground">Recommendations</h3>
                  </div>
                  <p className="text-2xl font-bold text-secondary mb-1">8 Actions</p>
                  <p className="text-xs text-muted-foreground">AI-generated recommendations to optimize compliance processes and reduce regulatory risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplianceDashboard;