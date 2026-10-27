import { Helmet } from 'react-helmet-async';
import { SITE } from '../config';

const abs = (p) => SITE.url + p;

export const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': SITE.url + '/#org',
  name: SITE.name,
  url: abs('/'),
  logo: abs('/assets/img/logo-mark.png'),
  image: abs(SITE.ogImage),
  description: SITE.description,
  email: SITE.email,
  areaServed: 'IN',
  priceRange: '$$',
  address: [
    { '@type': 'PostalAddress', streetAddress: 'Indiranagar 100ft Rd', addressLocality: 'Bengaluru', addressCountry: 'IN' },
    { '@type': 'PostalAddress', streetAddress: 'EC Road, Shivajinagar', addressLocality: 'Chennai', addressCountry: 'IN' },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', bestRating: '5', reviewCount: '600' },
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

/**
 * Per-page SEO. `path` must start and end with "/" (e.g. "/services/").
 * `schema` is an array of extra JSON-LD objects.
 */
export default function Seo({ title, description, path = '/', schema = [], noindex = false, image = SITE.ogImage }) {
  const url = abs(path);
  const img = abs(image);
  const fullTitle = title || SITE.title;
  const desc = description || SITE.description;

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta name="theme-color" content="#0c2748" />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {schema.map((d, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
      ))}
    </Helmet>
  );
}
