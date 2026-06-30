import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import speciesRoutes from './routes/species.js';
import reportRoutes from './routes/reports.js';
import campaignRoutes from './routes/campaigns.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Komodo Hub API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/species', speciesRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/events', eventRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Komodo Hub API listening on port ${port}`);
});
