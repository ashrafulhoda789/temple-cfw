CREATE TABLE IF NOT EXISTS page_contents (
  id TEXT PRIMARY KEY,
  hero TEXT NOT NULL,
  arthi_schedule TEXT NOT NULL,
  about TEXT NOT NULL,
  history TEXT NOT NULL,
  deities TEXT NOT NULL,
  temple_timings TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);