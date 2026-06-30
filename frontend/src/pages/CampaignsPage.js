import React, { useEffect, useState } from 'react';
import api from '../api';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/campaigns').then((res) => setCampaigns(res.data));
  }, []);

  async function donate(id) {
    try {
      const res = await api.post(`/campaigns/${id}/donate`, { amount: 10 });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Donation failed');
    }
  }

  return (
    <div>
      <h2>Conservation Campaigns</h2>
      {message && <p>{message}</p>}
      <div className="grid">
        {campaigns.map((c) => (
          <div className="card" key={c.id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p><strong>Target:</strong> £{c.target_amount}</p>
            <p><strong>Raised:</strong> £{c.current_amount}</p>
            <button onClick={() => donate(c.id)}>Donate £10</button>
          </div>
        ))}
      </div>
    </div>
  );
}
