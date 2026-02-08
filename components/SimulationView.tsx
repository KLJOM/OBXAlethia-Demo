import React from 'react';
import { SimulationResult } from '../types';
import { ShieldCheck, Layers, AlertTriangle, FileText, BrainCircuit } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface SimulationViewProps {
  result: SimulationResult;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const SimulationView: React.FC<SimulationViewProps> = ({ result }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-slate-900 border border-slate-800 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Anticipatory Protocol Initiated
          </h2>
          <p className="text-slate-400 text-sm mt-1">Contract Hash: <span className="font-mono text-slate-200">{result.contractId}</span></p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
           {result.mode && (
             <span
               className={`px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-wider ${
                 result.mode === 'live'
                   ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                   : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
               }`}
             >
               {result.mode === 'live' ? 'Live AI' : 'Local Simulation'}
             </span>
           )}
           <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
             Optimized
           </span>
           <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
             Legally Sealed
           </span>
        </div>
      </div>

      {result.warnings && result.warnings.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs md:text-sm rounded-lg p-3">
          <p className="font-semibold uppercase tracking-wider mb-1">Engine Notice</p>
          <ul className="list-disc list-inside space-y-1 text-amber-100/90">
            {result.warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Structure & Steps */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Smart Contract Execution Structure
            </h3>
            <div className="relative border-l-2 border-indigo-500/30 ml-3 space-y-8 pl-8 py-2">
              {result.structure.map((step, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-indigo-900 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-white z-10">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed group-hover:text-indigo-200 transition-colors">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
              Strategic Insight (Founder's Logic)
            </h3>
            <p className="text-slate-300 italic border-l-4 border-purple-500 pl-4 py-2 bg-purple-500/5 rounded-r">
              "{result.strategicInsight}"
            </p>
          </div>
        </div>

        {/* Right Column: Capital & Risks */}
        <div className="space-y-6">
          
          {/* Capital Stack Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Capital Stack</h3>
             <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={result.capitalStack}
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="percentage"
                    >
                      {result.capitalStack.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="space-y-2 mt-2">
               {result.capitalStack.map((item, idx) => (
                 <div key={idx} className="flex justify-between text-xs text-slate-300 border-b border-slate-800 pb-1">
                   <span>{item.source}</span>
                   <span className="font-mono text-cyan-400">{item.amount}</span>
                 </div>
               ))}
             </div>
          </div>

          {/* Risk Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Risk & Mitigation
            </h3>
            <div className="space-y-4">
              {result.riskMatrix.map((risk, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-200">{risk.category}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase 
                      ${risk.level === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                        risk.level === 'High' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'}`}>
                      {risk.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-tight">{risk.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Compliance
            </h3>
            <ul className="space-y-2">
              {result.complianceChecklist.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
