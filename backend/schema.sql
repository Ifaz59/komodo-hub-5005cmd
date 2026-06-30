CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'user',
  school_name VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS species (
  id SERIAL PRIMARY KEY,
  common_name VARCHAR(120) NOT NULL,
  scientific_name VARCHAR(160) NOT NULL,
  conservation_status VARCHAR(60) NOT NULL,
  habitat TEXT,
  description TEXT,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS sighting_reports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  species_id INTEGER REFERENCES species(id) ON DELETE SET NULL,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  sighting_time TIMESTAMP NOT NULL,
  description TEXT,
  photo_url TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  target_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  current_amount DECIMAL(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(30) NOT NULL DEFAULT 'paid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, event_id)
);
