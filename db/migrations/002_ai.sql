CREATE TABLE IF NOT EXISTS llm_sessions (
  id UUID PRIMARY KEY,
  public_key TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agent_dispatches (
  id UUID PRIMARY KEY,
  public_key TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
