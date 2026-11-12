import { servicePages, locations } from './data/services.js';

// Every indexable URL. Used by the prerenderer and the sitemap.
export const indexableRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/services/', priority: '0.9', changefreq: 'monthly' },
  ...servicePages.map((s) => ({ path: `/services/${s.slug}/`, priority: '0.9', changefreq: 'monthly' })),
  ...locations.map((l) => ({ path: `/locations/${l.slug}/`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/why-us/', priority: '0.6', changefreq: 'yearly' },
  { path: '/process/', priority: '0.6', changefreq: 'yearly' },
  { path: '/faq/', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.7', changefreq: 'yearly' },
];
