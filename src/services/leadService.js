/**
 * Lead & Form Ingestion Service
 * Connects frontend forms to the PHP/MySQL backend API.
 */

export const getCandidateBaseUrls = () => {
  const configured = import.meta.env?.VITE_API_BASE_URL?.trim().replace(/\/$/, '');
  const list = [];
  
  if (configured) {
    let url = configured;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    list.push(url);
  }

  // Local candidates (direct Apache & Vite dev proxy)
  list.push('api.companyonline.in/api');
  list.push('/creatah-api');
  list.push('/api');

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
 * Safe JSON Response Parser
 */
async function safeJson(response) {
  try {
    const text = await response.text();
    if (!text || !text.trim()) {
      return {
        success: false,
        error: `Empty response from server (HTTP ${response.status}). If testing locally, ensure Apache and MySQL are running in XAMPP.`,
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
 * Submit Contact / Lead / Proposal / Estimate inquiry
 */
export async function submitLead(data) {
  try {
    const response = await apiFetch('contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await safeJson(response);

    if (!response.ok || !result.success) {
      throw new Error(result.error || result.message || 'Failed to submit inquiry');
    }

    return {
      success: true,
      message: result.message || 'Inquiry submitted successfully!',
      leadId: result.lead_id,
    };
  } catch (error) {
    console.warn('[API] Inquiry submission failed:', error.message);
    return {
      success: false,
      error: error.message || 'Could not connect to database API server.',
    };
  }
}

/**
 * Submit Job Application from Careers page
 */
export async function submitApplication(data) {
  try {
    const response = await apiFetch('careers.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await safeJson(response);

    if (!response.ok || !result.success) {
      throw new Error(result.error || result.message || 'Failed to submit application');
    }

    return {
      success: true,
      message: result.message || 'Application submitted successfully!',
      applicationId: result.application_id,
    };
  } catch (error) {
    console.warn('[API] Application submission failed:', error.message);
    return {
      success: false,
      error: error.message || 'Could not connect to database API server.',
    };
  }
}
