/**
 * Centralized Environment Configuration
 * Provides safe access to Vite environment variables with production fallbacks.
 */

const getEnv = (key, fallback = '') => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key] !== undefined) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined) {
    return process.env[key];
  }
  return fallback;
};

export const ENV = {
  APP_ENV: getEnv('VITE_APP_ENV', 'development'),
  IS_PROD: getEnv('VITE_APP_ENV') === 'production' || (typeof import.meta !== 'undefined' && import.meta.env?.PROD),
  IS_DEV: getEnv('VITE_APP_ENV') !== 'production' || (typeof import.meta !== 'undefined' && import.meta.env?.DEV),
  
  SITE_URL: getEnv('VITE_SITE_URL', 'https://www.creatah.com'),
  API_BASE_URL: getEnv('VITE_API_BASE_URL', ''),
  
  COMPANY: {
    NAME: getEnv('VITE_COMPANY_NAME', 'Creatah Software Technologies'),
    EMAIL: getEnv('VITE_COMPANY_EMAIL', 'info@creatah.com'),
    PHONE: getEnv('VITE_COMPANY_PHONE', '+918838229241'),
    PHONE_DISPLAY: getEnv('VITE_COMPANY_PHONE_DISPLAY', '+91 88 3822 9241'),
    WHATSAPP: getEnv('VITE_COMPANY_WHATSAPP', '918838229241'),
    ADDRESS: getEnv('VITE_COMPANY_ADDRESS', 'Chennai, Tamil Nadu, India'),
  },

  SOCIAL: {
    LINKEDIN: getEnv('VITE_SOCIAL_LINKEDIN', 'https://in.linkedin.com/company/creatah'),
    FACEBOOK: getEnv('VITE_SOCIAL_FACEBOOK', 'https://www.facebook.com/creatah.in/'),
    INSTAGRAM: getEnv('VITE_SOCIAL_INSTAGRAM', 'https://www.instagram.com/creatahsoftware/'),
    YOUTUBE: getEnv('VITE_SOCIAL_YOUTUBE', 'https://www.youtube.com/channel/UCs7LmMraebi9fV8OTpPAujg'),
  },

  ANALYTICS: {
    GA_ID: getEnv('VITE_GOOGLE_ANALYTICS_ID', ''),
    GTM_ID: getEnv('VITE_GOOGLE_TAG_MANAGER_ID', ''),
  }
};

export default ENV;
