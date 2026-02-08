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
import { aiAgents } from './data/aiAgents';
import { contractTemplates, activeContracts, deploymentHighlights } from './data/contractManager';
import { enterpriseIntegrations, enterpriseModules } from './data/enterpriseModules';
import { infrastructureFeatures, industryCoverage } from './data/infrastructureFeatures';
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

  const quickPrompts = [
    {
      industry: Industry.MINING,
      label: 'Lithium LBO',
      prompt:
        'Initiating an LBO for a mid-cap lithium mine in Western Australia. Need a $400M raise utilizing 30% DeFi bonds and 70% institutional equity. Ensure cross-border asset transfer compliance.'
    },
    {
      industry: Industry.REAL_ESTATE,
      label: 'Tokenized Tower',
      prompt:
        'Tokenize a $180M commercial tower in Dubai with REIT-backed debt, aiming for a 24-month stabilization and ESG reporting for global LPs.'
    },
    {
      industry: Industry.ART,
      label: 'Auction Escrow',
      prompt:
        'Structure a $60M escrow for a rotating collection of contemporary art with provenance verification, auction settlement, and AML safeguards.'
    }
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

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Enterprise infrastructure</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Institutional-grade capabilities</h3>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Next.js core
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {infrastructureFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-sm font-semibold text-white">{feature.title}</p>
                <p className="mt-3 text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            {industryCoverage.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-slate-400"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Smart contract manager</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Deployment-ready templates</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {contractTemplates.map((template) => (
                <div key={template.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{template.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{template.category}</p>
                    </div>
                    <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {template.complexity}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full border border-slate-800 px-2 py-1">Cost: {template.deployCost}</span>
                    <span className="rounded-full border border-slate-800 px-2 py-1">Avg: {template.avgTime}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">
                    {template.compliance.map((req) => (
                      <span key={req} className="rounded-full border border-slate-800 px-2 py-1">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Deployment telemetry</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Execution workspace</h3>
              <div className="mt-6 space-y-4">
                {deploymentHighlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-xs text-slate-400">{item.description}</p>
                  </div>
                ))}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-2">Founder's Note</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    "This engine leverages my pattern recognition algorithms honed through years of PE and DeFi experience. It doesn't just process; it anticipates scarcity and regulatory bottlenecks before they occur."
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Engine Status</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${hasApiKey ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}`}>
                      {hasApiKey ? 'Live AI Enabled' : 'Local Mode'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {hasApiKey
                      ? 'OpenAI is connected for live reasoning and structured outputs.'
                      : 'Add NEXT_PUBLIC_OPENAI_API_KEY to .env.local to enable live AI generation.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active contracts</p>
              <div className="mt-4 space-y-4">
                {activeContracts.map((contract) => (
                  <div key={contract.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">{contract.name}</p>
                      <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {contract.status}
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
                        *Engine runs on OpenAI for high-speed reasoning.
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{contract.type}</p>
                    <p className="mt-2 text-xs text-slate-400">Parties: {contract.parties.join(', ')}</p>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                        style={{ width: `${contract.progress}%` }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>Deployed {contract.deployedAt}</span>
                      {contract.blockchainUrl ? (
                        <a
                          href={contract.blockchainUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          {contract.txHash.slice(0, 10)}…
                        </a>
                      ) : (
                        <span>{contract.txHash.slice(0, 10)}…</span>
                      )}
                    </div>
                  </div>
                ))}
                      <span>{contract.txHash.slice(0, 10)}…</span>
                    </div>

                    <div className="mt-6 border-t border-slate-800 pt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Launch Prompts</p>
                      <div className="flex flex-wrap gap-2">
                        {quickPrompts.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => {
                              setSelectedIndustry(item.industry);
                              setDealDescription(item.prompt);
                            }}
                            className="text-xs px-3 py-2 rounded-full border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-indigo-500/50 hover:text-white transition"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                </div>

                {simulationError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-lg p-4">
                    {simulationError}
                  </div>
                )}

                {simulationResult && <SimulationView result={simulationResult} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">AI agents</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Operational agent mesh</h3>
          <p className="mt-3 text-sm text-slate-400">
            Implemented workflows combine n8n automation, specialized agent roles, and enterprise integrations.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiAgents.map((agent) => (
              <div key={agent.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-sm font-semibold text-white">{agent.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{agent.focus}</p>
                <p className="mt-3 text-sm text-slate-400">{agent.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-400">
                  {agent.integrations.map((tool) => (
                    <span key={tool} className="rounded-full border border-slate-800 px-2 py-1">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400">
            Each agent profile includes automation hooks and enterprise integrations aligned to the OBXAlethia
            operating model.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Enterprise modules</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">ERP intelligence workspace</h3>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Integrated
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Reintroduced advisory, compliance, analytics, and negotiation tooling as modular surfaces aligned to the
            Next.js experience.
          </p>
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400">
            OBXAlethia unifies TypeScript/React, CSS, PostCSS, HTML, and Solidity workflows to deliver AI-driven,
            web3-native infrastructure operations with consistent data flow and deployment tooling.
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enterpriseModules.map((module) => (
              <div key={module.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{module.title}</p>
                  <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    {module.category}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-400">{module.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-400">
                  {module.primaryActions.map((action) => (
                    <span key={action} className="rounded-full border border-slate-800 px-2 py-1">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-[11px] text-slate-400">
            {enterpriseIntegrations.map((integration) => (
              <span key={integration} className="rounded-full border border-slate-800 px-3 py-1">
                {integration}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
