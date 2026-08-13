import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import EditorView from './components/EditorView';
import PreviewPane from './components/PreviewPane';
import PublicPortfolio from './components/PublicPortfolio';
import LandingPage from './components/LandingPage';

// Default initial demo state for instant editing before login
const defaultDemoPortfolio = {
  title: "Developer Portfolio",
  template: "minimal",
  personal: {
    fullName: "Alex Rivera",
    username: "alexrivera",
    tagline: "Full Stack Engineer & Open Source Enthusiast",
    bio: "Building high-performance web applications, scalable backend APIs, and modern interactive user interfaces.",
    location: "San Francisco, CA",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    resumeUrl: "",
  },
  social: {
    github: "https://github.com/alexrivera",
    linkedin: "https://linkedin.com/in/alexrivera",
    twitter: "https://twitter.com/alexrivera",
    email: "alex@example.com",
    website: "https://alexrivera.dev",
  },
  skills: [
    { id: "1", name: "JavaScript / ES6+", category: "Technical", level: "Advanced" },
    { id: "2", name: "React.js / Vite", category: "Frameworks", level: "Advanced" },
    { id: "3", name: "Node.js / Express", category: "Backend", level: "Intermediate" },
    { id: "4", name: "MongoDB / Mongoose", category: "Database", level: "Intermediate" },
    { id: "5", name: "TailwindCSS & CSS3", category: "Frontend", level: "Advanced" },
  ],
  projects: [
    {
      id: "p1",
      title: "ShowcaseX App",
      description: "Full-stack web application enabling developers to build, customize, and export static websites as ZIP archives.",
      techStack: ["React", "Express", "MongoDB", "EJS"],
      githubUrl: "https://github.com/alexrivera/showcasex",
      liveUrl: "",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "p2",
      title: "Smart Task Analytics Engine",
      description: "Real-time task priority queuing and productivity analytics dashboard.",
      techStack: ["React", "Node.js", "Chart.js"],
      githubUrl: "https://github.com/alexrivera/task-analytics",
      liveUrl: "",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    },
  ],
  experience: [
    {
      id: "e1",
      company: "Innovate Web Solutions",
      role: "Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2024-06",
      endDate: "2025-12",
      current: false,
      description: "Built modular React components, improved accessibility scores, and integrated REST APIs.",
    },
  ],
  education: [
    {
      id: "ed1",
      institution: "State University of Science & Tech",
      degree: "B.S. Computer Science",
      field: "Software Engineering",
      startDate: "2022",
      endDate: "2026",
      description: "Focus on Distributed Systems, Web Security, and UI Design.",
    },
  ],
  customTheme: {
    accentColor: "#eb3237",
    darkTheme: true,
    fontSize: "normal",
  },
  isPublic: true,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(defaultDemoPortfolio);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [showLanding, setShowLanding] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeView, setActiveView] = useState('editor'); // 'editor' or 'preview'
  const [toast, setToast] = useState('');

  const saveTimeoutRef = useRef(null);

  // Check URL path for public view e.g. /p/username
  const pathParts = window.location.pathname.split('/');
  const publicUsername = pathParts[1] === 'p' && pathParts[2] ? pathParts[2] : null;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Check initial user authentication on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
            setShowLanding(false);
            fetchPortfolio(token);
          } else {
            localStorage.removeItem('token');
          }
        })
        .catch(() => {});
    }
  }, []);

  // Fetch logged in user's portfolio
  const fetchPortfolio = (token) => {
    fetch('/api/portfolio/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.portfolio) {
          setPortfolio(data.portfolio);
        }
      })
      .catch((err) => console.error('Error loading portfolio:', err));
  };

  // Save portfolio to server
  const savePortfolioToServer = (updatedPortfolio) => {
    const token = localStorage.getItem('token');
    if (!token) return; // If guest, keep local state only

    setIsSaving(true);
    fetch('/api/portfolio/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPortfolio),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsSaving(false);
        }
      })
      .catch((err) => {
        console.error('Auto-save error:', err);
        setIsSaving(false);
      });
  };

  // Handle portfolio state mutation with auto-save debounce
  const handlePortfolioChange = (updated) => {
    setPortfolio(updated);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      savePortfolioToServer(updated);
    }, 1000);
  };

  // Auth Success Callback
  const handleAuthSuccess = (userData, token) => {
    setUser(userData);
    setShowLanding(false);
    fetchPortfolio(token);
    showToast(`Welcome back, ${userData.name}!`);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowLanding(true);
    setPortfolio(defaultDemoPortfolio);
    showToast('Logged out successfully');
  };

  // ZIP Export Handler
  const handleExportZip = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      openAuth('login');
      showToast('Please sign in or register to export your portfolio ZIP');
      return;
    }

    try {
      setIsExporting(true);
      showToast('Generating static website ZIP archive...');

      // Save current state first
      await fetch('/api/portfolio/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(portfolio),
      });

      // Trigger file download
      const response = await fetch('/api/portfolio/export', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${portfolio.personal?.username || 'my'}-portfolio.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      showToast('ZIP website package downloaded successfully!');
    } catch (err) {
      console.error('Export ZIP error:', err);
      showToast('Error exporting portfolio ZIP file');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy share link handler
  const handleCopyShareLink = () => {
    const username = portfolio.personal?.username || user?.username;
    if (!username) return;
    const shareUrl = `${window.location.origin}/p/${username}`;
    navigator.clipboard.writeText(shareUrl);
    showToast('Shareable link copied to clipboard!');
  };

  // Render Public Portfolio if viewing /p/:username
  if (publicUsername) {
    return <PublicPortfolio username={publicUsername} onBackToApp={() => window.location.href = '/'} />;
  }

  // Render Landing Page if user is not logged in OR explicitly clicked home
  if (!user || showLanding) {
    return (
      <>
        {/* Toast Notification */}
        {toast && (
          <div 
            className="animate-fade-in glass-card"
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 2000,
              padding: '0.85rem 1.4rem',
              background: 'rgba(18, 26, 43, 0.95)',
              border: '1px solid var(--accent-primary)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            ✨ {toast}
          </div>
        )}

        {/* Landing Home Page */}
        <LandingPage 
          onOpenLogin={() => openAuth('login')}
          onOpenRegister={() => openAuth('register')}
          onGuestDemo={() => setShowLanding(false)}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          initialRegister={authMode === 'register'}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Render Main Portfolio Editor & Preview Workspace (after Login/Register)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div 
          className="animate-fade-in glass-card"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 2000,
            padding: '0.85rem 1.4rem',
            background: 'rgba(18, 26, 43, 0.95)',
            border: '1px solid var(--accent-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          ✨ {toast}
        </div>
      )}

      {/* Header Navbar */}
      <Navbar
        user={user}
        portfolio={portfolio}
        onOpenAuth={() => openAuth('login')}
        onLogout={handleLogout}
        onExportZip={handleExportZip}
        isExporting={isExporting}
        isSaving={isSaving}
        activeView={activeView}
        setActiveView={setActiveView}
        onCopyPublicLink={handleCopyShareLink}
        onGoHome={() => setShowLanding(true)}
      />

      {/* Main Content Workspace */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '1rem 1.5rem', gap: '1.5rem' }}>
        
        {/* Full Preview Mode */}
        {activeView === 'preview' ? (
          <div style={{ flex: 1, height: '100%', overflowY: 'auto', borderRadius: 16 }}>
            <PreviewPane portfolio={portfolio} />
          </div>
        ) : (
          /* Split View: Left Editor, Right Live Preview */
          <>
            <div className="glass-card" style={{ flex: '1 1 50%', height: '100%', padding: '1.25rem', overflow: 'hidden' }}>
              <EditorView portfolio={portfolio} onChange={handlePortfolioChange} />
            </div>

            <div className="glass-card" style={{ flex: '1 1 50%', height: '100%', padding: '1.25rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Live Canvas Preview</span>
                <span>Template: <strong style={{ color: 'var(--accent-primary)', textTransform: 'capitalize' }}>{portfolio.template || 'minimal'}</strong></span>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', borderRadius: 12 }}>
                <PreviewPane portfolio={portfolio} />
              </div>
            </div>
          </>
        )}

      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialRegister={authMode === 'register'}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
