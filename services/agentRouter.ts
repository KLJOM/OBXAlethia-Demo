import { Industry } from '../types';

export type AgentProfile = {
  name: string;
  role: string;
  focus: string;
  backgroundStatus: 'online' | 'warming' | 'offline';
  runbook: string[];
};

const agentMap: Record<Industry, AgentProfile> = {
  [Industry.ART]: {
    name: 'Curation Sentinel',
    role: 'NFT provenance & auction escrow agent',
    focus: 'Provenance attestation, escrow logic, and cultural asset compliance.',
    backgroundStatus: 'online',
    runbook: ['Validate provenance ledger', 'Set escrow milestones', 'Attach AML guardrails']
  },
  [Industry.FINANCE]: {
    name: 'Capital Strategist',
    role: 'Private equity + DeFi structuring agent',
    focus: 'Capital stack optimization, covenant logic, and compliance checks.',
    backgroundStatus: 'online',
    runbook: ['Score risk exposure', 'Design covenant triggers', 'Assemble reporting pack']
  },
  [Industry.REAL_ESTATE]: {
    name: 'Title & Escrow Officer',
    role: 'Tokenized real estate agent',
    focus: 'Title tokenization, zoning constraints, and escrow flows.',
    backgroundStatus: 'online',
    runbook: ['Verify title status', 'Assess zoning risk', 'Lock escrow payouts']
  },
  [Industry.MINING]: {
    name: 'Resource Hedging Agent',
    role: 'Mining operations & ESG agent',
    focus: 'ESG safeguards, commodity hedging, and lease validation.',
    backgroundStatus: 'online',
    runbook: ['Check lease approvals', 'Model commodity hedges', 'Attach ESG attestation']
  },
  [Industry.EDUCATION]: {
    name: 'Outcomes Analyst',
    role: 'Education finance agent',
    focus: 'Outcomes-based pricing and accreditation review.',
    backgroundStatus: 'online',
    runbook: ['Validate accreditation', 'Model outcome covenants', 'Prepare reporting cadence']
  },
  [Industry.AGRICULTURE]: {
    name: 'Supply Chain Guardian',
    role: 'Agri-finance agent',
    focus: 'Supply-chain provenance, land rights, and yield modeling.',
    backgroundStatus: 'online',
    runbook: ['Verify land rights', 'Assess yield variance', 'Attach export compliance']
  }
};

export const activateAgentForIndustry = (industry: Industry): AgentProfile => {
  return agentMap[industry];
};
