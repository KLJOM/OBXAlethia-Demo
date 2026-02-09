import fs from 'fs';
import path from 'path';

const requiredPaths = [
  'app/page.tsx',
  'app/web3/page.tsx',
  'app/agents/page.tsx',
  'app/erp/page.tsx',
  'app/solutions/page.tsx',
  'backend/src/index.ts',
  'services/geminiService.ts',
  'services/agentRouter.ts',
  'db/schema.sql'
];

const missing = requiredPaths.filter((file) => !fs.existsSync(path.resolve(file)));
if (missing.length) {
  console.error('QA check failed. Missing files:', missing.join(', '));
  process.exit(1);
}

const schema = fs.readFileSync(path.resolve('db/schema.sql'), 'utf8');
const tables = ['users', 'containers', 'container_permissions', 'llm_sessions', 'agent_dispatches'];
const missingTables = tables.filter((table) => !schema.includes(`CREATE TABLE IF NOT EXISTS ${table}`));
if (missingTables.length) {
  console.error('QA check failed. Missing DB tables:', missingTables.join(', '));
  process.exit(1);
}

console.log('QA check passed: core pages, services, and schema are present.');
