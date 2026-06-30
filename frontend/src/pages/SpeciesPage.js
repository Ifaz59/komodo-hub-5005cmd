import React, { useEffect, useState } from 'react';
import api from '../api';

export default function SpeciesPage() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/species').then((res) => setSpecies(res.data)).catch(() => setError('Failed to load species'));
  }, []);

  return (
    <div>
      <h2>Species Catalogue</h2>
      {error && <p className="error">{error}</p>}
      <div className="grid">
        {species.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.common_name}</h3>
            <p><strong>Scientific name:</strong> {item.scientific_name}</p>
            <p><strong>Status:</strong> {item.conservation_status}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
