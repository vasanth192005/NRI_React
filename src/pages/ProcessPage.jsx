import Seo, { breadcrumbSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import Process from '../components/Process';
import CtaBand from '../components/CtaBand';

export default function ProcessPage() {
  return (
    <>
      <Seo
        title="Our NRI Property Process: From Enquiry to Delivery | Bharath NRI"
        description="See how our NRI service works step by step: free review, clear quote, drafting, attestation, India-side filing and courier of registered documents."
        path="/process/"
        schema={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Process', path: '/process/' }])]}
      />
      <PageHero
        crumbs={[{ name: 'Process', path: '/process/', last: true }]}
        title="How Our NRI Property & Legal Process Works"
        lead="A clear sequence from your first message to registered documents in your hands, with updates at every stage."
      />
      <Process heading="h2" />
      <CtaBand />
    </>
  );
}
