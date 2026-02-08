'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Diamond,
  Globe,
  GraduationCap,
  Gavel,
  Landmark,
  Layers3,
  LineChart,
  Lock,
  Pickaxe,
  ShieldCheck,
  Sparkles,
  Wallet,
  Wheat
} from 'lucide-react';
import { CapitalDeploymentChart, SectorAllocationChart } from './components/DashboardCharts';
import { generateDealSimulation } from './services/geminiService';
import { Industry, SimulationResult } from './types';

function App() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.FINANCE);
  const [dealDescription, setDealDescription] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [simulationError, setSimulationError] = useState<string | null>(null);

  const hasApiKey = Boolean(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

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
    setSimulationError(null);
    
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
      setSimulationError('Simulation failed to run. Please retry or verify your API key.');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060b] text-slate-100 font-sans">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(69,84,255,0.18),_transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0b0f22] to-transparent" />
        <div className="relative">
          <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">OBXAlethia</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">Agentic ERP</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-slate-400 md:flex">
              <span>Solutions</span>
              <span>Web3</span>
              <span>Agents</span>
              <span>Resources</span>
            </nav>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              Request Access
            </button>
          </header>

          <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-indigo-200">
                <Sparkles className="h-4 w-4" />
                Secure AI + Web3 ERP
              </p>
              <h1 className="text-4xl font-semibold text-white md:text-5xl">
                A digital contract chamber for institutional capital, agentic workflows, and decentralized borrowing.
              </h1>
              <p className="mt-6 text-base text-slate-400">
                Orchestrate multi-institution programs with on-chain governance, AI decisioning, and automated
                compliance. Align stakeholders, issue programmable contracts, and unlock capital across verticals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
                  Launch ERP <ArrowRight className="h-4 w-4" />
                </button>
                <button className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200">
                  View smart contracts
                </button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-400" /> SOC2-ready controls
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-cyan-400" /> Treasury-grade custody
                </div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-fuchsia-400" /> Agentic orchestration
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-900/50 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live AI Core</p>
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    hasApiKey
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200'
                      : 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                  }`}
                >
                  {hasApiKey ? 'Connected' : 'Local Mode'}
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Protocol status', value: 'Stable · 24/7 uptime' },
                  { label: 'Active institutions', value: '148 entities' },
                  { label: 'Capital in motion', value: '$12.4B' }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Agent OS</p>
                <p className="mt-2 text-sm text-slate-200">
                  Coordinate AI agents, n8n workflows, and smart contract hooks from a unified command layer.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
        {[
          {
            title: 'Digital Contract Chamber',
            description: 'Register institutions, projects, and smart-contract governance on-chain.',
            icon: <Layers3 className="h-5 w-5 text-indigo-300" />
          },
          {
            title: 'Decentralized Borrowing',
            description: 'Launch programmable pools for cross-border infrastructure financing.',
            icon: <Wallet className="h-5 w-5 text-cyan-300" />
          },
          {
            title: 'Agentic ERP Layer',
            description: 'Autonomous workflows for compliance, treasury, and vendor orchestration.',
            icon: <Bot className="h-5 w-5 text-fuchsia-300" />
          }
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_0_40px_rgba(15,23,42,0.45)]"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-sm text-slate-400">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Capital Intelligence</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Multi-vertical deployment map</h3>
              </div>
              <LineChart className="h-6 w-6 text-indigo-300" />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <h4 className="text-sm font-semibold text-white">Capital Velocity</h4>
                <CapitalDeploymentChart />
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <h4 className="text-sm font-semibold text-white">Sector Allocation</h4>
                <SectorAllocationChart />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Agentic Missions</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">AI + n8n orchestration hub</h3>
              <div className="mt-6 space-y-4">
                {[
                  'Deploy AI underwriting agents with compliance guardrails.',
                  'Trigger smart-contract releases via n8n workflows.',
                  'Connect treasury, risk, and procurement in real time.'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Secure Infrastructure</p>
              <div className="mt-4 grid gap-4">
                {[
                  { label: 'Custody & Escrow', icon: <Lock className="h-4 w-4 text-indigo-300" /> },
                  { label: 'Tokenized Workflows', icon: <Boxes className="h-4 w-4 text-cyan-300" /> },
                  { label: 'Zero-Trust Routing', icon: <Cpu className="h-4 w-4 text-fuchsia-300" /> }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-[#131624] via-[#0b0d1a] to-[#0f1329] p-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            <Sparkles className="h-4 w-4 text-indigo-300" /> Deal simulation workspace
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white">Anticipatory engine</h3>
          <p className="mt-2 text-sm text-slate-400">
            Feed complex transactions to the AI core and generate compliant smart contract plans in seconds.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  selectedIndustry === ind.id
                    ? 'border-indigo-500/60 bg-indigo-500/10 text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900">
                  {ind.icon}
                </span>
                {ind.label}
              </button>
            ))}
          </div>
          <textarea
            value={dealDescription}
            onChange={(e) => setDealDescription(e.target.value)}
            placeholder="Describe the infrastructure deal, capital structure, and compliance requirements..."
            className="mt-6 h-32 w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-500">*OpenAI is used as the primary engine. Gemini can be added as fallback.</p>
            <button
              onClick={handleSimulation}
              disabled={isSimulating || !dealDescription}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                isSimulating || !dealDescription
                  ? 'bg-slate-800 text-slate-500'
                  : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30'
              }`}
            >
              {isSimulating ? 'Processing' : 'Run simulation'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {simulationError && (
            <div className="mt-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
              {simulationError}
            </div>
          )}
          {simulationResult && (
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Simulation Output</p>
              <p className="mt-3 text-lg font-semibold text-white">{simulationResult.contractId}</p>
              <p className="mt-2 text-sm text-slate-400">{simulationResult.strategicInsight}</p>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">ERP Modules</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Unified operational cockpit</h3>
          <div className="mt-6 grid gap-4">
            {[
              { title: 'Treasury & Tokenization', subtitle: 'Cap tables, vesting, custody, and escrow.' },
              { title: 'Compliance & Risk', subtitle: 'KYC/AML, jurisdiction rules, audit trails.' },
              { title: 'Procurement & Supply', subtitle: 'Vendor management and smart contract routing.' },
              { title: 'Agent Studio', subtitle: 'Create AI agents and connect n8n workflows.' }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-xs text-slate-400">{item.subtitle}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Access</p>
            <p className="mt-2 text-sm text-slate-200">
              Launch private workspaces, invite institutions, and map permissions to on-chain roles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
