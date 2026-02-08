import { Industry, SimulationResult } from "../types";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const industryProfiles: Record<
  Industry,
  {
    focus: string;
    regulators: string[];
    boardSeats: string[];
    capitalStack: { source: string; percentage: number }[];
  }
> = {
  [Industry.ART]: {
    focus: "auction escrow, provenance validation, and tokenized collections",
    regulators: ["OFAC screening", "AML5 compliance", "cross-border cultural asset permits"],
    boardSeats: ["Art market specialist", "AML compliance officer", "Tokenization counsel"],
    capitalStack: [
      { source: "Collector syndicate equity", percentage: 45 },
      { source: "Tokenized revenue share", percentage: 25 },
      { source: "Museum-backed credit", percentage: 15 },
      { source: "DeFi liquidity tranches", percentage: 15 }
    ]
  },
  [Industry.FINANCE]: {
    focus: "structured DeFi liquidity, leveraged buyouts, and covenant design",
    regulators: ["KYC/AML program", "SEC/FINRA reporting", "cross-border capital controls"],
    boardSeats: ["PE operating partner", "DeFi risk strategist", "Regulatory counsel"],
    capitalStack: [
      { source: "Institutional equity", percentage: 55 },
      { source: "DeFi senior debt", percentage: 25 },
      { source: "Mezzanine notes", percentage: 15 },
      { source: "Founder rollover", percentage: 5 }
    ]
  },
  [Industry.REAL_ESTATE]: {
    focus: "title tokenization, zoning clearances, and cash-flow securitization",
    regulators: ["Title registry audit", "zoning compliance", "REIT disclosure rules"],
    boardSeats: ["Real estate counsel", "Asset manager", "Tokenization architect"],
    capitalStack: [
      { source: "Institutional equity", percentage: 50 },
      { source: "Tokenized debt", percentage: 30 },
      { source: "Construction credit", percentage: 15 },
      { source: "Sponsor equity", percentage: 5 }
    ]
  },
  [Industry.MINING]: {
    focus: "resource extraction rights, ESG covenants, and commodity hedging",
    regulators: ["Environmental permits", "sovereign mining lease approvals", "ESG audit trail"],
    boardSeats: ["Mining operator", "ESG lead", "Commodity risk advisor"],
    capitalStack: [
      { source: "Infrastructure equity", percentage: 40 },
      { source: "Commodity-backed debt", percentage: 30 },
      { source: "Streaming agreement", percentage: 20 },
      { source: "Strategic sponsor", percentage: 10 }
    ]
  },
  [Industry.EDUCATION]: {
    focus: "outcomes-based financing, accreditation, and digital credentialing",
    regulators: ["FERPA compliance", "accreditation review", "data privacy assessments"],
    boardSeats: ["EdTech strategist", "Compliance lead", "Student outcomes advisor"],
    capitalStack: [
      { source: "Impact equity", percentage: 45 },
      { source: "Revenue share notes", percentage: 25 },
      { source: "Government grant match", percentage: 20 },
      { source: "Philanthropic tranche", percentage: 10 }
    ]
  },
  [Industry.AGRICULTURE]: {
    focus: "land-rights tokenization, yield forecasting, and supply-chain contracts",
    regulators: ["Water rights audit", "export controls", "food safety compliance"],
    boardSeats: ["Agri-ops lead", "Supply chain specialist", "Sustainability officer"],
    capitalStack: [
      { source: "Institutional farmland equity", percentage: 50 },
      { source: "Tokenized crop prepay", percentage: 25 },
      { source: "Equipment lease facility", percentage: 15 },
      { source: "Local co-op investment", percentage: 10 }
    ]
  }
};

const parseEstimatedRaise = (description: string): number => {
  const match = description.match(/(?:\\$|USD\\s?)([\\d,.]+)\\s*([mbt]?)/i);
  if (!match) return 300;
  const numericValue = Number.parseFloat(match[1].replace(/,/g, ""));
  if (Number.isNaN(numericValue)) return 300;
  const suffix = match[2]?.toLowerCase();
  if (suffix === "b") return numericValue * 1000;
  if (suffix === "t") return numericValue * 1000000;
  if (suffix === "m") return numericValue;
  return numericValue;
};

const formatAmount = (amountMillions: number): string => {
  if (amountMillions >= 1000) {
    return `$${(amountMillions / 1000).toFixed(1)}B`;
  }
  return `$${amountMillions.toFixed(0)}M`;
};

const buildLocalSimulation = (description: string, industry: Industry): SimulationResult => {
  const profile = industryProfiles[industry];
  const estimatedRaise = parseEstimatedRaise(description);
  const hashSeed = Array.from(description).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const contractId = `0xLOCAL${(hashSeed % 1000000).toString(16).padStart(6, "0")}`;

  const structure = [
    `Initiate multi-sig escrow and tokenize underwriting package for ${industry.toLowerCase()}.`,
    `Deploy compliance gate with ${profile.regulators[0]} and attestations.`,
    `Allocate capital stack across ${profile.capitalStack.map((entry) => entry.source).join(", ")}.`,
    "Lock milestone tranches to operational KPIs and covenant compliance.",
    "Execute cross-border settlement with automated reporting & audit trail."
  ];

  const capitalStack = profile.capitalStack.map((entry) => {
    const amount = (estimatedRaise * entry.percentage) / 100;
    return {
      source: entry.source,
      percentage: entry.percentage,
      amount: formatAmount(amount)
    };
  });

  const riskMatrix = [
    {
      category: "Regulatory",
      level: "High" as const,
      mitigation: profile.regulators.join("; ")
    },
    {
      category: "Liquidity",
      level: "Medium" as const,
      mitigation: "Stage drawdowns and hedge exposures using on-chain liquidity buffers."
    },
    {
      category: "Execution",
      level: "Medium" as const,
      mitigation: "Embed KPI oracles and contingency triggers for delayed milestones."
    }
  ];

  const complianceChecklist = [
    ...profile.regulators,
    "KYC/AML verification complete",
    "Board resolution notarized on-chain",
    "Data residency & privacy review"
  ];

  const strategicInsight = `Concentrate board seats around ${profile.boardSeats.join(
    ", "
  )} to accelerate approvals. Focus on ${profile.focus} while staging capital to protect downside during volatility.`;

  return {
    contractId,
    structure,
    riskMatrix,
    capitalStack,
    complianceChecklist,
    strategicInsight,
    mode: "local",
    warnings: [
      "Running in local simulation mode. Add NEXT_PUBLIC_OPENAI_API_KEY to enable live AI generation."
    ]
  };
};

export const generateDealSimulation = async (
  description: string,
  industry: Industry
): Promise<SimulationResult> => {
  const modelId = "gpt-4o-mini";

  const prompt = `
    You are the OBXAlethia Core AI, an expert in ${industry}, Smart Contracts, DeFi, and Global Logistics.
    
    Analyze the following high-value deal scenario: "${description}"
    
    Generate a JSON response representing an "Anticipatory Smart Contract" structure.
    You must apply expert knowledge in:
    - Stages of growth and capital requirements.
    - Risk mitigation and regulatory compliance (KYC/AML/Cross-border).
    - Board composition strategy.
    
    The output must strictly follow this schema.
  `;

  try {
    if (!apiKey) {
      return buildLocalSimulation(description, industry);
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelId,
        input: prompt,
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed: ${response.status}`);
    }

    const data = (await response.json()) as {
      output?: Array<{ content?: Array<{ type: string; text?: string }> }>;
    };
    const text = data.output?.[0]?.content?.find((item) => item.type === "output_text")?.text;

    if (text) {
      const parsed = JSON.parse(text) as SimulationResult;
      return {
        ...parsed,
        mode: "live"
      };
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Simulation failed:", error);
    return buildLocalSimulation(description, industry);
  }
};
