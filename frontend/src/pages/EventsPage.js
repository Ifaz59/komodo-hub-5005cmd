import React, { useEffect, useState } from 'react';
import api from '../api';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/events').then((res) => setEvents(res.data));
  }, []);

  async function join(id) {
    try {
      const res = await api.post(`/events/${id}/register`);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div>
      <h2>Volunteer Events</h2>
      {message && <p>{message}</p>}
      <div className="grid">
        {events.map((e) => (
          <div className="card" key={e.id}>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p><strong>Location:</strong> {e.location}</p>
            <p><strong>Capacity:</strong> {e.capacity}</p>
            <button onClick={() => join(e.id)}>Join event</button>
          </div>
        ))}
      </div>
    </div>
  );
}
