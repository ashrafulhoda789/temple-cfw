CREATE TABLE IF NOT EXISTS notices (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  category_en TEXT DEFAULT 'General',
  category_bn TEXT DEFAULT 'সাধারণ',
  description_en TEXT NOT NULL,
  description_bn TEXT NOT NULL,
  attachment_url TEXT DEFAULT '',
  publish_date TEXT NOT NULL,
  expiry_date TEXT DEFAULT '',
  is_pinned INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Published',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);