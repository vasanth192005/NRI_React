import Seo, { breadcrumbSchema, orgSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import Services from '../components/Services';
import LocationsStrip from '../components/LocationsStrip';
import CtaBand from '../components/CtaBand';
import { servicePages } from '../data/services';
import { SITE } from '../config';

export default function ServicesIndex() {
  const crumbs = [{ name: 'Services', path: '/services/', last: true }];
  return (
    <>
      <Seo
        title="NRI Legal, Property & Tax Services in India | Bharath NRI"
        description="All NRI services in one place: property registration, power of attorney, gift deeds, wills, notary and green card documents, and 15CA/15CB tax support."
        path="/services/"
        schema={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: servicePages.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.short,
              url: `${SITE.url}/services/${s.slug}/`,
            })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title="NRI Legal, Property & Tax Services in India"
        lead="Every India-side task an NRI needs, from deeds and Power of Attorney to wills and tax certificates, handled by one coordinated team."
      />
      <Services heading="h2" />
      <LocationsStrip />
      <CtaBand />
    </>
  );
}
