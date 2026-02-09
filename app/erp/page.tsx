import Link from 'next/link';

const departments = [
  {
    title: 'Human Resources',
    detail: 'Talent pipeline, compensation modeling, compliance workflows, and executive approvals.'
  },
  {
    title: 'Insurance',
    detail: 'Policy registry, risk coverage tracking, and claims automation with audit-ready logs.'
  },
  {
    title: 'Marketing',
    detail: 'Campaign orchestration, attribution analytics, and budget governance tied to KPIs.'
  },
  {
    title: 'Accounting',
    detail: 'Ledger integrity, reconciliations, tax readiness, and real-time treasury reporting.'
  },
  {
    title: 'Financial Management',
    detail: 'Liquidity forecasting, capital allocation, and multi-sig approvals for spend controls.'
  },
  {
    title: 'Legal',
    detail: 'Contract lifecycle management, arbitration workflows, and regulatory evidence vault.'
  },
  {
    title: 'Investment Management',
    detail: 'Portfolio construction, risk limits, and on-chain settlement for institutional strategies.'
  }
];

const operatingLayers = [
  'Governance: board-ready approvals and audit trails',
  'Custody: institutional-grade key management and policy enforcement',
  'Automation: AI-driven analysis with human confirmation gates',
  'Compliance: KYC/AML, taxation, and retention policies'
];

export default function ERPPage() {
  return (
    <div className="min-h-screen bg-[#05060b] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white">
          ← Back to overview
        </Link>
        <h1 className="mt-6 text-4xl font-semibold text-white">Institutional ERP Workspace</h1>
        <p className="mt-4 text-sm text-slate-300">
          A unified operational layer for finance, governance, compliance, and strategy. Every module connects to the
          same containerized data model and institutional approval stack.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <div key={department.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-semibold text-white">{department.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{department.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Operating layers</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {operatingLayers.map((layer) => (
              <div key={layer} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                {layer}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
