# OBXAlethia Web3 ERP Architecture

## System Overview
OBXAlethia is a Web3-native infrastructure gateway that combines a custom blockchain, modular smart contracts, and an AI-assisted ERP layer. The platform organizes work into transaction containers that isolate permissions, storage, and analytics while still emitting on-chain events for transparency.

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
