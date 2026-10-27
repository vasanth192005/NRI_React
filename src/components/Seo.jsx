import { Helmet } from 'react-helmet-async';
import { SITE } from '../config';
import { faqs } from '../data/content';

export default function Seo() {
  const url = SITE.url + '/';
  const image = SITE.url + SITE.ogImage;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      '@id': SITE.url + '/#org',
      name: SITE.name,
      url,
      logo: SITE.url + '/assets/img/logo-mark.png',
      image,
      description: SITE.description,
      email: SITE.email,
      areaServed: 'IN',
      priceRange: '$$',
      address: [
        { '@type': 'PostalAddress', streetAddress: 'Indiranagar 100ft Rd', addressLocality: 'Bengaluru', addressCountry: 'IN' },
        { '@type': 'PostalAddress', streetAddress: 'EC Road, Shivajinagar', addressLocality: 'Chennai', addressCountry: 'IN' },
      ],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', bestRating: '5', reviewCount: '600' },
      sameAs: SITE.communityUrl && SITE.communityUrl !== '#' ? [SITE.communityUrl] : undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];

  return (
    <Helmet>
      <html lang="en" />
      <title>{SITE.title}</title>
      <meta name="description" content={SITE.description} />
      <meta name="keywords" content={SITE.keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content="#0b1f4b" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={SITE.title} />
      <meta property="og:description" content={SITE.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={SITE.title} />
      <meta name="twitter:description" content={SITE.description} />
      <meta name="twitter:image" content={image} />

      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
      ))}
    </Helmet>
  );
}
