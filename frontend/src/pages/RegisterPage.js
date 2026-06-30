import React, { useState } from 'react';
import api from '../api';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', role: 'user', school_name: '' });
  const [message, setMessage] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      setMessage('Registration successful. You can now log in.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
        <option value="researcher">Researcher</option>
      </select>
      <input placeholder="School name (optional)" value={form.school_name} onChange={(e) => setForm({ ...form, school_name: e.target.value })} />
      <button type="submit">Create account</button>
      <p>{message}</p>
    </form>
  );
}
