import express from 'express';
import { pool } from '../config/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { species_id, location, latitude = null, longitude = null, sighting_time, description = '', photo_url = null } = req.body;
  if (!location || !sighting_time) return res.status(400).json({ error: 'location and sighting_time are required' });
  try {
    const result = await pool.query(
      `INSERT INTO sighting_reports
       (user_id, species_id, location, latitude, longitude, sighting_time, description, photo_url, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending')
       RETURNING *`,
      [req.user.id, species_id, location, latitude, longitude, sighting_time, description, photo_url]
    );
    res.status(201).json({ message: 'Report submitted and sent for admin moderation', report: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

router.get('/mine', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sighting_reports WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

router.get('/admin/all', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sighting_reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch all reports' });
  }
});

router.patch('/admin/:id/status', requireAuth, requireRole('admin'), async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  try {
    const result = await pool.query('UPDATE sighting_reports SET status = $1 WHERE id = $2 RETURNING *', [status, req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Report not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

export default router;
