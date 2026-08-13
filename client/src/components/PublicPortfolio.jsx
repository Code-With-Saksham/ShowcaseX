import React, { useEffect, useState } from 'react';
import PreviewPane from './PreviewPane';
import { ArrowLeft, Loader, AlertCircle } from 'lucide-react';

export default function PublicPortfolio({ username, onBackToApp }) {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/portfolio/public/${username}`);
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || 'Portfolio not found');
        }
        setPortfolio(data.portfolio);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPublicPortfolio();
    }
  }, [username]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '1rem', color: 'var(--text-muted)' }}>
        <Loader size={36} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
        <div>Loading portfolio for @{username}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 500, margin: '4rem auto', textAlign: 'center', padding: '2rem' }} className="glass-card">
        <AlertCircle size={48} style={{ color: 'var(--danger)', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Portfolio Unavailable</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
        <button onClick={onBackToApp} className="btn btn-primary">
          <ArrowLeft size={16} /> Back to ShowcaseX
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 100 }}>
        <button onClick={onBackToApp} className="btn btn-secondary btn-sm" style={{ backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.6)' }}>
          <ArrowLeft size={15} /> Back to App
        </button>
      </div>

      <PreviewPane portfolio={portfolio} />
    </div>
  );
}
