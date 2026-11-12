import Seo, { breadcrumbSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Bharath NRI Property | Free NRI Consultation"
        description="Get a free consultation and clear quote for your NRI property, POA, will or tax requirement. WhatsApp, email or send a query. Reply within 24 hours."
        path="/contact/"
        schema={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }]),
          { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Bharath NRI Property', url: 'https://nripropertyregistration.com/contact/' },
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Contact', path: '/contact/', last: true }]}
        title="Contact Our NRI Desk"
        lead="Tell us what you need. We confirm what is required, whether you must travel, and send a clear quote."
      />
      <Contact heading="h2" />
    </>
  );
}
