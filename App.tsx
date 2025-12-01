import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp, 
  Menu, 
  X,
  Diamond,
  Gavel,
  Landmark,
  Pickaxe,
  GraduationCap,
  Wheat,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { CapitalDeploymentChart, SectorAllocationChart } from './components/DashboardCharts';
import { SimulationView } from './components/SimulationView';
import { generateDealSimulation } from './services/geminiService';
import { Industry, SimulationResult } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'engine'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.FINANCE);
  const [dealDescription, setDealDescription] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const industries = [
    { id: Industry.ART, icon: <Diamond className="w-4 h-4" />, label: 'Art World' },
    { id: Industry.FINANCE, icon: <Landmark className="w-4 h-4" />, label: 'DeFi & PE' },
    { id: Industry.REAL_ESTATE, icon: <Gavel className="w-4 h-4" />, label: 'Real Estate' },
    { id: Industry.MINING, icon: <Pickaxe className="w-4 h-4" />, label: 'Mining' },
    { id: Industry.EDUCATION, icon: <GraduationCap className="w-4 h-4" />, label: 'Education' },
    { id: Industry.AGRICULTURE, icon: <Wheat className="w-4 h-4" />, label: 'Agriculture' },
  ];

  const handleSimulation = async () => {
    if (!dealDescription.trim()) return;
    setIsSimulating(true);
    setSimulationResult(null);
    
    // Simulate API delay for dramatic effect if response is too fast
    const start = Date.now();
    
    try {
      const result = await generateDealSimulation(dealDescription, selectedIndustry);
      const elapsed = Date.now() - start;
      const minDelay = 1500;
      
      if (elapsed < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
      }
      setSimulationResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Globe className="text-white w-6 h-6" />
             </div>
             <div>
               <h1 className="font-bold text-xl text-white tracking-tight">AETHERIUS</h1>
               <p className="text-[10px] text-slate-400 tracking-widest uppercase">Series A: $35B</p>
             </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <button 
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Executive Dashboard
          </button>
          
          <button 
             onClick={() => { setActiveTab('engine'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'engine' ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-600/20' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Zap className="w-5 h-5" />
            Anticipatory Engine
          </button>

          <div className="pt-8 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Enterprise Solutions
          </div>
          {['Active Contracts', 'Venture Screening', 'Risk Management', 'Board Composition'].map((item) => (
             <button key={item} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
               <TrendingUp className="w-4 h-4 opacity-50" />
               {item}
             </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
               <img src="https://picsum.photos/100/100" alt="Founder" className="w-full h-full object-cover opacity-80" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Founder & CEO</p>
              <p className="text-xs text-slate-500">Global Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="text-indigo-500 w-6 h-6" />
            <span className="font-bold text-white">AETHERIUS</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="text-slate-200">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          <div className="space-y-8 animate-fade-in">
             <header className="mb-8">
               <h2 className="text-3xl font-bold text-white tracking-tight">Executive Overview</h2>
               <p className="text-slate-400 mt-2 max-w-2xl">
                 Real-time monitoring of decentralized capital deployment, smart contract velocity, and industry penetration across global markets.
               </p>
             </header>

             {/* KPIs */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'AUM (Series A)', value: '$35.0B', change: '+0%', neutral: true },
                  { label: 'Active Contracts', value: '1,204', change: '+12.5%', positive: true },
                  { label: 'Deploy Speed', value: '45ms', change: '-18%', positive: true }, // Lower is better
                  { label: 'Risk Adjusted Returns', value: '24.8%', change: '+2.4%', positive: true },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/30 transition-colors">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${stat.neutral ? 'bg-slate-800 text-slate-400' : stat.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
             </div>

             {/* Charts Area */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-6">Capital Deployment Velocity</h3>
                  <CapitalDeploymentChart />
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-6">Sector Allocation (Billions)</h3>
                  <SectorAllocationChart />
                </div>
             </div>

             {/* Recent Activity */}
             <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
               <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-white">Live Contract Feed</h3>
                 <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View All Transactions</button>
               </div>
               <div className="divide-y divide-slate-800">
                 {[
                   { id: '0x8f...2a', type: 'LBO Execution', industry: 'Mining', value: '$450M', status: 'Verifying' },
                   { id: '0xa1...9b', type: 'Auction Escrow', industry: 'Art World', value: '$22M', status: 'Complete' },
                   { id: '0x4c...11', type: 'DeFi Liquidity', industry: 'Finance', value: '$1.2B', status: 'Processing' },
                   { id: '0xb2...ff', type: 'Land Deed Token', industry: 'Agriculture', value: '$85M', status: 'Complete' },
                 ].map((tx, idx) => (
                   <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                       <div className={`w-2 h-2 rounded-full ${tx.status === 'Complete' ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`}></div>
                       <div>
                         <p className="text-sm font-medium text-white">{tx.type}</p>
                         <p className="text-xs text-slate-500 font-mono">{tx.id} • {tx.industry}</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <p className="text-sm font-bold text-white">{tx.value}</p>
                       <p className="text-xs text-slate-500">{tx.status}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
              <div>
                <h2 className="text-3xl font-bold text-cyan-400 tracking-tight flex items-center gap-3">
                  <Zap className="w-8 h-8" />
                  Anticipatory Engine
                </h2>
                <p className="text-slate-400 mt-2">
                  Input complex deal parameters. The engine anticipates capital needs, regulatory friction, and structural requirements using blockchain logic.
                </p>
              </div>
            </header>

            {/* Input Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Select Industry Vertical
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedIndustry === ind.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                      >
                        <div className="mb-2">{ind.icon}</div>
                        <span className="text-xs font-medium text-center">{ind.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-2">Founder's Note</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    "This engine leverages my pattern recognition algorithms honed through years of PE and DeFi experience. It doesn't just process; it anticipates scarcity and regulatory bottlenecks before they occur."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-slate-950 rounded-lg p-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Describe Deal Parameters & Objectives
                    </label>
                    <textarea
                      value={dealDescription}
                      onChange={(e) => setDealDescription(e.target.value)}
                      placeholder="e.g., Initiating an LBO for a mid-cap lithium mine in Western Australia. Need structure for a $400M raise utilizing 30% DeFi bonds and 70% institutional equity. Compliance needed for cross-border asset transfer..."
                      className="w-full h-40 bg-slate-900 border border-slate-800 rounded-lg p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none font-mono text-sm"
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-slate-500">
                        *Engine runs on Gemini 2.5 Flash for high-speed reasoning.
                      </span>
                      <button
                        onClick={handleSimulation}
                        disabled={isSimulating || !dealDescription}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm shadow-lg transition-all ${isSimulating || !dealDescription ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:shadow-indigo-500/25 hover:scale-105 active:scale-95'}`}
                      >
                        {isSimulating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Processing Protocols...
                          </>
                        ) : (
                          <>
                            Initiate Anticipatory Protocol <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {simulationResult && <SimulationView result={simulationResult} />}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
