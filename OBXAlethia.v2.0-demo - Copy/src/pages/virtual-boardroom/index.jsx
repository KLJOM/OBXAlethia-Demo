import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AIAdvisorCard from './components/AIAdvisorCard';
import ParticipantsList from './components/ParticipantsList';
import ChatPanel from './components/ChatPanel';
import DecisionSupportPanel from './components/DecisionSupportPanel';
import DocumentManager from './components/DocumentManager';
import SessionControls from './components/SessionControls';

const VirtualBoardroom = () => {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeAdvisor, setActiveAdvisor] = useState(null);
  const [activeTab, setActiveTab] = useState('advisors');

  const advisors = [
  {
    id: 1,
    name: "Capital Structure AI",
    specialty: "Private Equity & Debt Optimization",
    description: "Specialized in analyzing capital structures, debt-to-equity ratios, and optimal financing strategies for leveraged buyouts and growth capital investments.",
    icon: "TrendingUp",
    status: "active",
    accuracy: 94,
    sessions: 1247,
    expertise: ["LBO Analysis", "Debt Structuring", "Equity Optimization", "Risk Assessment"]
  },
  {
    id: 2,
    name: "Risk Mitigation AI",
    specialty: "Compliance & Regulatory Analysis",
    description: "Expert in identifying regulatory risks, compliance requirements, and mitigation strategies across multiple jurisdictions and financial regulations.",
    icon: "Shield",
    status: "active",
    accuracy: 97,
    sessions: 892,
    expertise: ["SEC Compliance", "FINRA Regulations", "Risk Management", "Audit Preparation"]
  },
  {
    id: 3,
    name: "Market Intelligence AI",
    specialty: "Investment Opportunities & Due Diligence",
    description: "Analyzes market trends, competitive landscapes, and investment opportunities across private equity, real estate, and alternative asset classes.",
    icon: "BarChart3",
    status: "active",
    accuracy: 91,
    sessions: 1563,
    expertise: ["Market Analysis", "Due Diligence", "Valuation", "Competitive Intelligence"]
  },
  {
    id: 4,
    name: "Portfolio Optimization AI",
    specialty: "Asset Allocation & Performance",
    description: "Optimizes portfolio composition, asset allocation strategies, and performance metrics for institutional investors and family offices.",
    icon: "PieChart",
    status: "offline",
    accuracy: 89,
    sessions: 734,
    expertise: ["Asset Allocation", "Portfolio Rebalancing", "Performance Attribution", "Risk-Return Optimization"]
  }];


  const participants = [
  {
    id: 1,
    name: "John Mitchell",
    role: "Executive",
    company: "OBXAlethia Capital",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14e598c76-1763294405398.png",
    avatarAlt: "Professional headshot of Caucasian male executive with short brown hair wearing navy blue suit and white shirt",
    status: "online",
    isHost: true,
    permissions: { canEdit: true, canShare: true }
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Legal Counsel",
    company: "Morrison & Associates",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10aeb7ca4-1763297143974.png",
    avatarAlt: "Professional headshot of Asian female lawyer with long black hair wearing charcoal gray blazer and white blouse",
    status: "online",
    isHost: false,
    permissions: { canEdit: true, canShare: true }
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Compliance Officer",
    company: "OBXAlethia Capital",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13790d79a-1763295637209.png",
    avatarAlt: "Professional headshot of Hispanic male compliance officer with short black hair wearing dark blue suit and light blue shirt",
    status: "online",
    isHost: false,
    permissions: { canEdit: false, canShare: true }
  },
  {
    id: 4,
    name: "Emily Thompson",
    role: "Financial Advisor",
    company: "Stratton Financial Group",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10cf7dfed-1763294953754.png",
    avatarAlt: "Professional headshot of Caucasian female financial advisor with shoulder-length blonde hair wearing burgundy blazer and cream blouse",
    status: "online",
    isHost: false,
    permissions: { canEdit: true, canShare: true }
  },
  {
    id: 5,
    name: "David Park",
    role: "External Advisor",
    company: "Park Consulting LLC",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
    avatarAlt: "Professional headshot of Asian male consultant with short black hair and glasses wearing gray suit and white shirt",
    status: "offline",
    isHost: false,
    permissions: { canEdit: false, canShare: false }
  }];


  const [messages, setMessages] = useState([
  {
    id: 1,
    sender: "Sarah Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10aeb7ca4-1763297143974.png",
    avatarAlt: "Professional headshot of Asian female lawyer with long black hair wearing charcoal gray blazer and white blouse",
    content: "I've reviewed the proposed capital structure for the real estate acquisition. The debt-to-equity ratio looks favorable, but we should consider the regulatory implications.",
    timestamp: new Date(Date.now() - 3600000),
    isCurrentUser: false
  },
  {
    id: 2,
    sender: "You",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14e598c76-1763294405398.png",
    avatarAlt: "Professional headshot of Caucasian male executive with short brown hair wearing navy blue suit and white shirt",
    content: "Agreed. Michael, can you provide an overview of the compliance requirements for this transaction?",
    timestamp: new Date(Date.now() - 3300000),
    isCurrentUser: true
  },
  {
    id: 3,
    sender: "Michael Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13790d79a-1763295637209.png",
    avatarAlt: "Professional headshot of Hispanic male compliance officer with short black hair wearing dark blue suit and light blue shirt",
    content: "I've prepared a comprehensive compliance checklist. The main considerations are SEC filing requirements and cross-border transaction regulations. I'll share the document now.",
    timestamp: new Date(Date.now() - 3000000),
    isCurrentUser: false,
    attachment: {
      name: "Compliance_Checklist_Q4_2025.pdf",
      size: "2.4 MB"
    }
  },
  {
    id: 4,
    sender: "Emily Thompson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10cf7dfed-1763294953754.png",
    avatarAlt: "Professional headshot of Caucasian female financial advisor with shoulder-length blonde hair wearing burgundy blazer and cream blouse",
    content: "From a financial perspective, the projected IRR of 18-22% aligns well with our investment thesis. However, we should run additional sensitivity analysis on the exit scenarios.",
    timestamp: new Date(Date.now() - 2700000),
    isCurrentUser: false
  }]
  );

  const recommendations = [
  {
    id: 1,
    title: "Optimize Capital Structure with Mezzanine Financing",
    description: "Analysis suggests incorporating $50M mezzanine debt layer to reduce equity requirements while maintaining acceptable leverage ratios. This structure provides 15% cost savings compared to senior debt alternatives.",
    impact: "High",
    confidence: 92,
    expectedROI: "+18-22%",
    timeline: "6-8 months",
    keyFactors: ["Lower Cost of Capital", "Tax Benefits", "Flexible Terms", "Reduced Dilution"],
    risks: [
    "Higher interest rates than senior debt (12-15% vs 6-8%)",
    "Subordination to senior lenders may limit operational flexibility",
    "Covenant restrictions could impact future financing options"]

  },
  {
    id: 2,
    title: "Implement Cross-Border Tax Optimization Strategy",
    description: "Establish holding company structure in jurisdiction with favorable tax treaties to reduce effective tax rate from 28% to 19%. Estimated annual savings of $4.2M based on projected EBITDA.",
    impact: "High",
    confidence: 88,
    expectedROI: "+$4.2M/year",
    timeline: "3-4 months",
    keyFactors: ["Tax Treaty Benefits", "Transfer Pricing", "Withholding Tax Reduction", "IP Structuring"],
    risks: [
    "Regulatory scrutiny from multiple jurisdictions",
    "BEPS compliance requirements may increase administrative costs",
    "Changes in international tax laws could impact effectiveness"]

  },
  {
    id: 3,
    title: "Accelerate Exit Timeline Through Strategic Partnerships",
    description: "Market analysis identifies three potential strategic buyers with 25-30% premium valuations. Initiating preliminary discussions could accelerate exit by 12-18 months while maximizing returns.",
    impact: "Medium",
    confidence: 76,
    expectedROI: "+25-30%",
    timeline: "12-18 months",
    keyFactors: ["Strategic Synergies", "Market Timing", "Competitive Bidding", "Premium Valuation"],
    risks: [
    "Premature disclosure could impact current operations",
    "Competitive dynamics may change during negotiation period",
    "Integration concerns could reduce final valuation"]

  }];


  const documents = [
  {
    id: 1,
    name: "Investment_Memorandum_RealEstate_Q4_2025.pdf",
    type: "pdf",
    size: "4.8 MB",
    uploadDate: new Date(Date.now() - 86400000),
    uploadedBy: "John Mitchell",
    status: "Signed",
    url: "#",
    requiresSignature: false,
    signatures: { signed: 5, required: 5 }
  },
  {
    id: 2,
    name: "Capital_Structure_Analysis.xlsx",
    type: "xlsx",
    size: "1.2 MB",
    uploadDate: new Date(Date.now() - 172800000),
    uploadedBy: "Emily Thompson",
    status: "Draft",
    url: "#",
    requiresSignature: false
  },
  {
    id: 3,
    name: "Compliance_Checklist_Q4_2025.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: new Date(Date.now() - 259200000),
    uploadedBy: "Michael Rodriguez",
    status: "Pending",
    url: "#",
    requiresSignature: true,
    signatures: { signed: 3, required: 5 }
  },
  {
    id: 4,
    name: "Due_Diligence_Report_Mining_Sector.pdf",
    type: "pdf",
    size: "6.7 MB",
    uploadDate: new Date(Date.now() - 345600000),
    uploadedBy: "Sarah Chen",
    status: "Signed",
    url: "#",
    requiresSignature: false,
    signatures: { signed: 5, required: 5 }
  },
  {
    id: 5,
    name: "Partnership_Agreement_Draft_v3.doc",
    type: "contract",
    size: "892 KB",
    uploadDate: new Date(Date.now() - 432000000),
    uploadedBy: "Sarah Chen",
    status: "Pending",
    url: "#",
    requiresSignature: true,
    signatures: { signed: 2, required: 5 }
  }];


  const handleStartSession = (advisor) => {
    setActiveAdvisor(advisor);
    setIsSessionActive(true);
    setActiveTab('session');
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setActiveAdvisor(null);
  };

  const handleSendMessage = (message) => {
    const newMessage = {
      id: messages?.length + 1,
      sender: "You",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14e598c76-1763294405398.png",
      avatarAlt: "Professional headshot of Caucasian male executive with short brown hair wearing navy blue suit and white shirt",
      content: message,
      timestamp: new Date(),
      isCurrentUser: true
    };
    setMessages([...messages, newMessage]);
  };

  const handleExecuteDecision = (recommendation) => {
    console.log('Executing decision:', recommendation);
    navigate('/smart-contract-manager');
  };

  const handleRemoveParticipant = (participantId) => {
    console.log('Removing participant:', participantId);
  };

  const handleUploadDocument = () => {
    console.log('Upload document');
  };

  const handleSignDocument = (doc) => {
    console.log('Sign document:', doc);
  };

  const handleShareDocument = (doc) => {
    console.log('Share document:', doc);
  };

  const tabs = [
  { id: 'advisors', label: 'AI Advisors', icon: 'Bot' },
  { id: 'session', label: 'Active Session', icon: 'Video' },
  { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
  { id: 'documents', label: 'Documents', icon: 'FolderOpen' }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="container mx-auto max-w-[1600px]">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Virtual Boardroom</h1>
                <p className="text-lg text-muted-foreground">
                  AI-powered advisory sessions and multi-party collaboration
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/smart-contract-manager')}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted/20 transition-colors text-sm font-medium text-foreground flex items-center gap-2">

                  <Icon name="FileText" size={18} />
                  <span>Contracts</span>
                </button>
                <button
                  onClick={() => navigate('/compliance-dashboard')}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted/20 transition-colors text-sm font-medium text-foreground flex items-center gap-2">

                  <Icon name="Shield" size={18} />
                  <span>Compliance</span>
                </button>
              </div>
            </div>

            {isSessionActive && activeAdvisor &&
            <div className="glass-surface rounded-xl p-4 elevation-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent p-0.5">
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <Icon name={activeAdvisor?.icon} size={24} color="var(--color-secondary)" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{activeAdvisor?.name}</h3>
                      <p className="text-sm text-muted-foreground">Active advisory session in progress</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-error/20">
                    <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                    <span className="text-sm font-medium text-error">Live Session</span>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="glass-surface rounded-xl p-2 mb-6 elevation-1">
            <div className="flex items-center gap-2 overflow-x-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab?.id ?
                'bg-secondary text-secondary-foreground' :
                'text-muted-foreground hover:bg-muted/20'}`
                }>

                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'advisors' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {advisors?.map((advisor) =>
                <AIAdvisorCard
                  key={advisor?.id}
                  advisor={advisor}
                  onStartSession={handleStartSession}
                  isActive={activeAdvisor?.id === advisor?.id} />

                )}
                </div>
              </div>

              <div className="space-y-6">
                <ParticipantsList
                participants={participants}
                onRemoveParticipant={handleRemoveParticipant} />

                <SessionControls
                isSessionActive={isSessionActive}
                onStartSession={() => handleStartSession(advisors?.[0])}
                onEndSession={handleEndSession}
                sessionDuration={0} />

              </div>
            </div>
          }

          {activeTab === 'session' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-[calc(100vh-280px)]">
                <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                participants={participants} />

              </div>

              <div className="space-y-6">
                <SessionControls
                isSessionActive={isSessionActive}
                onStartSession={() => handleStartSession(advisors?.[0])}
                onEndSession={handleEndSession}
                sessionDuration={0} />

                <ParticipantsList
                participants={participants}
                onRemoveParticipant={handleRemoveParticipant} />

              </div>
            </div>
          }

          {activeTab === 'recommendations' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DecisionSupportPanel
                recommendations={recommendations}
                onExecuteDecision={handleExecuteDecision} />

              </div>

              <div className="space-y-6">
                <ParticipantsList
                participants={participants}
                onRemoveParticipant={handleRemoveParticipant} />

                <div className="glass-surface rounded-xl p-6 elevation-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                    <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-success/10">
                      <p className="text-sm text-muted-foreground mb-1">Avg. Confidence</p>
                      <p className="text-2xl font-bold text-success">85%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/10">
                      <p className="text-sm text-muted-foreground mb-1">Expected ROI</p>
                      <p className="text-2xl font-bold text-accent">+21%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/10">
                      <p className="text-sm text-muted-foreground mb-1">Active Recommendations</p>
                      <p className="text-2xl font-bold text-secondary">{recommendations?.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {activeTab === 'documents' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DocumentManager
                documents={documents}
                onUpload={handleUploadDocument}
                onSign={handleSignDocument}
                onShare={handleShareDocument} />

              </div>

              <div className="space-y-6">
                <ParticipantsList
                participants={participants}
                onRemoveParticipant={handleRemoveParticipant} />

                <div className="glass-surface rounded-xl p-6 elevation-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="FileText" size={24} color="var(--color-accent)" />
                    <h3 className="text-lg font-semibold text-foreground">Document Stats</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                      <span className="text-sm text-muted-foreground">Signed</span>
                      <span className="text-lg font-bold text-success">
                        {documents?.filter((d) => d?.status === 'Signed')?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                      <span className="text-sm text-muted-foreground">Pending</span>
                      <span className="text-lg font-bold text-warning">
                        {documents?.filter((d) => d?.status === 'Pending')?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/10">
                      <span className="text-sm text-muted-foreground">Draft</span>
                      <span className="text-lg font-bold text-muted-foreground">
                        {documents?.filter((d) => d?.status === 'Draft')?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </main>
    </div>);

};

export default VirtualBoardroom;
