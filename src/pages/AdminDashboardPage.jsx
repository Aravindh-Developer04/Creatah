import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Search,
  Download,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Building,
  DollarSign,
  Clock,
  Briefcase,
  User,
  Users,
  CheckCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  X,
  AlertCircle
} from 'lucide-react';
import {
  loginAdmin,
  fetchAdminLeads,
  updateRecordStatus,
  deleteRecord,
  getStoredToken,
  getStoredAdminUser,
  clearAuth
} from '../services/adminService';
import './AdminDashboardPage.css';

export default function AdminDashboardPage() {
  // Auth state
  const [token, setToken] = useState(() => getStoredToken());
  const [adminUser, setAdminUser] = useState(() => getStoredAdminUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getStoredToken());

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    total_leads: 0,
    contact_leads: 0,
    proposal_leads: 0,
    estimate_leads: 0,
    applications: 0,
    users: 0,
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Load dashboard data when authenticated or activeTab changes
  useEffect(() => {
    if (isAuthenticated && token) {
      loadData(activeTab, searchQuery);
    }
  }, [isAuthenticated, token, activeTab]);

  const loadData = async (tab = activeTab, query = searchQuery) => {
    setDataLoading(true);
    setErrorMsg('');
    const res = await fetchAdminLeads(token, tab, query);

    if (res.unauthorized) {
      setIsAuthenticated(false);
      setToken(null);
      clearAuth();
      setLoginError('Your session has expired. Please sign in again.');
      setDataLoading(false);
      return;
    }

    if (res.success) {
      setRecords(res.records || []);
      setStats((prev) => ({ ...prev, ...(res.stats || {}) }));
    } else {
      setErrorMsg(res.error || 'Failed to load records from API server.');
    }
    setDataLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    const res = await loginAdmin(usernameInput.trim(), passwordInput.trim(), rememberMe);

    if (res.success) {
      setToken(res.token);
      setAdminUser(res.admin);
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      setLoginError(res.error || 'Invalid credentials.');
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Admin Portal?')) {
      clearAuth();
      setIsAuthenticated(false);
      setToken(null);
      setRecords([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData(activeTab, searchQuery);
  };

  const handleStatusChange = async (id, newStatus, type = 'lead') => {
    const success = await updateRecordStatus(token, id, newStatus, type);
    if (success) {
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord((prev) => ({ ...prev, status: newStatus }));
      }
    } else {
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id, type = 'lead') => {
    if (!window.confirm(`Are you sure you want to permanently delete record #${id}?`)) {
      return;
    }
    const success = await deleteRecord(token, id, type);
    if (success) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord(null);
      }
      loadData(activeTab, searchQuery);
    } else {
      alert('Failed to delete record.');
    }
  };

  // Client-Side CSV Export
  const exportToCSV = () => {
    if (records.length === 0) {
      alert('No records available to export.');
      return;
    }

    let headers = [];
    let rows = [];

    if (activeTab === 'applications') {
      headers = ['ID', 'Date', 'Role', 'Applicant Name', 'Email', 'Phone', 'Experience', 'Portfolio', 'LinkedIn', 'Status', 'Cover Note'];
      rows = records.map((r) => [
        r.id,
        r.created_at,
        `"${(r.job_title || '').replace(/"/g, '""')}"`,
        `"${(r.applicant_name || '').replace(/"/g, '""')}"`,
        r.applicant_email,
        r.applicant_phone,
        `"${(r.experience_years || '').replace(/"/g, '""')}"`,
        r.portfolio_url || '',
        r.linkedin_url || '',
        r.status || 'submitted',
        `"${(r.cover_note || '').replace(/"/g, '""')}"`
      ]);
    } else if (activeTab === 'users') {
      headers = ['ID', 'Date', 'Name', 'Email', 'Gender', 'Country'];
      rows = records.map((r) => [
        r.id,
        r.created_at,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        r.email,
        r.gender || '',
        r.country || ''
      ]);
    } else {
      headers = ['ID', 'Date', 'Form Type', 'Client Name', 'Email', 'Phone', 'Service', 'Budget', 'Timeline', 'Company', 'Status', 'Message'];
      rows = records.map((r) => [
        r.id,
        r.created_at,
        r.form_type,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        r.email,
        r.phone,
        `"${(r.service || '').replace(/"/g, '""')}"`,
        `"${(r.budget || '').replace(/"/g, '""')}"`,
        `"${(r.timeline || '').replace(/"/g, '""')}"`,
        `"${(r.company || '').replace(/"/g, '""')}"`,
        r.status || 'new',
        `"${(r.message || '').replace(/"/g, '""')}"`
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `creatah_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // VIEW A: Unauthenticated State -> React Login Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-ambient-glow glow-1" />
        <div className="admin-ambient-glow glow-2" />

        <div className="admin-login-container">
          <div className="admin-login-brand">
            <div className="admin-logo-badge">C</div>
            <h1 className="admin-login-title">Creatah Admin Portal</h1>
            <p className="admin-login-subtitle">
              Encrypted access to real-time client inquiries & leads
            </p>
          </div>

          <div className="admin-login-card">
            {loginError && (
              <div className="admin-alert-error">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="admin-form-group">
                <label className="admin-field-label">Username</label>
                <div className="relative">
                  <User className="admin-input-icon left" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="admin"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="admin-input-field with-icon"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-field-label">Password</label>
                <div className="relative">
                  <Lock className="admin-input-icon left" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="admin-input-field with-icon with-right-btn"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="admin-password-toggle-btn"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember on this device</span>
                </label>
                <span className="text-slate-500 font-mono text-[11px]">HMAC-SHA256</span>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="admin-submit-btn"
              >
                {loginLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="admin-demo-hint">
              <span className="text-slate-400">Default Credentials (Click to auto-fill):</span>
              <button
                type="button"
                onClick={() => {
                  setUsernameInput('admin');
                  setPasswordInput('Creatah@2026');
                }}
                className="flex items-center justify-center gap-2 mt-1.5 mx-auto text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1 rounded-md border border-slate-700/60"
                title="Click to auto-fill credentials"
              >
                <code className="text-blue-400 font-mono text-xs">admin</code>
                <span className="text-slate-500">/</span>
                <code className="text-blue-400 font-mono text-xs">Creatah@2026</code>
              </button>
            </div>
          </div>

          <div className="admin-security-footer">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>End-to-End Encrypted Token Transmission (256-bit)</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: Authenticated State -> Full React Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="admin-dashboard-root">
      {/* Top Navigation Bar */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="flex items-center gap-3">
            <div className="admin-header-logo">C</div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="admin-brand-title">Creatah Data Manager</h1>
                <span className="admin-badge-live">
                  <span className="admin-pulse-dot" />
                  API Active
                </span>
              </div>
              <p className="admin-brand-sub">React Frontend Portal • Protected JSON Ingestion</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="admin-user-pill">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>{adminUser || 'Superadmin'}</span>
            </div>

            <button
              onClick={() => loadData(activeTab, searchQuery)}
              disabled={dataLoading}
              className="admin-action-btn"
              title="Refresh records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={exportToCSV}
              className="admin-action-btn export"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="admin-action-btn logout"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main-container">
        {/* Metric Cards */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="admin-metric-head">
              <span className="admin-metric-label">Total Inquiries</span>
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <div className="admin-metric-value">{stats.total_leads}</div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-head">
              <span className="admin-metric-label">Contact Forms</span>
              <Mail className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="admin-metric-value text-cyan-400">{stats.contact_leads}</div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-head">
              <span className="admin-metric-label">Proposals</span>
              <Briefcase className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="admin-metric-value text-indigo-400">{stats.proposal_leads}</div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-head">
              <span className="admin-metric-label">Estimates</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="admin-metric-value text-amber-400">{stats.estimate_leads}</div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-head">
              <span className="admin-metric-label">Careers</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="admin-metric-value text-emerald-400">{stats.applications}</div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-head">
              <span className="admin-metric-label">Users</span>
              <Users className="w-4 h-4 text-pink-400" />
            </div>
            <div className="admin-metric-value text-pink-400">{stats.users}</div>
          </div>
        </div>

        {/* Toolbar: Navigation Tabs & Search */}
        <div className="admin-toolbar">
          <nav className="admin-tabs-nav">
            <button
              onClick={() => setActiveTab('leads')}
              className={`admin-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
            >
              All Inquiries ({stats.total_leads})
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            >
              Contact ({stats.contact_leads})
            </button>
            <button
              onClick={() => setActiveTab('proposals')}
              className={`admin-tab-btn ${activeTab === 'proposals' ? 'active' : ''}`}
            >
              Proposals ({stats.proposal_leads})
            </button>
            <button
              onClick={() => setActiveTab('estimates')}
              className={`admin-tab-btn ${activeTab === 'estimates' ? 'active' : ''}`}
            >
              Estimates ({stats.estimate_leads})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`admin-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            >
              Job Applications ({stats.applications})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`admin-tab-btn pink ${activeTab === 'users' ? 'active' : ''}`}
            >
              Users ({stats.users})
            </button>
          </nav>

          <form onSubmit={handleSearchSubmit} className="admin-search-form">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  loadData(activeTab, '');
                }}
                className="admin-clear-search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button type="submit" className="admin-search-btn">
              Search
            </button>
          </form>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="admin-alert-banner">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-200">{errorMsg}</span>
          </div>
        )}

        {/* Data Table */}
        <div className="admin-table-wrapper">
          {dataLoading ? (
            <div className="admin-table-loading">
              <RefreshCw className="w-7 h-7 text-blue-500 animate-spin" />
              <p className="text-xs text-slate-400 mt-2">Connecting to PHP API & fetching records...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="admin-empty-state">
              <FileText className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">No records found</p>
              <p className="text-xs text-slate-500 mt-1">
                Submit a form through the website or Postman to see it appear here live!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date & Time</th>
                    {activeTab === 'applications' ? (
                      <>
                        <th>Role</th>
                        <th>Applicant</th>
                        <th>Contact</th>
                        <th>Links</th>
                        <th>Status</th>
                        <th>Action</th>
                      </>
                    ) : activeTab === 'users' ? (
                      <>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Action</th>
                      </>
                    ) : (
                      <>
                        <th>Type</th>
                        <th>Client</th>
                        <th>Contact</th>
                        <th>Service / Budget</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td className="font-mono text-slate-500">#{r.id}</td>
                      <td className="whitespace-nowrap">
                        <div className="text-slate-200 font-medium">
                          {new Date(r.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {new Date(r.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      {activeTab === 'applications' ? (
                        <>
                          <td>
                            <span className="admin-role-badge">
                              {r.job_title}
                            </span>
                          </td>
                          <td>
                            <div className="font-bold text-white">{r.applicant_name}</div>
                            {r.experience_years && (
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                Exp: {r.experience_years}
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="space-y-1">
                              <a href={`mailto:${r.applicant_email}`} className="admin-link-email">
                                <Mail className="w-3 h-3 inline mr-1" />
                                {r.applicant_email}
                              </a>
                              <a href={`tel:${r.applicant_phone}`} className="admin-link-phone">
                                <Phone className="w-3 h-3 inline mr-1" />
                                {r.applicant_phone}
                              </a>
                            </div>
                          </td>
                          <td>
                            <div className="space-y-1">
                              {r.portfolio_url && (
                                <a
                                  href={r.portfolio_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="admin-link-external"
                                >
                                  Portfolio <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
                                </a>
                              )}
                              {r.linkedin_url && (
                                <a
                                  href={r.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="admin-link-external cyan"
                                >
                                  LinkedIn <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td>
                            <select
                              value={r.status || 'submitted'}
                              onChange={(e) => handleStatusChange(r.id, e.target.value, 'application')}
                              className="admin-status-select"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedRecord({ ...r, _type: 'application' })}
                                className="admin-row-btn"
                                title="View details"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleDelete(r.id, 'application')}
                                className="admin-row-btn delete"
                                title="Delete application"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      ) : activeTab === 'users' ? (
                        <>
                          <td className="font-bold text-white">{r.name}</td>
                          <td>
                            <a href={`mailto:${r.email}`} className="admin-link-email">
                              {r.email}
                            </a>
                          </td>
                          <td>
                            <span className="admin-tag-badge">
                              {r.gender || 'Not Specified'}
                            </span>
                          </td>
                          <td className="text-slate-300 font-medium">
                            {r.country || 'Not Specified'}
                          </td>
                          <td>
                            <button
                              onClick={() => handleDelete(r.id, 'user')}
                              className="admin-row-btn delete"
                              title="Delete user"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <span className={`admin-type-badge ${r.form_type}`}>
                              {(r.form_type || 'lead').replace('_', ' ')}
                            </span>
                          </td>
                          <td>
                            <div className="font-bold text-white">{r.name}</div>
                            {r.company && (
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <Building className="w-3 h-3 text-slate-500" />
                                {r.company}
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="space-y-1">
                              <a href={`mailto:${r.email}`} className="admin-link-email">
                                <Mail className="w-3 h-3 inline mr-1" />
                                {r.email}
                              </a>
                              {r.phone && (
                                <a href={`tel:${r.phone}`} className="admin-link-phone">
                                  <Phone className="w-3 h-3 inline mr-1" />
                                  {r.phone}
                                </a>
                              )}
                            </div>
                          </td>
                          <td>
                            {r.service && (
                              <div className="font-medium text-slate-200">{r.service}</div>
                            )}
                            {r.budget && (
                              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                                Budget: {r.budget}
                              </div>
                            )}
                            {r.timeline && (
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {r.timeline}
                              </div>
                            )}
                          </td>
                          <td>
                            <div
                              onClick={() => setSelectedRecord({ ...r, _type: 'lead' })}
                              className="admin-message-preview"
                              title="Click to view full message"
                            >
                              {r.message || '(No message content)'}
                            </div>
                          </td>
                          <td>
                            <select
                              value={r.status || 'new'}
                              onChange={(e) => handleStatusChange(r.id, e.target.value, 'lead')}
                              className="admin-status-select"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedRecord({ ...r, _type: 'lead' })}
                                className="admin-row-btn"
                                title="View details"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleDelete(r.id, 'lead')}
                                className="admin-row-btn delete"
                                title="Delete inquiry"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Inspector Modal */}
      {selectedRecord && (
        <div className="admin-modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Record #{selectedRecord.id}</span>
                  <span className="admin-badge-modal">
                    {selectedRecord._type === 'application'
                      ? 'Job Application'
                      : (selectedRecord.form_type || 'Client Lead')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedRecord.name || selectedRecord.applicant_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="admin-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 font-semibold block uppercase text-[10px]">Email Address</span>
                  <a href={`mailto:${selectedRecord.email || selectedRecord.applicant_email}`} className="text-blue-400 font-medium hover:underline mt-0.5 block">
                    {selectedRecord.email || selectedRecord.applicant_email}
                  </a>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 font-semibold block uppercase text-[10px]">Phone Number</span>
                  <a href={`tel:${selectedRecord.phone || selectedRecord.applicant_phone}`} className="text-slate-200 font-medium hover:underline mt-0.5 block">
                    {selectedRecord.phone || selectedRecord.applicant_phone || 'N/A'}
                  </a>
                </div>

                {selectedRecord.company && (
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 font-semibold block uppercase text-[10px]">Company</span>
                    <span className="text-slate-200 font-medium mt-0.5 block">{selectedRecord.company}</span>
                  </div>
                )}

                {selectedRecord.service && (
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 font-semibold block uppercase text-[10px]">Selected Service</span>
                    <span className="text-slate-200 font-medium mt-0.5 block">{selectedRecord.service}</span>
                  </div>
                )}

                {selectedRecord.budget && (
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 font-semibold block uppercase text-[10px]">Project Budget</span>
                    <span className="text-emerald-400 font-mono font-medium mt-0.5 block">{selectedRecord.budget}</span>
                  </div>
                )}

                {selectedRecord.timeline && (
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 font-semibold block uppercase text-[10px]">Estimated Timeline</span>
                    <span className="text-slate-200 font-medium mt-0.5 block">{selectedRecord.timeline}</span>
                  </div>
                )}

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 col-span-2">
                  <span className="text-slate-500 font-semibold block uppercase text-[10px]">Submission Timestamp</span>
                  <span className="text-slate-300 font-mono mt-0.5 block">
                    {new Date(selectedRecord.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    {selectedRecord.ip_address && ` • Client IP: ${selectedRecord.ip_address}`}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  {selectedRecord._type === 'application' ? 'Cover Note / Remarks' : 'Project Scope & Requirements'}
                </label>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap font-sans">
                  {selectedRecord.message || selectedRecord.cover_note || '(No message text provided)'}
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <a
                href={`mailto:${selectedRecord.email || selectedRecord.applicant_email}?subject=Regarding your inquiry at Creatah`}
                className="admin-modal-primary-btn"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply to Client</span>
              </a>

              <button
                onClick={() => setSelectedRecord(null)}
                className="admin-modal-cancel-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
