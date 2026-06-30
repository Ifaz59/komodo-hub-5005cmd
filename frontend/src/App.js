import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SpeciesPage from './pages/SpeciesPage';
import ReportsPage from './pages/ReportsPage';
import CampaignsPage from './pages/CampaignsPage';
import EventsPage from './pages/EventsPage';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Komodo Hub</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/species">Species</Link>
          <Link to="/reports">Report Sighting</Link>
          <Link to="/campaigns">Campaigns</Link>
          <Link to="/events">Events</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/species" element={<SpeciesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </div>
  );
}
