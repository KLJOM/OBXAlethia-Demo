CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  public_key TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS containers (
  id UUID PRIMARY KEY,
  owner_public_key TEXT NOT NULL,
  metadata_uri TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS container_permissions (
  id UUID PRIMARY KEY,
  container_id UUID NOT NULL REFERENCES containers(id),
  public_key TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
