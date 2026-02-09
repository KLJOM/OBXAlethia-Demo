# Web Deployment & App Store Readiness

## Goals
- Deploy as a responsive web application for desktop, tablet, and mobile.
- Prepare for future app-store packaging via PWA or wrapper (Capacitor/React Native WebView).

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
