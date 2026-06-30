import React, { useState } from 'react';
import api from '../api';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', form);
      localStorage.setItem('komodo_token', response.data.token);
      localStorage.setItem('komodo_user', JSON.stringify(response.data.user));
      setMessage(`Welcome, ${response.data.user.full_name}`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
