/**
 * Admin Service - Client for Authenticated Leads API & Encryption
 * Creatah Software Technologies
 */

const TOKEN_STORAGE_KEY = 'creatah_admin_token';
const USER_STORAGE_KEY = 'creatah_admin_user';

export const getCandidateBaseUrls = () => {
  const configured = import.meta.env?.VITE_API_BASE_URL?.trim().replace(/\/$/, '');
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '::1');

  const rawList = [];

  if (configured) {
    rawList.push(configured);
  }

  // Live production server
  rawList.push('https://api.companyonline.in/api');

  // Only use local fallback candidates when running on localhost
  if (isLocalhost) {
    rawList.push('http://localhost/creatah-api');
    rawList.push('/creatah-api');
    rawList.push('/api');
  }

  const list = rawList.map((item) => {
    let url = item.trim().replace(/\/$/, '');
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      url = `https://${url}`;
    }
    return url;
  });

  return [...new Set(list)];
};

export const getApiBaseUrl = () => {
  const candidates = getCandidateBaseUrls();
  return candidates[0] || 'http://localhost/creatah-api';
};

/**
 * Execute request across candidate base URLs until a non-404 response is received
 */
async function apiFetch(endpointSubpath, options = {}) {
  const candidates = getCandidateBaseUrls();
  const cleanPath = endpointSubpath.replace(/^\//, '');

  let lastResponse = null;
  let lastError = null;

  for (const base of candidates) {
    const url = `${base}/${cleanPath}`;
    try {
      const res = await fetch(url, options);
      if (res.status !== 404 && res.status !== 502 && res.status !== 504) {
        return res;
      }
      lastResponse = res;
    } catch (err) {
      lastError = err;
    }
  }

  if (lastResponse) return lastResponse;
  throw new Error(lastError?.message || 'Could not connect to API server. Ensure Apache & MySQL are running in XAMPP.');
}

/**
 * Safe JSON Response Parser to prevent 'Unexpected end of JSON input'
 */
async function safeJson(response) {
  try {
    const text = await response.text();
    if (!text || !text.trim()) {
      return {
        success: false,
        error: `Empty response from server (HTTP ${response.status}). If running locally, check that Apache/MySQL is active in XAMPP.`,
      };
    }
    try {
      return JSON.parse(text);
    } catch (parseErr) {
      const cleanSnippet = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100);
      return {
        success: false,
        error: `Server returned non-JSON (HTTP ${response.status}): ${cleanSnippet || 'Check server logs.'}`,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Failed to read response from server.',
    };
  }
}

/**
 * Token Storage Helpers (Session-based, cleared when browser closes)
 */
export function getStoredToken() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function getStoredAdminUser() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem(USER_STORAGE_KEY) || 'Admin';
}

export function storeAuth(token, username, remember = false) {
  if (typeof window === 'undefined') return;
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_STORAGE_KEY, token);
  storage.setItem(USER_STORAGE_KEY, username);
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

function extractErrorString(err, fallback = 'An unexpected error occurred.') {
  if (!err) return fallback;
  if (typeof err === 'string') return err;
  if (typeof err.message === 'string') return err.message;
  if (typeof err.error === 'string') return err.error;
  try {
    return JSON.stringify(err);
  } catch (e) {
    return String(err);
  }
}

/**
 * Admin Login via Encrypted Token API
 */
export async function loginAdmin(username, password, remember = false) {
  try {
    const response = await apiFetch('auth.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await safeJson(response);

    if (!response.ok || !data.success) {
      throw new Error(extractErrorString(data.message || data.error, 'Authentication failed. Please check credentials.'));
    }

    storeAuth(data.token, data.admin || username, remember);

    return {
      success: true,
      token: data.token,
      admin: data.admin || username,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorString(error, 'Could not connect to authentication server.'),
    };
  }
}

/**
 * Verify Stored Token Validity
 */
export async function verifyToken(token) {
  if (!token) return false;
  try {
    const response = await apiFetch('auth.php?action=verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const data = await safeJson(response);
    return response.ok && data.success;
  } catch (e) {
    return false;
  }
}

/**
 * Fetch Leads & Metrics with Bearer Token Authorization
 */
export async function fetchAdminLeads(token, tab = 'leads', search = '') {
  const queryParams = new URLSearchParams();
  if (tab) queryParams.set('tab', tab);
  if (search) queryParams.set('q', search);

  try {
    const response = await apiFetch(`leads.php?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (response.status === 401) {
      clearAuth();
      return {
        success: false,
        unauthorized: true,
        error: 'Session expired. Please sign in again.',
      };
    }

    const data = await safeJson(response);
    if (!response.ok || !data.success) {
      throw new Error(extractErrorString(data.message || data.error, 'Failed to fetch admin records.'));
    }

    return {
      success: true,
      stats: data.stats || {},
      records: data.records || [],
      count: data.count || 0,
      admin: data.admin,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorString(error, 'Error communicating with leads API.'),
    };
  }
}

/**
 * Update Status for a Lead or Job Application
 */
export async function updateRecordStatus(token, id, status, type = 'lead') {
  try {
    const response = await apiFetch('leads.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ id, status, type }),
    });

    const data = await safeJson(response);
    return response.ok && data.success;
  } catch (e) {
    return false;
  }
}

/**
 * Delete a Record
 */
export async function deleteRecord(token, id, type = 'lead') {
  try {
    const response = await apiFetch(`leads.php?id=${id}&type=${type}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const data = await safeJson(response);
    return response.ok && data.success;
  } catch (e) {
    return false;
  }
}
