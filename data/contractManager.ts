export const contractTemplates = [
  {
    name: "Series A Investment Agreement",
    category: "Private Equity",
    complexity: "High",
    deployCost: "0.0245 ETH",
    avgTime: "3-5 min",
    compliance: ["SEC Reg D", "Accredited Investor", "KYC/AML"]
  },
  {
    name: "Commercial Property Lease",
    category: "Real Estate",
    complexity: "Medium",
    deployCost: "0.0189 ETH",
    avgTime: "2-3 min",
    compliance: ["Property Law", "Zoning", "Insurance"]
  },
  {
    name: "Agricultural Futures Contract",
    category: "Agriculture",
    complexity: "Medium",
    deployCost: "0.0198 ETH",
    avgTime: "2-4 min",
    compliance: ["CFTC", "Commodity Exchange", "USDA"]
  },
  {
    name: "Mining Rights Partnership",
    category: "Mining & Energy",
    complexity: "High",
    deployCost: "0.0267 ETH",
    avgTime: "4-6 min",
    compliance: ["EPA", "Mining Law", "Environmental"]
  },
  {
    name: "Tokenized Artwork Sale",
    category: "Art & Collectibles",
    complexity: "Low",
    deployCost: "0.0156 ETH",
    avgTime: "1-2 min",
    compliance: ["Copyright", "Authenticity", "Tax"]
  },
  {
    name: "Education Funding Agreement",
    category: "Education",
    complexity: "Medium",
    deployCost: "0.0178 ETH",
    avgTime: "2-3 min",
    compliance: ["Student Loan", "Privacy", "Accreditation"]
  }
];

export const activeContracts = [
  {
    name: "TechCorp Series A Investment",
    type: "Private Equity",
    status: "Active",
    parties: ["Goldman Sachs Ventures", "TechCorp Inc.", "Wilson & Partners LLP"],
    progress: 75,
    deployedAt: "2025-12-03",
    txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    blockchainUrl: "https://etherscan.io/tx/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  },
  {
    name: "Manhattan Office Lease 2025",
    type: "Real Estate",
    status: "Pending",
    parties: ["Blackstone Real Estate", "WeWork Global", "Cushman & Wakefield"],
    progress: 45,
    deployedAt: "2025-12-02",
    txHash: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    blockchainUrl: "https://etherscan.io/tx/0x8ba1f109551bD432803012645Ac136ddd64DBA72"
  },
  {
    name: "Wheat Futures Q1 2026",
    type: "Agriculture",
    status: "Active",
    parties: ["Cargill Trading", "Midwest Farmers Co-op", "Chicago Mercantile Exchange"],
    progress: 90,
    deployedAt: "2025-11-28",
    txHash: "0x1c8aff950685c2ed4bc3174f3472287b56d9517b",
    blockchainUrl: "https://etherscan.io/tx/0x1c8aff950685c2ed4bc3174f3472287b56d9517b"
  }
];

export const deploymentHighlights = [
  {
    label: "Multi-sig requirement",
    value: "2-of-3",
    description: "Dual signature controls with escrow gating"
  },
  {
    label: "Gas priority",
    value: "Medium",
    description: "Target confirmation in ~3 minutes"
  },
  {
    label: "Compliance gate",
    value: "Active",
    description: "Automated checks before execution"
  }
];
