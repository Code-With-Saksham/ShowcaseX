import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialRegister = false }) {
  const [isRegister, setIsRegister] = useState(initialRegister);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsRegister(initialRegister);
  }, [initialRegister, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister 
      ? formData 
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: 440, padding: '2rem', position: 'relative' }}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img 
            src="/showcasex-logo.svg" 
            alt="ShowcaseX Logo" 
            style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 10, 
              margin: '0 auto 1rem', 
              display: 'block', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 10px rgba(235, 50, 55, 0.5))' 
            }} 
          />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
            {isRegister 
              ? 'Join ShowcaseX to customize & export your website' 
              : 'Sign in to access and manage your portfolio'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', padding: '0.75rem', borderRadius: 8, fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-group">
                <label className="form-label"><User size={14} /> Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="input-field" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label"><User size={14} /> Username</label>
                <input 
                  type="text" 
                  name="username" 
                  className="input-field" 
                  placeholder="johndoe" 
                  value={formData.username} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label"><Mail size={14} /> Email Address</label>
            <input 
              type="email" 
              name="email" 
              className="input-field" 
              placeholder="john@example.com" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Lock size={14} /> Password</label>
            <input 
              type="password" 
              name="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
            {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button 
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Register now'}
          </button>
        </div>

      </div>
    </div>
  );
}
