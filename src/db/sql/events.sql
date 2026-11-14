
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  category_en TEXT DEFAULT '',
  category_bn TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_bn TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  event_date_time TEXT NOT NULL,
  location_en TEXT DEFAULT '',
  location_bn TEXT DEFAULT '',
  organizer_en TEXT DEFAULT '',
  organizer_bn TEXT DEFAULT '',
  is_registration_required INTEGER NOT NULL DEFAULT 0,
  registration_deadline TEXT DEFAULT '',
  event_status TEXT NOT NULL DEFAULT 'Upcoming',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_schedules (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  day_label_en TEXT NOT NULL, 
  day_label_bn TEXT NOT NULL,
  schedule_date TEXT NOT NULL,
  day_title_en TEXT DEFAULT '', 
  day_title_bn TEXT DEFAULT '', 
  activities TEXT DEFAULT '[]',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);