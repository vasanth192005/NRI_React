import Seo, { breadcrumbSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import WhyUs from '../components/WhyUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import Promise from '../components/Promise';
import CtaBand from '../components/CtaBand';

export default function WhyUsPage() {
  return (
    <>
      <Seo
        title="Why Choose Bharath NRI Property | Fixed Fees, Remote Service"
        description="Transparent pricing, fixed professional fees, no unnecessary travel and one dedicated point of contact. See why NRIs trust Bharath NRI Property."
        path="/why-us/"
        schema={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Why Us', path: '/why-us/' }])]}
      />
      <PageHero
        crumbs={[{ name: 'Why Us', path: '/why-us/', last: true }]}
        title="Why NRIs Choose Bharath NRI Property"
        lead="Distance should not make India complicated. We built our service around transparent fees, remote execution and clear communication."
      />
      <WhyUs heading="h2" />
      <Stats />
      <Reviews />
      <Promise />
      <CtaBand />
    </>
  );
}
