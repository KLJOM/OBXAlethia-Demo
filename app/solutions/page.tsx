import Link from 'next/link';

const solutions = [
  {
    title: 'Deal Containers',
    detail: 'Isolated workspaces with permissions, storage, and analytics for each transaction.'
  },
  {
    title: 'Digital Signatures',
    detail: 'Policy-driven signing flows with hardware wallet support and audit trails.'
  },
  {
    title: 'Escrow & Arbitration',
    detail: 'On-chain escrow with programmable release conditions and arbitration modules.'
  },
  {
    title: 'Revenue Automation',
    detail: 'Royalty distribution, subscription logic, and revenue sharing across stakeholders.'
  }
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#05060b] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white">
          ← Back to overview
        </Link>
        <h1 className="mt-6 text-4xl font-semibold text-white">Solutions</h1>
        <p className="mt-4 text-sm text-slate-300">
          Institutional-grade modules that unify smart contracts, AI decisioning, and operational governance.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <div key={solution.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-semibold text-white">{solution.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{solution.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
