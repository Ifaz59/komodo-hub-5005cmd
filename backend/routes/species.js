import express from 'express';
import { pool } from '../config/db.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const { status } = req.query;
  try {
    const result = status
      ? await pool.query('SELECT * FROM species WHERE conservation_status = $1 ORDER BY common_name', [status])
      : await pool.query('SELECT * FROM species ORDER BY common_name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch species' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM species WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Species not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch species' });
  }
});

export default router;
