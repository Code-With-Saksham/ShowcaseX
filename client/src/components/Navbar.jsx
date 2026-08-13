import React from 'react';
import { 
  Sparkles, 
  Download, 
  Share2, 
  User, 
  LogOut, 
  LogIn, 
  Layout, 
  CheckCircle,
  Eye
} from 'lucide-react';

export default function Navbar({ 
  user, 
  portfolio, 
  onOpenAuth, 
  onLogout, 
  onExportZip, 
  isExporting, 
  isSaving,
  activeView,
  setActiveView,
  onCopyPublicLink,
  onGoHome
}) {
  return (
    <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-color)', padding: '0.75rem 1.5rem' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand */}
        <div 
          onClick={onGoHome}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          title="Return to Home Landing Page"
        >
          <img 
            src="/showcasex-logo.svg" 
            alt="ShowcaseX Logo" 
            style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 8, 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(235, 50, 55, 0.4))'
            }} 
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #eb3237 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ShowcaseX
            </div>
          </div>
        </div>

        {/* Navigation View Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: 4, borderRadius: 12, border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn btn-sm ${activeView === 'editor' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveView('editor')}
            style={{ border: 'none' }}
          >
            <Layout size={15} /> Editor & Customizer
          </button>
          <button 
            className={`btn btn-sm ${activeView === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveView('preview')}
            style={{ border: 'none' }}
          >
            <Eye size={15} /> Full Preview
          </button>
        </div>

        {/* Actions & User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Share Link */}
          {portfolio?.personal?.username && (
            <button 
              onClick={onCopyPublicLink}
              className="btn btn-secondary btn-sm"
              title="Copy public portfolio link"
            >
              <Share2 size={15} /> Share Link
            </button>
          )}

          {/* Export ZIP */}
          <button 
            onClick={onExportZip} 
            disabled={isExporting}
            className="btn btn-primary btn-sm"
          >
            <Download size={15} />
            {isExporting ? 'Packaging ZIP...' : 'Export ZIP Site'}
          </button>

          {/* Auth Button */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: 10, border: '1px solid var(--border-color)' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</span>
              <button 
                onClick={onLogout}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: 4 }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-secondary btn-sm">
              <LogIn size={15} /> Login / Register
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
