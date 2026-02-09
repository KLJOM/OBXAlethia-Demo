import Link from 'next/link';

const agents = [
  {
    name: 'Capital Strategist',
    role: 'Structuring & covenant agent',
    responsibilities: ['Optimize capital stack', 'Assess regulatory triggers', 'Draft governance clauses']
  },
  {
    name: 'Risk Sentinel',
    role: 'Risk & compliance analyst',
    responsibilities: ['Continuous KYC/AML checks', 'Fraud scoring', 'Audit trail verification']
  },
  {
    name: 'Settlement Orchestrator',
    role: 'Escrow + settlement agent',
    responsibilities: ['Milestone releases', 'Multi-sig coordination', 'Cross-chain settlement']
  },
  {
    name: 'Insights Compiler',
    role: 'AI analytics agent',
    responsibilities: ['Predictive analytics', 'Performance dashboards', 'Investor reporting']
  }
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#05060b] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white">
          ← Back to overview
        </Link>
        <h1 className="mt-6 text-4xl font-semibold text-white">Agent Mesh</h1>
        <p className="mt-4 text-sm text-slate-300">
          Company-native AI agents run continuously in the background without dependency on n8n. Each agent exposes a
          direct API and can be orchestrated by the internal scheduler or by human approvals.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {agents.map((agent) => (
            <div key={agent.name} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                  online
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{agent.role}</p>
              <div className="mt-4 space-y-2 text-xs text-slate-400">
                {agent.responsibilities.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
