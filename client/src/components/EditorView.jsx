import React, { useState } from 'react';
import { 
  User, 
  Share2, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Palette, 
  Plus, 
  Trash2, 
  Globe, 
  Mail, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

export default function EditorView({ portfolio, onChange }) {
  const [activeTab, setActiveTab] = useState('personal');

  if (!portfolio) return null;

  // Helpers to update nested properties easily
  const updatePersonal = (field, value) => {
    onChange({
      ...portfolio,
      personal: { ...portfolio.personal, [field]: value }
    });
  };

  const updateSocial = (field, value) => {
    onChange({
      ...portfolio,
      social: { ...portfolio.social, [field]: value }
    });
  };

  const updateTheme = (field, value) => {
    onChange({
      ...portfolio,
      customTheme: { ...portfolio.customTheme, [field]: value }
    });
  };

  // Skills handlers
  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: 'New Skill',
      category: 'Technical',
      level: 'Advanced',
      order: (portfolio.skills?.length || 0) + 1,
    };
    onChange({ ...portfolio, skills: [...(portfolio.skills || []), newSkill] });
  };

  const updateSkill = (index, field, value) => {
    const updated = [...(portfolio.skills || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...portfolio, skills: updated });
  };

  const removeSkill = (index) => {
    const updated = (portfolio.skills || []).filter((_, i) => i !== index);
    onChange({ ...portfolio, skills: updated });
  };

  // Projects handlers
  const addProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description goes here.',
      techStack: ['React', 'Node.js'],
      githubUrl: '',
      liveUrl: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      order: (portfolio.projects?.length || 0) + 1,
    };
    onChange({ ...portfolio, projects: [...(portfolio.projects || []), newProj] });
  };

  const updateProject = (index, field, value) => {
    const updated = [...(portfolio.projects || [])];
    if (field === 'techStack') {
      value = typeof value === 'string' ? value.split(',').map(s => s.trim()) : value;
    }
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...portfolio, projects: updated });
  };

  const removeProject = (index) => {
    const updated = (portfolio.projects || []).filter((_, i) => i !== index);
    onChange({ ...portfolio, projects: updated });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: 'Tech Company',
      role: 'Software Engineer',
      location: 'Remote',
      startDate: '2024-01',
      endDate: '2025-01',
      current: false,
      description: 'Responsibilities & accomplishments...',
    };
    onChange({ ...portfolio, experience: [...(portfolio.experience || []), newExp] });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...(portfolio.experience || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...portfolio, experience: updated });
  };

  const removeExperience = (index) => {
    const updated = (portfolio.experience || []).filter((_, i) => i !== index);
    onChange({ ...portfolio, experience: updated });
  };

  // Tabs navigation config
  const tabs = [
    { id: 'personal', label: 'Personal & Bio', icon: User },
    { id: 'social', label: 'Social Links', icon: Share2 },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Sparkles },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'theme', label: 'Theme & Template', icon: Palette },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Editor Sub-Header Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ whiteSpace: 'nowrap', borderRadius: 8 }}
            >
              <Icon size={14} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        
        {/* Personal & Bio */}
        {activeTab === 'personal' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>Personal Details & Bio</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={portfolio.personal?.fullName || ''} 
                  onChange={(e) => updatePersonal('fullName', e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Username (URL handle)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={portfolio.personal?.username || ''} 
                  onChange={(e) => updatePersonal('username', e.target.value)} 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Professional Tagline</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Full Stack Engineer | React & Node.js Specialist"
                value={portfolio.personal?.tagline || ''} 
                onChange={(e) => updatePersonal('tagline', e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Short Bio / About Me</label>
              <textarea 
                className="input-field" 
                rows={3}
                placeholder="Write a brief introduction about your passion, stack, and experience..."
                value={portfolio.personal?.bio || ''} 
                onChange={(e) => updatePersonal('bio', e.target.value)} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="San Francisco, CA"
                  value={portfolio.personal?.location || ''} 
                  onChange={(e) => updatePersonal('location', e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Profile Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {portfolio.personal?.profileImage && (
                    <img
                      src={portfolio.personal.profileImage}
                      alt="Profile preview"
                      style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
                    />
                  )}
                  <label
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.55rem 1rem', borderRadius: 8, cursor: 'pointer',
                      background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                      color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 500,
                      transition: 'border-color 0.2s'
                    }}
                  >
                    📁 Choose from device
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => updatePersonal('profileImage', ev.target.result);
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                  {portfolio.personal?.profileImage && (
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ alignSelf: 'flex-start' }}
                      onClick={() => updatePersonal('profileImage', '')}
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Resume PDF Link</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="https://drive.google.com/..."
                value={portfolio.personal?.resumeUrl || ''} 
                onChange={(e) => updatePersonal('resumeUrl', e.target.value)} 
              />
            </div>
          </div>
        )}

        {/* Social Links */}
        {activeTab === 'social' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>Social Handles & Contact</h3>
            
            <div className="form-group">
              <label className="form-label"><LinkIcon size={14} /> GitHub Profile URL</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="https://github.com/username"
                value={portfolio.social?.github || ''} 
                onChange={(e) => updateSocial('github', e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label"><LinkIcon size={14} /> LinkedIn Profile URL</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="https://linkedin.com/in/username"
                value={portfolio.social?.linkedin || ''} 
                onChange={(e) => updateSocial('linkedin', e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label"><LinkIcon size={14} /> Twitter / X Profile URL</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="https://twitter.com/username"
                value={portfolio.social?.twitter || ''} 
                onChange={(e) => updateSocial('twitter', e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label"><Mail size={14} /> Contact Email</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="your.email@example.com"
                value={portfolio.social?.email || ''} 
                onChange={(e) => updateSocial('email', e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label"><Globe size={14} /> Personal Website / Blog</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="https://yourwebsite.com"
                value={portfolio.social?.website || ''} 
                onChange={(e) => updateSocial('website', e.target.value)} 
              />
            </div>
          </div>
        )}

        {/* Skills */}
        {activeTab === 'skills' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>Technical Skills & Tools</h3>
              <button onClick={addSkill} className="btn btn-primary btn-sm">
                <Plus size={14} /> Add Skill
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(portfolio.skills || []).map((skill, idx) => (
                <div key={skill.id || idx} className="glass-card" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    style={{ flex: 2 }}
                    placeholder="Skill Name (e.g. React.js)"
                    value={skill.name} 
                    onChange={(e) => updateSkill(idx, 'name', e.target.value)} 
                  />
                  <select 
                    className="input-field" 
                    style={{ flex: 1 }}
                    value={skill.level || 'Advanced'}
                    onChange={(e) => updateSkill(idx, 'level', e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button 
                    onClick={() => removeSkill(idx)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0.65rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>Featured Projects</h3>
              <button onClick={addProject} className="btn btn-primary btn-sm">
                <Plus size={14} /> Add Project
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(portfolio.projects || []).map((project, idx) => (
                <div key={project.id || idx} className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Project #{idx + 1}</div>
                    <button onClick={() => removeProject(idx)} className="btn btn-danger btn-sm">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Title</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={project.title} 
                      onChange={(e) => updateProject(idx, 'title', e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="input-field" 
                      rows={2}
                      value={project.description} 
                      onChange={(e) => updateProject(idx, 'description', e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tech Stack (comma separated)</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="React, Node.js, MongoDB"
                      value={Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack} 
                      onChange={(e) => updateProject(idx, 'techStack', e.target.value)} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">GitHub Link</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={project.githubUrl || ''} 
                        onChange={(e) => updateProject(idx, 'githubUrl', e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Live Demo Link</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={project.liveUrl || ''} 
                        onChange={(e) => updateProject(idx, 'liveUrl', e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cover Image</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {project.image && (
                        <img
                          src={project.image}
                          alt="Cover preview"
                          style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border-color)' }}
                        />
                      )}
                      <label
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                          padding: '0.55rem 1rem', borderRadius: 8, cursor: 'pointer',
                          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                          color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 500,
                        }}
                      >
                        📁 Choose from device
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => updateProject(idx, 'image', ev.target.result);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      {project.image && (
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ alignSelf: 'flex-start' }}
                          onClick={() => updateProject(idx, 'image', '')}
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {activeTab === 'experience' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>Work Experience</h3>
              <button onClick={addExperience} className="btn btn-primary btn-sm">
                <Plus size={14} /> Add Experience
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(portfolio.experience || []).map((exp, idx) => (
                <div key={exp.id || idx} className="glass-card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Role #{idx + 1}</span>
                    <button onClick={() => removeExperience(idx)} className="btn btn-danger btn-sm"><Trash2 size={14} /></button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input type="text" className="input-field" value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role / Position</label>
                      <input type="text" className="input-field" value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="input-field" rows={2} value={exp.description} onChange={(e) => updateExperience(idx, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {activeTab === 'education' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>Education Details</h3>
            <div className="glass-card" style={{ padding: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Institution Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={portfolio.education?.[0]?.institution || ''} 
                  onChange={(e) => {
                    const updatedEdu = [...(portfolio.education || [])];
                    if (!updatedEdu[0]) updatedEdu[0] = { id: 'ed1' };
                    updatedEdu[0].institution = e.target.value;
                    onChange({ ...portfolio, education: updatedEdu });
                  }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Degree</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={portfolio.education?.[0]?.degree || ''} 
                    onChange={(e) => {
                      const updatedEdu = [...(portfolio.education || [])];
                      if (!updatedEdu[0]) updatedEdu[0] = { id: 'ed1' };
                      updatedEdu[0].degree = e.target.value;
                      onChange({ ...portfolio, education: updatedEdu });
                    }} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Field of Study</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={portfolio.education?.[0]?.field || ''} 
                    onChange={(e) => {
                      const updatedEdu = [...(portfolio.education || [])];
                      if (!updatedEdu[0]) updatedEdu[0] = { id: 'ed1' };
                      updatedEdu[0].field = e.target.value;
                      onChange({ ...portfolio, education: updatedEdu });
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theme & Template */}
        {activeTab === 'theme' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>Theme & Template Settings</h3>
            
            {/* Template Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ marginBottom: '0.75rem' }}>Select Portfolio Template Style</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { id: 'minimal', title: 'Minimal', desc: 'Clean, elegant & focused' },
                  { id: 'developer', title: 'Developer', desc: 'Terminal & dark mode' },
                  { id: 'creative', title: 'Creative', desc: 'Vibrant glassmorphic' },
                ].map((tmpl) => {
                  const isSelected = portfolio.template === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => onChange({ ...portfolio, template: tmpl.id })}
                      className="glass-card"
                      style={{
                        padding: '1rem',
                        cursor: 'pointer',
                        borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                        background: isSelected ? 'rgba(235, 50, 55, 0.15)' : 'var(--bg-card)',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: isSelected ? 'var(--accent-primary)' : '#fff' }}>{tmpl.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{tmpl.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accent Color */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Accent Color Theme</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>HEX Code:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-input)', padding: '0.2rem 0.5rem', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                    <input 
                      type="color" 
                      value={portfolio.customTheme?.accentColor || '#eb3237'} 
                      onChange={(e) => updateTheme('accentColor', e.target.value)}
                      style={{ width: 20, height: 20, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 4, padding: 0 }}
                      title="Click to open color picker chart"
                    />
                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#fff', textTransform: 'uppercase', fontWeight: 600 }}>
                      {portfolio.customTheme?.accentColor || '#eb3237'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
                {[
                  { name: 'Showcase Red', hex: '#eb3237' },
                  { name: 'Indigo Purple', hex: '#6366f1' },
                  { name: 'Hot Pink', hex: '#ec4899' },
                  { name: 'Emerald Green', hex: '#10b981' },
                  { name: 'Amber Gold', hex: '#f59e0b' },
                  { name: 'Royal Blue', hex: '#3b82f6' },
                  { name: 'Deep Violet', hex: '#8b5cf6' },
                  { name: 'Cyan Blue', hex: '#06b6d4' },
                  { name: 'Bright Orange', hex: '#f97316' },
                ].map((preset) => {
                  const isSelected = portfolio.customTheme?.accentColor?.toLowerCase() === preset.hex.toLowerCase();
                  return (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => updateTheme('accentColor', preset.hex)}
                      title={`${preset.name} (${preset.hex})`}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        background: preset.hex,
                        border: isSelected ? '3px solid #ffffff' : '2px solid transparent',
                        cursor: 'pointer',
                        boxShadow: isSelected ? `0 0 12px ${preset.hex}` : '0 4px 10px rgba(0,0,0,0.3)',
                        transition: 'all 0.2s ease',
                        transform: isSelected ? 'scale(1.12)' : 'scale(1)'
                      }}
                    />
                  );
                })}
                
                {/* Rainbow Wheel Color Picker Chart */}
                <label 
                  title="Open Color Picker Spectrum Chart"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                    border: '2px solid rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    transition: 'transform 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <input 
                    type="color" 
                    value={portfolio.customTheme?.accentColor || '#eb3237'} 
                    onChange={(e) => updateTheme('accentColor', e.target.value)}
                    style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                  />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff', boxShadow: '0 0 4px rgba(0,0,0,0.6)' }} />
                </label>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600 }}>Dark Theme Background</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toggle between dark slate and light mode background</div>
              </div>
              <input 
                type="checkbox"
                checked={portfolio.customTheme?.darkTheme !== false}
                onChange={(e) => updateTheme('darkTheme', e.target.checked)}
                style={{ width: 20, height: 20, cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
