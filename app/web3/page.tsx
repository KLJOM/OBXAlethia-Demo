import Link from 'next/link';

const pillars = [
  {
    title: 'Tokenization Engine',
    description:
      'ERC-20/721/1155 issuance, fractionalization, and token lifecycle management with upgrade-safe modules.'
  },
  {
    title: 'Cross-Chain Routing',
    description:
      'Bridge aggregation across Ethereum, BSC, Solana, and rollups with compliance-aware routing policies.'
  },
  {
    title: 'Custody + Governance',
    description:
      'Multi-sig workflows, policy-based approvals, and delegated signing for institutional execution.'
  },
  {
    title: 'Event Indexing',
    description:
      'The Graph subgraphs plus internal indexers for fast queries of token, container, and wallet activity.'
  }
];

const workflows = [
  {
    title: 'Tokenized Infrastructure',
    detail: 'Issue asset-backed tokens with escrowed milestones, KPI triggers, and compliance attestations.'
  },
  {
    title: 'Programmable Royalties',
    detail: 'Automate revenue shares for IP, licensing, and fractional ownership with real-time reporting.'
  },
  {
    title: 'Institutional Treasury',
    detail: 'Policy-driven swaps, stablecoin management, and yield strategies with human approval gates.'
  }
];

export default function Web3Page() {
  return (
    <div className="min-h-screen bg-[#05060b] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white">
          ← Back to overview
        </Link>
        <h1 className="mt-6 text-4xl font-semibold text-white">Web3 Infrastructure Stack</h1>
        <p className="mt-4 text-sm text-slate-300">
          A production-grade on-chain foundation for tokenization, cross-chain liquidity, custody, and event-driven
          workflows.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live workflows</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {workflows.map((workflow) => (
              <div key={workflow.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <h4 className="text-sm font-semibold text-white">{workflow.title}</h4>
                <p className="mt-2 text-xs text-slate-400">{workflow.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
