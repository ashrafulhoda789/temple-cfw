CREATE TABLE IF NOT EXISTS donations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Anonymous',
    phone TEXT NOT NULL,
    amount REAL NOT NULL,
    payment_method TEXT NOT NULL,
    transaction_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);