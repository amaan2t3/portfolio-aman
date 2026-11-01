import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, BriefcaseBusiness, Check, ChevronRight, GraduationCap, LayoutDashboard,
  LogOut, Mail, Plus, RotateCcw, Save, ShieldCheck, Sparkles, Trash2, UserRound,
  Wrench, FolderKanban, Award, LoaderCircle,
} from 'lucide-react';
import { usePortfolio } from '../context/usePortfolio';
import './Admin.css';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile & hero', icon: UserRound },
  { id: 'about', label: 'About me', icon: Sparkles },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'contact', label: 'Contact details', icon: Mail },
];

const COLLECTIONS = {
  experience: {
    title: 'Experience',
    singular: 'position',
    fields: [
      { key: 'title', label: 'Job title', required: true },
      { key: 'company', label: 'Company', required: true },
      { key: 'period', label: 'Period' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image URL or asset path', type: 'textarea' },
      { key: 'side', label: 'Timeline side', type: 'select', options: ['left', 'right'] },
    ],
  },
  projects: {
    title: 'Projects',
    singular: 'project',
    fields: [
      { key: 'title', label: 'Project name', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tech', label: 'Technologies (one per line)', type: 'array' },
      { key: 'github', label: 'Source code URL' },
      { key: 'live', label: 'Live demo URL' },
      { key: 'image', label: 'Image URL or asset path', type: 'textarea' },
    ],
  },
  education: {
    title: 'Education',
    singular: 'education item',
    fields: [
      { key: 'degree', label: 'Degree or qualification', required: true },
      { key: 'institution', label: 'Institution', required: true },
      { key: 'period', label: 'Period' },
      { key: 'icon', label: 'Timeline icon', type: 'select', options: ['graduation', 'book', 'award'] },
      { key: 'image', label: 'Image URL or asset path', type: 'textarea' },
    ],
  },
  certificates: {
    title: 'Certificates',
    singular: 'certificate',
    fields: [
      { key: 'title', label: 'Certificate name', required: true },
      { key: 'issuer', label: 'Issuer', required: true },
      { key: 'date', label: 'Date' },
      { key: 'image', label: 'Preview image URL or asset path', type: 'textarea' },
      { key: 'link', label: 'Certificate document URL or asset path' },
    ],
  },
};

const PROFILE_FIELDS = [
  { key: 'name', label: 'Full name', required: true },
  { key: 'brand', label: 'Navbar brand name', required: true },
  { key: 'roles', label: 'Rotating roles (one per line)', type: 'array' },
  { key: 'intro', label: 'Hero introduction', type: 'textarea' },
  { key: 'resume', label: 'Resume URL or asset path' },
  { key: 'github', label: 'GitHub profile URL' },
  { key: 'githubCount', label: 'GitHub projects stat' },
  { key: 'linkedin', label: 'LinkedIn profile URL' },
  { key: 'linkedinCount', label: 'LinkedIn connections stat' },
];

const ABOUT_FIELDS = [
  { key: 'image', label: 'Profile image URL or asset path', type: 'textarea' },
  { key: 'paragraphs', label: 'About paragraphs (separate with a blank line)', type: 'paragraphs' },
];

const CONTACT_FIELDS = [
  { key: 'location', label: 'Location' },
  { key: 'email', label: 'Email address', required: true },
  { key: 'phone', label: 'Phone display text' },
  { key: 'phoneLink', label: 'Phone number for links' },
  { key: 'whatsapp', label: 'WhatsApp number (international format)' },
];

function toInputValue(field, value) {
  if (field.type === 'array') return Array.isArray(value) ? value.join('\n') : '';
  if (field.type === 'paragraphs') return Array.isArray(value) ? value.join('\n\n') : '';
  return value ?? '';
}

function fromInputValue(field, value) {
  if (field.type === 'array') return value.split('\n').map((item) => item.trim()).filter(Boolean);
  if (field.type === 'paragraphs') return value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  return value;
}

function RecordForm({ fields, initialValue, onSave, onCancel }) {
  const [values, setValues] = useState(() => Object.fromEntries(
    fields.map((field) => [field.key, toInputValue(field, initialValue[field.key])]),
  ));
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredField = fields.find((field) => field.required && !String(values[field.key] || '').trim());
    if (requiredField) {
      setError(`${requiredField.label} is required.`);
      return;
    }
    const result = Object.fromEntries(fields.map((field) => [field.key, fromInputValue(field, values[field.key])]));
    try {
      await onSave({ ...initialValue, ...result });
      setError('');
    } catch (saveError) {
      setError(`Could not save changes: ${saveError.message}`);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-grid">
        {fields.map((field) => (
          <label className={`admin-field ${field.type === 'textarea' || field.type === 'array' || field.type === 'paragraphs' ? 'admin-field-wide' : ''}`} key={field.key}>
            <span>{field.label}{field.required && <span className="admin-required"> *</span>}</span>
            {field.type === 'select' ? (
              <select value={values[field.key]} onChange={(event) => setValues({ ...values, [field.key]: event.target.value })}>
                {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : field.type === 'textarea' || field.type === 'array' || field.type === 'paragraphs' ? (
              <textarea
                rows={field.type === 'paragraphs' || field.key === 'description' ? 5 : 3}
                value={values[field.key]}
                onChange={(event) => setValues({ ...values, [field.key]: event.target.value })}
              />
            ) : (
              <input
                type={field.key.toLowerCase().includes('email') ? 'email' : 'text'}
                value={values[field.key]}
                onChange={(event) => setValues({ ...values, [field.key]: event.target.value })}
              />
            )}
          </label>
        ))}
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <div className="admin-form-actions">
        <button className="admin-button admin-button-primary" type="submit"><Save size={16} /> Save changes</button>
        {onCancel && <button className="admin-button admin-button-quiet" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

function CollectionEditor({ section, records, onChange }) {
  const config = COLLECTIONS[section];
  const [activeIndex, setActiveIndex] = useState(records.length ? 0 : -1);
  const [isAdding, setIsAdding] = useState(false);
  const [saveError, setSaveError] = useState('');
  const currentIndex = activeIndex >= records.length ? records.length - 1 : activeIndex;
  const current = isAdding ? Object.fromEntries(config.fields.map((field) => [field.key, field.options?.[0] || ''])) : records[currentIndex];

  const addRecord = () => {
    setActiveIndex(records.length);
    setIsAdding(true);
  };

  const saveRecord = async (record) => {
    const next = [...records];
    if (isAdding) {
      next.push(record);
    } else {
      next[currentIndex] = record;
    }
    try {
      await onChange(next);
      setSaveError('');
    } catch (error) {
      setSaveError(error.message);
      throw error;
    }
    if (isAdding) setActiveIndex(next.length - 1);
    setIsAdding(false);
  };

  const deleteRecord = async () => {
    if (!window.confirm(`Delete this ${config.singular}?`)) return;
    const next = records.filter((_, index) => index !== currentIndex);
    try {
      await onChange(next);
      setSaveError('');
    } catch (error) {
      setSaveError(error.message);
      return;
    }
    setActiveIndex(next.length ? Math.min(currentIndex, next.length - 1) : -1);
    setIsAdding(false);
  };

  return (
    <div className="admin-collection-layout">
      <aside className="admin-record-list">
        <button type="button" className="admin-button admin-button-primary admin-add-button" onClick={addRecord}>
          <Plus size={16} /> Add {config.singular}
        </button>
        {records.map((record, index) => (
          <button
            type="button"
            className={`admin-record-option ${!isAdding && index === currentIndex ? 'is-selected' : ''}`}
            key={`${record.title || record.degree || record.company}-${index}`}
            onClick={() => { setActiveIndex(index); setIsAdding(false); }}
          >
            <span>{record.title || record.degree || record.company || `Item ${index + 1}`}</span>
            <ChevronRight size={16} />
          </button>
        ))}
        {!records.length && <p className="admin-muted admin-empty-list">No entries yet. Add your first one.</p>}
      </aside>
      <div className="admin-panel admin-record-form">
        <div className="admin-panel-heading">
          <div>
            <span className="admin-eyebrow">{isAdding ? 'NEW ENTRY' : 'CONTENT EDITOR'}</span>
            <h2>{isAdding ? `Add ${config.singular}` : current ? `Edit ${config.singular}` : `No ${config.title.toLowerCase()} selected`}</h2>
          </div>
          {!isAdding && current && (
            <button type="button" className="admin-icon-button admin-danger-button" aria-label={`Delete ${config.singular}`} onClick={deleteRecord}>
              <Trash2 size={17} />
            </button>
          )}
        </div>
        {saveError && <p className="admin-error" role="alert">Could not save changes: {saveError}</p>}
        {current && <RecordForm key={`${section}-${isAdding ? 'new' : currentIndex}`} fields={config.fields} initialValue={current} onSave={saveRecord} onCancel={isAdding ? () => setIsAdding(false) : undefined} />}
      </div>
    </div>
  );
}

function SkillsEditor({ categories, onChange }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const index = activeIndex >= categories.length ? categories.length - 1 : activeIndex;
  const category = isAdding ? { title: '', icon: 'code', skills: [] } : categories[index];
  const [title, setTitle] = useState(category?.title || '');
  const [icon, setIcon] = useState(category?.icon || 'code');
  const [items, setItems] = useState(() => (category?.skills || []).map((skill) => `${skill.name} | ${skill.icon || ''}${skill.invert ? ' | invert' : ''}`).join('\n'));
  const [saveError, setSaveError] = useState('');

  const selectCategory = (nextIndex) => {
    const nextCategory = categories[nextIndex];
    setActiveIndex(nextIndex);
    setIsAdding(false);
    setTitle(nextCategory?.title || '');
    setIcon(nextCategory?.icon || 'code');
    setItems((nextCategory?.skills || []).map((skill) => `${skill.name} | ${skill.icon || ''}${skill.invert ? ' | invert' : ''}`).join('\n'));
  };

  const addCategory = () => {
    setActiveIndex(categories.length);
    setIsAdding(true);
    setTitle('');
    setIcon('code');
    setItems('');
  };

  const save = async (event) => {
    event.preventDefault();
    const parsedSkills = items.split('\n').map((line) => {
      const [name, image = '', option = ''] = line.split('|').map((part) => part.trim());
      return name ? { name, icon: image, invert: option.toLowerCase() === 'invert' } : null;
    }).filter(Boolean);
    const categoryData = { title: title.trim(), icon, skills: parsedSkills };
    if (!categoryData.title) return;
    const next = [...categories];
    if (isAdding) {
      next.push(categoryData);
      setActiveIndex(next.length - 1);
    } else {
      next[index] = categoryData;
    }
    try {
      await onChange(next);
      setSaveError('');
    } catch (error) {
      setSaveError(`Could not save changes: ${error.message}`);
      return;
    }
    setIsAdding(false);
  };

  const remove = async () => {
    if (!window.confirm('Delete this skill category and all of its skills?')) return;
    const next = categories.filter((_, itemIndex) => itemIndex !== index);
    try {
      await onChange(next);
      setSaveError('');
    } catch (error) {
      setSaveError(`Could not save changes: ${error.message}`);
      return;
    }
    selectCategory(Math.max(0, Math.min(index, next.length - 1)));
  };

  return (
    <div className="admin-collection-layout">
      <aside className="admin-record-list">
        <button type="button" className="admin-button admin-button-primary admin-add-button" onClick={addCategory}><Plus size={16} /> Add category</button>
        {categories.map((item, itemIndex) => (
          <button type="button" className={`admin-record-option ${!isAdding && itemIndex === index ? 'is-selected' : ''}`} key={`${item.title}-${itemIndex}`} onClick={() => selectCategory(itemIndex)}>
            <span>{item.title}</span><ChevronRight size={16} />
          </button>
        ))}
      </aside>
      <form className="admin-panel admin-record-form admin-form" onSubmit={save}>
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">SKILLS MANAGER</span><h2>{isAdding ? 'New skill category' : 'Edit skill category'}</h2></div>
          {!isAdding && category && <button type="button" className="admin-icon-button admin-danger-button" aria-label="Delete category" onClick={remove}><Trash2 size={17} /></button>}
        </div>
        {saveError && <p className="admin-error" role="alert">{saveError}</p>}
        <div className="admin-form-grid">
          <label className="admin-field"><span>Category name</span><input value={title} onChange={(event) => setTitle(event.target.value)} required /></label>
          <label className="admin-field"><span>Category icon</span><select value={icon} onChange={(event) => setIcon(event.target.value)}><option value="monitor">Monitor</option><option value="code">Code</option><option value="tools">Tools</option></select></label>
          <label className="admin-field admin-field-wide">
            <span>Skills — one per line: name | image URL | invert (optional)</span>
            <textarea rows="12" value={items} onChange={(event) => setItems(event.target.value)} placeholder={'React | https://example.com/react.svg\nNode.js | https://example.com/node.svg'} />
          </label>
        </div>
        <div className="admin-form-actions"><button className="admin-button admin-button-primary" type="submit"><Save size={16} /> Save category</button></div>
      </form>
    </div>
  );
}

function AdminLogin({ error, onError, onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    onError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) onError(result.error || 'Unable to sign in.');
      else onAuthenticated(result.email);
    } catch (signInError) {
      console.error('Unable to sign in to portfolio admin:', signInError);
      onError(`Sign in failed: ${signInError.message}. Make sure the API server is running.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-shell">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <Link to="/" className="admin-brand"><span className="admin-brand-mark">AI</span><span>Amaan<span className="admin-brand-dot">.</span><small>SECURE ADMIN</small></span></Link>
        <div className="admin-login-icon"><ShieldCheck size={24} /></div>
        <span className="admin-eyebrow">PORTFOLIO MANAGEMENT</span>
        <h1>Admin sign in</h1>
        <p>Sign in with an email account that has been granted portfolio administrator access.</p>
        <label className="admin-field"><span>Email</span><input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label className="admin-field"><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-button admin-button-primary admin-login-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle className="admin-spinner" size={17} /> : <ShieldCheck size={17} />}
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/" className="admin-login-back"><ArrowLeft size={15} /> Back to portfolio</Link>
      </form>
    </div>
  );
}

function Admin() {
  const [authStatus, setAuthStatus] = useState('loading');
  const [session, setSession] = useState(null);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let active = true;
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session', { credentials: 'same-origin' });
        const result = await response.json();
        if (!active) return;
        if (!response.ok) throw new Error(result.error || 'Could not check the login session.');
        if (!result.configured) {
          setAuthStatus('unconfigured');
          return;
        }
        if (result.authenticated) {
          setSession({ email: result.email });
          setAuthStatus('authorized');
          return;
        }
        setAuthStatus('signed-out');
      } catch (error) {
        if (!active) return;
        console.error('Unable to check portfolio admin session:', error);
        setAuthError(`Admin API unavailable: ${error.message}`);
        setAuthStatus('error');
      }
    };

    void checkSession();
    return () => { active = false; };
  }, []);

  if (authStatus === 'unconfigured') {
    return (
      <div className="admin-login-shell">
        <div className="admin-login-card">
          <div className="admin-login-icon"><ShieldCheck size={24} /></div>
          <span className="admin-eyebrow">SETUP REQUIRED</span>
          <h1>Configure secure sign in</h1>
          <p>Set <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code>, <code>ADMIN_SESSION_SECRET</code>, and <code>SUPABASE_SERVICE_ROLE_KEY</code> in the server environment. Keep these server-only secrets out of all <code>VITE_</code> variables.</p>
          <Link to="/" className="admin-login-back"><ArrowLeft size={15} /> Back to portfolio</Link>
        </div>
      </div>
    );
  }

  if (authStatus === 'loading') {
    return <div className="admin-auth-loading"><LoaderCircle className="admin-spinner" size={24} /> Verifying admin access…</div>;
  }

  if (authStatus !== 'authorized') {
    return <AdminLogin
      error={authError}
      onError={setAuthError}
      onAuthenticated={(authenticatedEmail) => {
        setSession({ email: authenticatedEmail });
        setAuthStatus('authorized');
      }}
    />;
  }

  return <AdminDashboard session={session} onSignedOut={() => { setSession(null); setAuthStatus('signed-out'); }} />;
}

function AdminDashboard({ session, onSignedOut }) {
  const { data, storageError, contentLoading, updateSection, resetPortfolio } = usePortfolio();
  const [activeSection, setActiveSection] = useState('overview');
  const [actionError, setActionError] = useState('');
  const selectedSection = SECTIONS.find((section) => section.id === activeSection);
  const totalItems = useMemo(() => ['skills', 'experience', 'projects', 'education', 'certificates'].reduce(
    (total, section) => total + (data[section] || []).length,
    0,
  ), [data]);

  const saveSection = (section, value) => updateSection(section, value);

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
      if (!response.ok) throw new Error('The server could not end this session.');
      onSignedOut();
    } catch (error) {
      setActionError(`Could not sign out: ${error.message}`);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Restore all original portfolio content? This replaces your saved changes.')) return;
    try {
      await resetPortfolio();
      setActionError('');
    } catch (error) {
      setActionError(`Could not restore original content: ${error.message}`);
    }
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand"><span className="admin-brand-mark">AI</span><span>Amaan<span className="admin-brand-dot">.</span><small>PORTFOLIO CMS</small></span></Link>
        <div className="admin-menu-label">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin sections">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button type="button" key={id} onClick={() => setActiveSection(id)} className={`admin-nav-link ${id === activeSection ? 'is-active' : ''}`}>
              <Icon size={18} /><span>{label}</span>{id === activeSection && <span className="admin-nav-indicator" />}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-back-link"><ArrowLeft size={16} /> View portfolio</Link>
          <p>Changes save to Supabase.</p>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div><span className="admin-eyebrow">PORTFOLIO MANAGEMENT</span><h1>{selectedSection.label}</h1></div>
          <div className="admin-topbar-right">
            <span className="admin-save-status"><span className="admin-status-dot" /> Supabase secured</span>
            <span className="admin-user-email">{session.user.email}</span>
            <button type="button" className="admin-button admin-button-quiet admin-signout-button" onClick={handleSignOut}><LogOut size={15} /> Sign out</button>
            <Link to="/" className="admin-button admin-button-quiet admin-view-button"><ArrowLeft size={15} /> View site</Link>
          </div>
        </header>

        {actionError && <div className="admin-alert" role="alert">{actionError}</div>}
        {storageError && <div className="admin-alert" role="alert">{storageError}</div>}

        {contentLoading ? (
          <div className="admin-auth-loading"><LoaderCircle className="admin-spinner" size={22} /> Loading saved portfolio content…</div>
        ) : activeSection === 'overview' ? (
          <>
            <section className="admin-welcome">
              <div><span className="admin-eyebrow">YOUR CONTENT, ONE PLACE</span><h2>Welcome back, {data.profile.name.split(' ')[0]}.</h2><p>Keep your portfolio up to date. Changes appear on the public pages as soon as they are saved.</p></div>
              <div className="admin-welcome-art"><div className="admin-art-ring" /><Sparkles size={30} /></div>
            </section>
            <section className="admin-stats-grid" aria-label="Portfolio content totals">
              {[
                ['Projects', data.projects.length, FolderKanban],
                ['Experience', data.experience.length, BriefcaseBusiness],
                ['Education', data.education.length, GraduationCap],
                ['Certificates', data.certificates.length, Award],
              ].map(([label, count, Icon]) => <div className="admin-stat-card" key={label}><span className="admin-stat-icon"><Icon size={19} /></span><span className="admin-stat-count">{count}</span><span className="admin-stat-label">{label}</span></div>)}
            </section>
            <section className="admin-panel admin-overview-panel">
              <div className="admin-panel-heading"><div><span className="admin-eyebrow">CONTENT CHECKLIST</span><h2>Manage your portfolio</h2></div><span className="admin-total-pill">{totalItems} total entries</span></div>
              <div className="admin-quick-links">
                {SECTIONS.filter((section) => section.id !== 'overview').map(({ id, label, icon: Icon }) => (
                  <button type="button" className="admin-quick-link" key={id} onClick={() => setActiveSection(id)}><span className="admin-quick-icon"><Icon size={17} /></span><span>{label}</span><ChevronRight size={16} /></button>
                ))}
              </div>
              <button type="button" className="admin-reset-button" onClick={handleReset}><RotateCcw size={15} /> Restore original portfolio content</button>
            </section>
            <div className="admin-local-note"><Check size={17} /><p><strong>Administrator access verified</strong> — content is saved to Supabase. Row-level security restricts changes to accounts explicitly added to the portfolio administrator allowlist.</p></div>
          </>
        ) : (
          <section className="admin-content-section">
            {activeSection === 'profile' && (
              <div className="admin-panel">
                <div className="admin-panel-heading"><div><span className="admin-eyebrow">HERO & NAVIGATION</span><h2>Profile information</h2><p>Personal details used in your homepage and site navigation.</p></div></div>
                <RecordForm key="profile" fields={PROFILE_FIELDS} initialValue={data.profile} onSave={(value) => saveSection('profile', value)} />
              </div>
            )}
            {activeSection === 'about' && (
              <div className="admin-panel">
                <div className="admin-panel-heading"><div><span className="admin-eyebrow">ABOUT PAGE</span><h2>Your story</h2><p>Use a blank line between paragraphs.</p></div></div>
                <RecordForm key="about" fields={ABOUT_FIELDS} initialValue={data.about} onSave={(value) => saveSection('about', value)} />
              </div>
            )}
            {activeSection === 'contact' && (
              <div className="admin-panel">
                <div className="admin-panel-heading"><div><span className="admin-eyebrow">CONTACT PAGE</span><h2>Contact information</h2><p>These details are shown in your contact section and hero.</p></div></div>
                <RecordForm key="contact" fields={CONTACT_FIELDS} initialValue={data.contact} onSave={(value) => saveSection('contact', value)} />
              </div>
            )}
            {COLLECTIONS[activeSection] && <CollectionEditor key={activeSection} section={activeSection} records={data[activeSection]} onChange={(value) => saveSection(activeSection, value)} />}
            {activeSection === 'skills' && <SkillsEditor categories={data.skills} onChange={(value) => saveSection('skills', value)} />}
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;
