
CREATE TABLE IF NOT EXISTS gallery_albums (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_bn TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_media (
  id TEXT PRIMARY KEY,
  album_id TEXT, 
  title_en TEXT DEFAULT '',
  title_bn TEXT DEFAULT '',
  caption_en TEXT DEFAULT '',
  caption_bn TEXT DEFAULT '',
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  is_featured_video INTEGER NOT NULL DEFAULT 0, 
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES gallery_albums(id) ON DELETE CASCADE
);