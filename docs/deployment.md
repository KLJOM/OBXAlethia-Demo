# Web Deployment & App Store Readiness

## Goals
- Deploy as a responsive web application for desktop, tablet, and mobile.
- Prepare for future app-store packaging via PWA or wrapper (Capacitor/React Native WebView).

## Beginner-Friendly Connection Guide
### 1) Blockchain & Smart Contracts
- **What it is:** Your smart contracts define the rules for tokens and deals.
- **Connection:** Deploy contracts (Hardhat/Foundry), then copy the contract addresses + ABI into the backend and frontend.
- **Why it matters:** The UI calls the backend, and the backend calls contracts via RPC.

### 2) Wallets & Identity
- **What it is:** Users authenticate with public keys from MetaMask/WalletConnect.
- **Connection:** The frontend uses a wallet connector; the backend verifies signed messages.
- **Why it matters:** Public keys become the user identity across the platform.

### 3) Backend APIs
- **What it is:** Node.js services orchestrate transactions, permissions, and event listeners.
- **Connection:** The frontend calls API endpoints; the backend uses RPC + ABI to call contracts.
- **Why it matters:** All contract calls and permissions flow through one secure gateway.

### 4) Database (PostgreSQL)
- **What it is:** Off-chain state for containers, permissions, metadata, and analytics.
- **Connection:** Backend reads/writes Postgres using connection strings in environment variables.
- **Why it matters:** It stores what should not be on-chain (private metadata and permissions).

### 5) Indexing (The Graph)
- **What it is:** Subgraphs index contract events for fast querying.
- **Connection:** Subgraph listens to contract addresses and writes to its own Postgres instance.
- **Why it matters:** The frontend can query blockchain activity in milliseconds.

### 6) Storage (IPFS/Arweave)
- **What it is:** Content-addressed storage for documents, NFTs, and deal artifacts.
- **Connection:** Backend uploads content, stores the CID on-chain + in Postgres.
- **Why it matters:** Large or private documents are stored off-chain but verifiable.

### 7) AI (API Key)
- **What it is:** Model APIs generate summaries, risk analysis, and contract drafts.
- **Connection:** Store API keys in server-side environment variables only.
- **Why it matters:** AI outputs assist but never execute actions without user confirmation.

### 8) Agentic AI (n8n)
- **What it is:** Workflow automation engine for alerts, approvals, and data sync.
- **Connection:** Webhooks from the backend trigger n8n flows; n8n calls APIs back.
- **Why it matters:** Automates internal operations while keeping human approval gates.

## Web Deployment (Netlify + Render)
1. **Frontend (Netlify)**
   - Build command: `npm install && npm run build`.
   - Publish directory: `out` (if static export) or `.next` (if server rendering).
   - Set environment variables for API endpoints, contract addresses, and GraphQL URLs.
   - Add your custom domain and enable HTTPS.

2. **Backend (Render)**
   - Deploy the Node.js service from `backend/`.
   - Configure environment variables for RPC endpoints, database URL, wallet gateway settings, and storage providers.
   - Ensure CORS allows requests from the Netlify domain.

3. **Custom Chain + Indexing**
   - Run the Go node from `chain/node` in a Render background worker or Docker service.
   - Deploy The Graph `subgraph/` with access to Postgres and IPFS endpoints.

## Responsive UX Checklist
- Verify layout at common breakpoints (mobile, tablet, desktop).
- Ensure touch targets are at least 44px.
- Use the PWA manifest for device-aware display and installation prompts.

## App Store Path (Later)
- **PWA packaging**: Use Capacitor or PWA Builder to wrap the web app.
- **iOS/Android**: Ensure universal links, splash screens, and store metadata assets are ready.
- Keep the web app authoritative; the app build should consume the same API endpoints.

## Operational Notes
- Use Cloudflare for DNS, WAF, and SSL.
- Store secrets in Netlify/Render environment variables.
- Pin IPFS content or use Arweave for permanent storage.
