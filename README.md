<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1JW4r5-9AWRnEr7PdWOcXRvZqBpQG-a3v

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `NEXT_PUBLIC_OPENAI_API_KEY` in [.env.local](.env.local) to your OpenAI API key
3. Run the app:
   `npm run dev`

## Smart Contracts (Hardhat)

1. Install dependencies:
   `npm install`
2. Compile contracts:
   `npx hardhat compile`
3. Run tests (if added):
   `npm test`

## Web Deployment & App Store Readiness
- See [docs/deployment.md](docs/deployment.md) for Netlify/Render deployment and PWA readiness steps.
- Architecture overview and repository structure are documented in [docs/architecture.md](docs/architecture.md).

## Beginner Guide to Core Connections
Start with [docs/deployment.md](docs/deployment.md) for simple explanations of how the blockchain, wallets, backend, database, AI, and automation layers connect.
