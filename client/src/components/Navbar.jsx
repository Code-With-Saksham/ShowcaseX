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
    <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-color)', padding: '0.6rem 1rem' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
        
        {/* Brand */}
        <div 
          onClick={onGoHome}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          title="Return to Home Landing Page"
        >
          <img 
            src="/showcasex-logo.svg" 
            alt="ShowcaseX Logo" 
            style={{ 
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(235, 50, 55, 0.4))'
            }} 
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #eb3237 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ShowcaseX
            </div>
          </div>
        </div>

        {/* Navigation View Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: 3, borderRadius: 10, border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn btn-sm ${activeView === 'editor' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveView('editor')}
            style={{ border: 'none', padding: '0.35rem 0.65rem' }}
          >
            <Layout size={14} /> <span>Editor</span>
          </button>
          <button 
            className={`btn btn-sm ${activeView === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveView('preview')}
            style={{ border: 'none', padding: '0.35rem 0.65rem' }}
          >
            <Eye size={14} /> <span>Preview</span>
          </button>
        </div>

        {/* Actions & User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          
          {/* Share Link */}
          {portfolio?.personal?.username && (
            <button 
              onClick={onCopyPublicLink}
              className="btn btn-secondary btn-sm btn-hide-text-mobile"
              title="Copy public portfolio link"
              style={{ padding: '0.35rem 0.65rem' }}
            >
              <Share2 size={14} /> <span>Share</span>
            </button>
          )}

          {/* Export ZIP */}
          <button 
            onClick={onExportZip} 
            disabled={isExporting}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.35rem 0.75rem' }}
          >
            <Download size={14} />
            <span>{isExporting ? 'Exporting...' : 'Export ZIP'}</span>
          </button>

          {/* Auth Button */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: 8, border: '1px solid var(--border-color)' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
              <button 
                onClick={onLogout}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: 2 }}
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.65rem' }}>
              <LogIn size={14} /> <span>Login</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
