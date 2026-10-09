export const CONSENT_VERSION = 1

export const consentCategories = [
  { id: 'necessary', label: 'Strictly necessary', required: true, description: 'Storage required to remember your cookie choices.' },
  { id: 'analytics', label: 'Analytics', required: false, description: 'Anonymous usage statistics to improve the site. Off unless you accept.' },
]

export const consentItems = [
  {
    name: 'portfolio-cookie-consent',
    type: 'First-party local storage',
    purpose: 'Stores your cookie consent choices.',
    category: 'Strictly necessary',
    duration: 'Until deleted or 12 months',
  },
]