import express from 'express';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM campaigns ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

router.post('/:id/donate', requireAuth, async (req, res) => {
  const { amount } = req.body;
  if (!amount || Number(amount) <= 0) return res.status(400).json({ error: 'Valid amount is required' });
  try {
    const campaign = await pool.query('SELECT * FROM campaigns WHERE id = $1', [req.params.id]);
    if (!campaign.rows.length) return res.status(404).json({ error: 'Campaign not found' });
    await pool.query('INSERT INTO donations (user_id, campaign_id, amount, payment_status) VALUES ($1, $2, $3, $4)', [req.user.id, req.params.id, amount, 'paid']);
    await pool.query('UPDATE campaigns SET current_amount = current_amount + $1 WHERE id = $2', [amount, req.params.id]);
    res.status(201).json({ message: 'Donation recorded successfully', note: 'Replace this mock flow with Stripe + email confirmation in production' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process donation' });
  }
});

export default router;
