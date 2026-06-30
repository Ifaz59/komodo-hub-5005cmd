import React, { useState } from 'react';
import api from '../api';

export default function ReportsPage() {
  const [form, setForm] = useState({ species_id: 1, location: '', sighting_time: '', description: '' });
  const [message, setMessage] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/reports', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to submit report');
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Report Wildlife Sighting</h2>
      <input type="number" placeholder="Species ID" value={form.species_id} onChange={(e) => setForm({ ...form, species_id: Number(e.target.value) })} />
      <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input type="datetime-local" value={form.sighting_time} onChange={(e) => setForm({ ...form, sighting_time: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit">Submit report</button>
      <p>{message}</p>
    </form>
  );
}
