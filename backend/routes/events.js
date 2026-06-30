import express from 'express';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY event_date');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.post('/:id/register', requireAuth, async (req, res) => {
  try {
    const eventResult = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (!eventResult.rows.length) return res.status(404).json({ error: 'Event not found' });
    const event = eventResult.rows[0];
    const countResult = await pool.query('SELECT COUNT(*)::int AS total FROM event_registrations WHERE event_id = $1', [req.params.id]);
    if (countResult.rows[0].total >= event.capacity) return res.status(400).json({ error: 'Event is full' });
    await pool.query('INSERT INTO event_registrations (user_id, event_id) VALUES ($1, $2)', [req.user.id, req.params.id]);
    res.status(201).json({ message: 'Event registration confirmed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

export default router;
