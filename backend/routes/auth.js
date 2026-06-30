import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { full_name, email, password, role = 'user', school_name = null } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'full_name, email and password are required' });
  }
  const strongPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!strongPassword.test(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 chars, with 1 uppercase and 1 number' });
  }
  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length) return res.status(400).json({ error: 'Email already exists' });
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, school_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, email, role, school_name, created_at`,
      [full_name, email, password_hash, role, school_name]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token, user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
