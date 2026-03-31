CREATE TABLE members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE commitments (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  project_id TEXT NOT NULL,
  title TEXT NOT NULL,
  difficulty INTEGER DEFAULT 3,
  due_at INTEGER,
  status TEXT DEFAULT 'open',
  verified_at INTEGER,
  created_at INTEGER NOT NULL
);
