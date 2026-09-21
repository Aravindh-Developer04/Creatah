/**
 * Lead & Form Ingestion Service
 * Connects frontend forms to the PHP/MySQL backend API.
 */

const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_BASE_URL;
  if (url) {
    url = url.trim().replace(/\/$/, '');
    // Ensure protocol is present so browser treats it as absolute URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    return url;
  }
  // Default to local XAMPP Apache in development, relative in production
  return import.meta.env.DEV ? 'http://localhost/creatah-api' : '/api';
};

/**
 * Submit Contact / Lead / Proposal / Estimate inquiry
 */
export async function submitLead(data) {
  const baseUrl = getApiBaseUrl();
  let endpoint = `${baseUrl}/contact`;

  try {
    let response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Fallback: If server hasn't enabled rewrite rules and returns 404, try /contact.php
    if (response.status === 404) {
      const altResponse = await fetch(`${baseUrl}/contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (altResponse.ok) {
        response = altResponse;
      }
    }

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || result.message || 'Failed to submit inquiry');
    }

    return {
      success: true,
      message: result.message || 'Inquiry submitted successfully!',
      leadId: result.lead_id,
    };
  } catch (error) {
    console.warn(`[API] Endpoint (${endpoint}) unreachable or error:`, error.message);
    // Return gracefully with error details
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
  const baseUrl = getApiBaseUrl();
  let endpoint = `${baseUrl}/careers`;

  try {
    let response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Fallback: If server hasn't enabled rewrite rules and returns 404, try /careers.php
    if (response.status === 404) {
      const altResponse = await fetch(`${baseUrl}/careers.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (altResponse.ok) {
        response = altResponse;
      }
    }

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || result.message || 'Failed to submit application');
    }

    return {
      success: true,
      message: result.message || 'Application submitted successfully!',
      applicationId: result.application_id,
    };
  } catch (error) {
    console.warn(`[API] Endpoint (${endpoint}) unreachable or error:`, error.message);
    return {
      success: false,
      error: error.message || 'Could not connect to database API server.',
    };
  }
}
