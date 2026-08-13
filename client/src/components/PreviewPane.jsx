import React from 'react';
import { Code, Briefcase, GraduationCap, Globe, Mail } from 'lucide-react';

// Ensures URLs are always absolute (https://) so they open the correct site
// and don't navigate back to the app itself
const safeUrl = (url) => {
  if (!url) return '#';
  if (url.startsWith('mailto:') || url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

export default function PreviewPane({ portfolio }) {
  if (!portfolio) return null;

  const p = portfolio;
  const template = p.template || 'minimal';
  const accent = p.customTheme?.accentColor || '#eb3237';
  const isDark = p.customTheme?.darkTheme !== false;

  // -------------------------------------------------------------
  // TEMPLATE 1: MINIMAL
  // -------------------------------------------------------------
  if (template === 'minimal') {
    return (
      <div 
        style={{
          background: isDark ? '#0a0a0a' : '#f8fafc',
          color: isDark ? '#f1f5f9' : '#0f172a',
          minHeight: '100%',
          padding: '2.5rem 1.5rem',
          borderRadius: 16,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          overflowY: 'auto',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ maxWidth: 750, margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            {p.personal?.profileImage && (
              <img 
                src={p.personal.profileImage} 
                alt="Profile" 
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accent}`, marginBottom: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }} 
              />
            )}
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
              {p.personal?.fullName || 'Your Name'}
            </h1>
            {p.personal?.tagline && (
              <div style={{ color: accent, fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                {p.personal.tagline}
              </div>
            )}
            {p.personal?.bio && (
              <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.95rem', maxWidth: 550, margin: '0 auto 1.25rem' }}>
                {p.personal.bio}
              </p>
            )}

            {/* Socials */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              {p.social?.github && (
                <a href={safeUrl(p.social.github)} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 0.9rem', borderRadius: 20, background: isDark ? '#131b2e' : '#fff', color: 'inherit', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500 }}>
                  GitHub
                </a>
              )}
              {p.social?.linkedin && (
                <a href={safeUrl(p.social.linkedin)} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 0.9rem', borderRadius: 20, background: isDark ? '#131b2e' : '#fff', color: 'inherit', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500 }}>
                  LinkedIn
                </a>
              )}
              {p.social?.email && (
                <a href={`mailto:${p.social.email}`} style={{ padding: '0.4rem 0.9rem', borderRadius: 20, background: isDark ? '#131b2e' : '#fff', color: 'inherit', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500 }}>
                  Email
                </a>
              )}
              {p.personal?.resumeUrl && (
                <a href={safeUrl(p.personal.resumeUrl)} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 0.9rem', borderRadius: 20, background: accent, color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>
                  Resume PDF
                </a>
              )}
            </div>
          </div>

          {/* Skills */}
          {p.skills && p.skills.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Code size={18} style={{ color: accent }} /> Skills & Technologies
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {p.skills.map((s, idx) => (
                  <div key={idx} style={{ padding: '0.4rem 0.8rem', background: isDark ? '#131b2e' : '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{s.name}</span>
                    <span style={{ fontSize: '0.7rem', color: accent, background: 'rgba(99,102,241,0.15)', padding: '0.1rem 0.35rem', borderRadius: 4 }}>{s.level || 'Advanced'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {p.projects && p.projects.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 6 }}>
                Featured Projects
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {p.projects.map((pj, idx) => (
                  <div key={idx} style={{ background: isDark ? '#131b2e' : '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden' }}>
                    {pj.image && <img src={pj.image} alt={pj.title} style={{ width: '100%', height: 130, objectFit: 'cover' }} />}
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{pj.title}</div>
                      <div style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b', marginBottom: 8 }}>{pj.description}</div>
                      <div style={{ display: 'flex', gap: 8, fontSize: '0.75rem' }}>
                        {pj.githubUrl && <a href={safeUrl(pj.githubUrl)} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>Code →</a>}
                        {pj.liveUrl && <a href={safeUrl(pj.liveUrl)} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>Live Demo →</a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {p.experience && p.experience.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Briefcase size={18} style={{ color: accent }} /> Work Experience
              </h2>
              {p.experience.map((exp, idx) => (
                <div key={idx} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '1rem', marginBottom: '1.25rem', position: 'relative' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{exp.role}</div>
                  <div style={{ color: accent, fontSize: '0.85rem', fontWeight: 500 }}>{exp.company}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: 4 }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                  <div style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b' }}>{exp.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {p.education && p.education.length > 0 && p.education[0]?.institution && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <GraduationCap size={18} style={{ color: accent }} /> Education
              </h2>
              {p.education.map((edu, idx) => (
                <div key={idx} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                  <div style={{ color: accent, fontSize: '0.85rem', fontWeight: 500 }}>{edu.institution}</div>
                  {(edu.startDate || edu.endDate) && (
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: 4 }}>{edu.startDate} - {edu.endDate || 'Present'}</div>
                  )}
                  {edu.description && <div style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b' }}>{edu.description}</div>}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 2: DEVELOPER TERMINAL
  // -------------------------------------------------------------
  if (template === 'developer') {
    return (
      <div 
        style={{
          background: '#0d1117',
          color: '#c9d1d9',
          fontFamily: "'Fira Code', monospace",
          minHeight: '100%',
          padding: '1.5rem',
          borderRadius: 16,
          overflowY: 'auto'
        }}
      >
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          
          {/* Bar */}
          <div style={{ background: '#21262d', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363d' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>bash ~ {p.personal?.username || 'dev'}@portfolio</div>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <div style={{ color: accent, fontSize: '0.85rem' }}>user@dev:~$ <span style={{ color: '#58a6ff' }}>cat ./whoami.json</span></div>
            
            <div style={{ display: 'flex', gap: '1.25rem', margin: '1rem 0 2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {p.personal?.profileImage && (
                <img src={p.personal.profileImage} alt="" style={{ width: 80, height: 80, borderRadius: 8, border: `2px solid ${accent}`, objectFit: 'cover' }} />
              )}
              <div>
                <h1 style={{ fontSize: '1.6rem', color: '#f0f6fc', fontWeight: 700, fontFamily: 'Inter' }}>{p.personal?.fullName}</h1>
                <div style={{ color: accent, fontSize: '0.95rem' }}>{p.personal?.tagline}</div>
                <div style={{ color: '#8b949e', fontSize: '0.85rem', marginTop: 4, fontFamily: 'Inter' }}>{p.personal?.bio}</div>
              </div>
            </div>

            {/* Skills command */}
            <div style={{ color: accent, fontSize: '0.85rem', marginTop: '1.5rem' }}>user@dev:~$ <span style={{ color: '#58a6ff' }}>list-skills</span></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '0.75rem 0 1.5rem' }}>
              {(p.skills || []).map((s, i) => (
                <div key={i} style={{ background: '#21262d', border: '1px solid #30363d', padding: '0.3rem 0.6rem', borderRadius: 4, fontSize: '0.75rem' }}>
                  <span style={{ color: accent }}>$</span> {s.name}
                </div>
              ))}
            </div>

            {/* Projects */}
            <div style={{ color: accent, fontSize: '0.85rem' }}>user@dev:~$ <span style={{ color: '#58a6ff' }}>git log --projects</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
              {(p.projects || []).map((pj, i) => (
                <div key={i} style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: '0.75rem' }}>
                  <div style={{ color: '#58a6ff', fontWeight: 600, fontSize: '0.9rem' }}>📁 {pj.title}</div>
                  <div style={{ color: '#8b949e', fontSize: '0.75rem', margin: '4px 0 8px', fontFamily: 'Inter' }}>{pj.description}</div>
                  <div style={{ fontSize: '0.7rem' }}>
                    {pj.githubUrl && <a href={safeUrl(pj.githubUrl)} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: 'none', marginRight: 8 }}>[code]</a>}
                    {pj.liveUrl && <a href={safeUrl(pj.liveUrl)} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: 'none' }}>[demo]</a>}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            {p.experience && p.experience.length > 0 && (
              <>
                <div style={{ color: accent, fontSize: '0.85rem', marginTop: '1.5rem' }}>user@dev:~$ <span style={{ color: '#58a6ff' }}>cat experience.log</span></div>
                <div style={{ marginTop: '0.75rem' }}>
                  {p.experience.map((exp, i) => (
                    <div key={i} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '1rem', marginBottom: '1rem' }}>
                      <div style={{ color: '#f0f6fc', fontWeight: 600, fontFamily: 'Inter', fontSize: '0.9rem' }}>{exp.role}</div>
                      <div style={{ color: accent, fontSize: '0.8rem' }}>{exp.company}</div>
                      {exp.startDate && <div style={{ color: '#8b949e', fontSize: '0.72rem', marginBottom: 4 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>}
                      <div style={{ color: '#8b949e', fontSize: '0.8rem', fontFamily: 'Inter' }}>{exp.description}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Education */}
            {p.education && p.education.length > 0 && p.education[0]?.institution && (
              <>
                <div style={{ color: accent, fontSize: '0.85rem', marginTop: '1.5rem' }}>user@dev:~$ <span style={{ color: '#58a6ff' }}>cat education.log</span></div>
                <div style={{ marginTop: '0.75rem' }}>
                  {p.education.map((edu, i) => (
                    <div key={i} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '1rem', marginBottom: '1rem' }}>
                      <div style={{ color: '#f0f6fc', fontWeight: 600, fontFamily: 'Inter', fontSize: '0.9rem' }}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                      <div style={{ color: accent, fontSize: '0.8rem' }}>{edu.institution}</div>
                      {(edu.startDate || edu.endDate) && <div style={{ color: '#8b949e', fontSize: '0.72rem' }}>{edu.startDate} – {edu.endDate || 'Present'}</div>}
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 3: CREATIVE GLASSMORPHIC
  // -------------------------------------------------------------
  return (
    <div 
      style={{
        background: '#0f172a',
        backgroundImage: `radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.2) 0px, transparent 50%), radial-gradient(at 100% 100%, ${accent}33 0px, transparent 50%)`,
        color: '#f8fafc',
        fontFamily: "'Outfit', sans-serif",
        minHeight: '100%',
        padding: '2rem 1.5rem',
        borderRadius: 16,
        overflowY: 'auto'
      }}
    >
      <div style={{ maxWidth: 750, margin: '0 auto' }}>
        
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          {p.personal?.profileImage && (
            <img src={p.personal.profileImage} alt="" style={{ width: 110, height: 110, borderRadius: '50%', border: `3px solid ${accent}`, objectFit: 'cover', margin: '0 auto 1rem', boxShadow: `0 0 25px ${accent}66` }} />
          )}
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: `linear-gradient(135deg, #ffffff 0%, ${accent} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6 }}>
            {p.personal?.fullName}
          </h1>
          <div style={{ fontSize: '1.1rem', color: '#cbd5e1', fontWeight: 500, marginBottom: 12 }}>{p.personal?.tagline}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: 500, margin: '0 auto 1.5rem' }}>{p.personal?.bio}</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {p.social?.github && <a href={safeUrl(p.social.github)} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 1rem', borderRadius: 30, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>GitHub</a>}
            {p.social?.linkedin && <a href={safeUrl(p.social.linkedin)} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 1rem', borderRadius: 30, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>LinkedIn</a>}
            {p.social?.email && <a href={`mailto:${p.social.email}`} style={{ padding: '0.4rem 1rem', borderRadius: 30, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>Email</a>}
            {p.personal?.resumeUrl && <a href={safeUrl(p.personal.resumeUrl)} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 1rem', borderRadius: 30, background: accent, color: '#fff', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Resume PDF</a>}
          </div>
        </div>

        {/* Skills */}
        {p.skills && p.skills.length > 0 && (
          <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1.75rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Skills & Technologies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {p.skills.map((s, i) => (
                <div key={i} style={{ padding: '0.4rem 0.9rem', background: `${accent}22`, border: `1px solid ${accent}55`, borderRadius: 30, fontSize: '0.85rem', fontWeight: 500 }}>
                  {s.name}
                  {s.level && <span style={{ marginLeft: 6, fontSize: '0.7rem', color: accent }}>· {s.level}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Works */}
        {p.projects && p.projects.length > 0 && (
          <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1.75rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Featured Work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1rem' }}>
              {p.projects.map((pj, i) => (
                <div key={i} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden' }}>
                  {pj.image && <img src={pj.image} alt="" style={{ width: '100%', height: 120, objectFit: 'cover' }} />}
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{pj.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 8px' }}>{pj.description}</div>
                    {(pj.githubUrl || pj.liveUrl) && (
                      <div style={{ display: 'flex', gap: 10, fontSize: '0.78rem' }}>
                        {pj.githubUrl && <a href={safeUrl(pj.githubUrl)} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>Code →</a>}
                        {pj.liveUrl && <a href={safeUrl(pj.liveUrl)} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>Live →</a>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {p.experience && p.experience.length > 0 && (
          <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1.75rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Work Experience</h2>
            {p.experience.map((exp, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#f8fafc' }}>{exp.role}</div>
                <div style={{ color: accent, fontSize: '0.85rem', fontWeight: 500 }}>{exp.company}</div>
                {exp.startDate && <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: 4 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>}
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {p.education && p.education.length > 0 && p.education[0]?.institution && (
          <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1.75rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Education</h2>
            {p.education.map((edu, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#f8fafc' }}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                <div style={{ color: accent, fontSize: '0.85rem', fontWeight: 500 }}>{edu.institution}</div>
                {(edu.startDate || edu.endDate) && <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: 4 }}>{edu.startDate} – {edu.endDate || 'Present'}</div>}
                {edu.description && <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{edu.description}</div>}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
