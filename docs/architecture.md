# OBXAlethia Web3 ERP Architecture

## System Overview
OBXAlethia is a Web3-native infrastructure gateway that combines a custom blockchain, modular smart contracts, and an AI-assisted ERP layer. The platform organizes work into transaction containers that isolate permissions, storage, and analytics while still emitting on-chain events for transparency.

## Platform Scope & Core Modules

### Tokenisation & Smart Contract Engine
- ERC-20, ERC-721, and ERC-1155 token factories for fungible assets, NFTs, and fractionalized ownership.
- Solidity for EVM deployment with upgrade-friendly proxy patterns and AccessControl.
- Rust modules reserved for high-performance settlement or complex financial primitives.
- Tokenized assets include NFTs, digital twins, loyalty points, brand identities, intangible rights, and fractional shares.

### Custom Blockchain & Nodes
- Golang node implementation with consensus, transaction validation, networking, and event emission.
- EVM-compatibility target for contract execution and wallet tooling support.
- Node APIs expose transaction submission, block/event subscriptions, and cross-chain routing hooks.

### Deal & Contract Lifecycle Management
- “Container” abstraction for each deal/project with isolated permissions, storage, and data scopes.
- Modules for negotiation, templates, signatures, escrow, licensing, arbitration, and audit trails.
- Dynamic pricing, royalty engines, subscriptions, and external trigger-based clauses.

### Wallet & Identity Management
- Wallet gateway for MetaMask, WalletConnect, and hardware wallets (ethers/web3/viem).
- Identities based solely on public keys; off-chain identity linking only in trusted contexts.
- Auth, session management, and delegation with key-based access control.

### DeFi & CeFi Bridges & Yield Strategies
- Bridge aggregation for Ethereum, BSC, Solana, and multi-chain liquidity routing.
- Yield aggregation (staking, lending, liquidity pools) with stablecoin treasury controls.
- CeFi integration for fiat on/off ramps, compliance modules, and AML/KYC workflows.

### Data, Indexing & Analytics Layer
- The Graph subgraphs for tokens, transactions, containers, and wallet interactions.
- Python analytics services for on-chain/off-chain ingestion, bots, MEV research, and quant modeling.
- PostgreSQL for relational state; IPFS/Arweave for decentralized document storage.

### Compliance, Risk & Security
- Encryption, selective disclosure, multisig escrow, key-based access control.
- KYC/AML, taxation, audit trails, retention policies, and fraud/risk scoring.

### AI & Automation
- Python/Node services for predictive analytics, scoring models, and contract drafting.
- Deterministic outputs with user override and explicit confirmation for critical actions.

## Layered Architecture

### 1) On-Chain Logic (Solidity + Rust)
- **Solidity** contracts implement ERC-20, ERC-721, and ERC-1155 primitives, plus container registries and permissions.
- **Rust** modules are intended for high-performance financial logic or complex settlement proofs.
- Contracts are modular, upgrade-aware, and follow checks-effects-interactions, access control, and reentrancy protection.

### 2) Custom Blockchain & Nodes (Golang)
- Go-based node implementation handles consensus, networking, and transaction validation.
- The chain emits events compatible with indexing (The Graph) and wallet integrations.

### 3) Backend Services (Node.js + TypeScript)
- Transaction orchestration, wallet gateway, and smart-contract calls.
- Event listeners sync on-chain activity into the ERP data model.
- Supports MetaMask, WalletConnect, and provider wallets with public-key-only identities.

### 4) Data, Quant, and Research (Python)
- Indexers, bots, and quantitative research modules for MEV analysis and simulation.
- Feeds insights back to the system through API endpoints or message queues.

### 5) Database Layer (PostgreSQL)
- Stores user public keys, container metadata, off-chain state, and permissions.
- Migration structure included for deployment on Render/Docker/Netlify.

### 6) Indexing & Querying (The Graph)
- Subgraphs index token events, container lifecycle, and wallet interactions.
- GraphQL used for low-latency UI queries.

### 7) Decentralized Storage (IPFS/Arweave)
- Stores project artifacts, metadata, and documents.
- Content-addressed hashes are referenced on-chain.

### 8) Transaction Containers
- Each project/deal is an isolated container with unique access control.
- Containers map to indexers, storage references, and permissions.

### 9) Security & Confidentiality
- Encryption for off-chain data.
- Selective disclosure patterns and key-based access control.
- Confidential data never published on-chain.

### 10) Infrastructure & Networking
- Cloudflare for routing, webhooks, and edge security.
- Dockerized services with clear separation of on-chain and off-chain components.

## Interaction Flow
1. User connects wallet via gateway.
2. Backend orchestrates contract calls and registers container metadata.
3. On-chain events emitted and indexed by The Graph.
4. Analytics services ingest on-chain data and publish insights.
5. UI surfaces modules in the ERP workspace with role-based access.

## Repository Folder Structure
```
app/                  # Next.js app router entrypoints
components/           # UI primitives and feature modules
backend/              # Node.js/TypeScript API, wallet gateway, event listeners
chain/                # Go-based custom blockchain node implementation
contracts/            # Solidity + Rust smart contracts and interfaces
containers/           # Transaction container abstractions and policies
data/                 # Seed data and mock datasets for the UI
db/                   # PostgreSQL schema, migrations, and access helpers
docs/                 # Architecture and deployment documentation
infra/                # Docker and local orchestration assets
python/               # Quant, bot, and analytics services
security/             # Confidentiality, encryption, and access patterns
services/             # Shared service layer utilities
storage/              # IPFS/Arweave integration helpers
subgraph/             # The Graph mappings and manifest
```

## Layer Interactions
- **Frontend ↔ Backend**: The Next.js web app calls the Node.js API for container creation, data access, and wallet session metadata.
- **Backend ↔ Blockchain**: The API uses ethers/web3/viem to sign, submit, and monitor transactions, writing off-chain metadata to Postgres.
- **Blockchain ↔ Indexing**: Smart contracts emit events that The Graph indexes for low-latency UI queries.
- **Backend ↔ Storage**: Off-chain artifacts are encrypted, uploaded to IPFS/Arweave, and referenced via CIDs on-chain and in Postgres.
- **Analytics ↔ Data**: Python services ingest on-chain events, run simulations, and expose insights through APIs to the UI or automation flows.

## Security Considerations by Layer
- **Smart Contracts**: AccessControl for permissions, reentrancy guards, and proxy-safe upgrade patterns.
- **Custom Blockchain**: Deterministic transaction validation, consensus signature checks, and network peer allowlists.
- **Backend Services**: JWT-free, key-based auth; request signing; rate limiting; contract allowlists.
- **Database**: Encrypted sensitive fields, least-privilege roles, audited migrations.
- **Indexing**: Read-only GraphQL endpoints with allowlisted queries for sensitive container data.
- **Storage**: Client-side encryption with per-container keys; CIDs stored without plaintext metadata.
