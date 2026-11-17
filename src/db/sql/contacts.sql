CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    message TEXT NOT NULL,
    reply_message TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'unread',
    replied_at TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);