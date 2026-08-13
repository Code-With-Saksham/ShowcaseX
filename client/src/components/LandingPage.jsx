import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  Download, 
  Share2, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Code, 
  Palette, 
  Eye, 
  Globe, 
  LogIn, 
  UserPlus,
  Star
} from 'lucide-react';

export default function LandingPage({ onOpenLogin, onOpenRegister, onGuestDemo }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      
      {/* Landing Header / Navbar */}
      <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-color)', padding: '0.75rem 1rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img 
              src="/showcasex-logo.svg" 
              alt="ShowcaseX Logo" 
              style={{ width: 34, height: 34, borderRadius: 8, filter: 'drop-shadow(0 0 10px rgba(235, 50, 55, 0.5))' }} 
            />
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #eb3237 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ShowcaseX
            </span>
          </div>

          {/* Quick Nav Links */}
          <nav className="desktop-only-split" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Features</a>
            <a href="#templates" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Templates</a>
            <a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>How it Works</a>
          </nav>

          {/* Auth CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={onOpenLogin} 
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.4rem 0.85rem' }}
            >
              <LogIn size={14} /> Log In
            </button>
            <button 
              onClick={onOpenRegister} 
              className="btn btn-primary btn-sm"
              style={{ padding: '0.4rem 1rem', background: 'linear-gradient(135deg, #eb3237 0%, #dc2626 100%)', boxShadow: '0 4px 15px rgba(235,50,55,0.4)' }}
            >
              <UserPlus size={14} /> Register Free
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '3.5rem 1rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(235, 50, 55, 0.12)', border: '1px solid rgba(235, 50, 55, 0.3)', padding: '0.35rem 0.85rem', borderRadius: 30, fontSize: '0.8rem', color: '#f87171', marginBottom: '1.25rem' }}>
            <Sparkles size={14} /> Next-Gen Developer Portfolio Builder
          </div>

          {/* Main Title */}
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Build & Export Your Developer Portfolio <br />
            <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #eb3237 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              In Minutes, Not Hours.
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 720, margin: '0 auto 2.5rem' }}>
            ShowcaseX empowers developers, designers, and engineers to create high-impact, customizable portfolios with instant live preview and standalone ZIP export.
          </p>

          {/* Hero CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenRegister} 
              className="btn btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', borderRadius: 12, background: 'linear-gradient(135deg, #eb3237 0%, #b91c1c 100%)', boxShadow: '0 6px 25px rgba(235, 50, 55, 0.45)' }}
            >
              Get Started Now <ArrowRight size={18} />
            </button>
            <button 
              onClick={onOpenLogin} 
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.8rem', fontSize: '1rem', borderRadius: 12 }}
            >
              Sign In to Workspace
            </button>
          </div>

          {/* Live Preview Card Teaser */}
          <div className="glass-card" style={{ marginTop: '4rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.4)', borderRadius: 12, marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>showcasex.dev/editor</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>● Live Canvas</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', textAlign: 'left', padding: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.25rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: 4 }}>01. EDIT PROFILE</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Full Stack Engineer</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 6 }}>Add your projects, technical skills, experience, and custom URLs in real-time.</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.25rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: 4 }}>02. PICK ACCENT & TEMPLATE</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Full Spectrum Color Picker</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 6 }}>Customize colors, dark mode, and switch between Minimal, Developer, & Creative templates.</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.25rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: 4 }}>03. EXPORT OR SHARE</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Download ZIP Website</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 6 }}>Download production-ready static HTML/CSS ZIP packages or share your public link.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '5rem 1.5rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Everything You Need to Stand Out</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Designed for modern software developers, designers, and tech professionals.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(235,50,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Instant Live Preview</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Watch your portfolio update in real-time side-by-side as you type your bio, skills, education, and projects.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(235,50,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
                <Palette size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Full Color Spectrum Chart</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Choose from vibrant color themes or use the integrated color picker chart to set any HEX accent color you want.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(235,50,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
                <Download size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>One-Click ZIP Export</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Export clean, standalone HTML & CSS website bundles ready to host on GitHub Pages, Netlify, or Vercel.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(235,50,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
                <Globe size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Custom Public URL</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Share your personal portfolio link with recruiters and clients directly via your custom username URL.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(235,50,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Multiple Templates</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Switch effortlessly between Minimalist, Developer Terminal, and Creative Glassmorphic layout styles.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(235,50,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Secure & Persistent</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Your data is automatically synced to your secure user account so you can update your portfolio anytime.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Crafted Template Styles</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Choose the design language that best matches your personal style.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ background: '#0f172a', padding: '2rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>Minimal Style</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>Clean, typography-first & elegant</div>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Minimal Template</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>Perfect for clean resume showcases and minimalist aesthetics.</p>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ background: '#0d1117', padding: '2rem', borderRadius: 12, border: '1px solid #30363d', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#10b981', fontFamily: 'monospace' }}>$ developer_v2</div>
                <div style={{ fontSize: '0.8rem', color: '#8b949e', marginTop: 4, fontFamily: 'monospace' }}>terminal theme & code blocks</div>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Developer Template</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>Engineered specifically for backend, DevOps, and systems developers.</p>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(235,50,55,0.2) 0%, rgba(99,102,241,0.2) 100%)', padding: '2rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>Creative Glass</div>
                <div style={{ fontSize: '0.8rem', color: '#f8fafc', marginTop: 4 }}>Dynamic gradients & micro-animations</div>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Creative Template</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>Designed for frontend engineers, UI/UX designers, and creators.</p>
            </div>

          </div>

        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section id="how-it-works" style={{ padding: '5rem 1.5rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '3rem' }}>How ShowcaseX Works</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(235,50,55,0.3)', lineHeight: 1 }}>01</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0' }}>Register Account</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Create your free ShowcaseX account to save your portfolio securely in the cloud.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(235,50,55,0.3)', lineHeight: 1 }}>02</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0' }}>Customize Content</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Fill in your bio, skills, experience, and projects while previewing changes in real-time.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(235,50,55,0.3)', lineHeight: 1 }}>03</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0' }}>Export & Share</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Download your website as a static ZIP archive or share your custom URL instantly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section Banner */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: 900, margin: '0 auto', padding: '3.5rem 2rem', background: 'linear-gradient(135deg, rgba(235,50,55,0.15) 0%, rgba(20,20,20,0.9) 100%)', border: '1px solid rgba(235,50,55,0.3)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to Launch Your Developer Portfolio?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2rem' }}>
            Join ShowcaseX today and build a modern portfolio that impresses recruiters and clients.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenRegister} 
              className="btn btn-primary"
              style={{ padding: '0.85rem 2.2rem', fontSize: '1rem', background: 'linear-gradient(135deg, #eb3237 0%, #dc2626 100%)', boxShadow: '0 6px 20px rgba(235,50,55,0.4)' }}
            >
              <UserPlus size={18} /> Register Free Account
            </button>
            <button 
              onClick={onOpenLogin} 
              className="btn btn-secondary"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
            >
              <LogIn size={18} /> Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/showcasex-logo.svg" alt="ShowcaseX" style={{ width: 24, height: 24 }} />
            <span style={{ fontWeight: 700, color: '#fff' }}>ShowcaseX</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={onOpenLogin} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Login</button>
            <button onClick={onOpenRegister} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Register</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
