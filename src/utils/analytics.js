export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Reusable core function to fire GA4 events safely
export const trackEvent = (eventName, eventParameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, eventParameters);
    
    // For local testing/debugging when in dev mode
    if (import.meta.env.DEV) {
      console.log(`[GA4] Event Fired: ${eventName}`, eventParameters);
    }
  }
};

// Standard event trackers based on requirements
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

export const trackButtonClick = (category, label, additionalParams = {}) => {
  trackEvent('button_click', {
    event_category: category,
    event_label: label,
    ...additionalParams
  });
};

export const trackSocialClick = (platform) => {
  trackEvent('social_click', {
    event_category: 'outbound_links',
    event_label: `${platform} Profile`
  });
};

export const trackProjectClick = (action, projectName) => {
  trackEvent('project_action', {
    event_category: 'projects',
    event_label: `${action}: ${projectName}`
  });
};

export const trackContactInitiate = (method) => {
  trackEvent('contact_initiate', {
    event_category: 'contact',
    event_label: method
  });
};
