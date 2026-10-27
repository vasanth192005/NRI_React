import Seo, { orgSchema } from '../components/Seo';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import Faq from '../components/Faq';
import Promise from '../components/Promise';
import LocationsStrip from '../components/LocationsStrip';
import Contact from '../components/Contact';
import { SITE } from '../config';

export default function Home() {
  return (
    <>
      <Seo
        title={SITE.title}
        description={SITE.description}
        path="/"
        schema={[orgSchema(), { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url + '/' }]}
      />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Stats />
      <Reviews />
      <LocationsStrip />
      <Faq />
      <Promise />
      <Contact />
    </>
  );
}
