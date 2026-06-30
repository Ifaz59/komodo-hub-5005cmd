# Komodo Hub Full System Starter

This is a full-stack starter implementation for **Komodo Hub**, a wildlife conservation platform.

## What it includes
- User registration and login with JWT
- Species catalogue
- Wildlife sighting reporting
- Donation campaigns
- Volunteer events
- Admin moderation for reports
- PostgreSQL schema
- React frontend starter

## Quick start

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Create PostgreSQL database and run schema.sql
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Notes
- Stripe and email are scaffolded as placeholders in this starter.
- Replace secrets in `.env`.
