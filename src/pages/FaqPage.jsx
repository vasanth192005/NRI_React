import Seo, { breadcrumbSchema, faqSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import Faq from '../components/Faq';
import CtaBand from '../components/CtaBand';
import { faqs } from '../data/content';

export default function FaqPage() {
  return (
    <>
      <Seo
        title="NRI Property & POA FAQs | Bharath NRI Property"
        description="Answers to common NRI questions: Power of Attorney, registration, timelines, representatives, cancellation and professional fees."
        path="/faq/"
        schema={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq/' }]), faqSchema(faqs)]}
      />
      <PageHero
        crumbs={[{ name: 'FAQ', path: '/faq/', last: true }]}
        title="Frequently Asked Questions for NRIs"
        lead="Straight answers on Power of Attorney, property registration, timelines and fees."
      />
      <Faq heading="h2" />
      <CtaBand title="Still have a question?" text="Ask us directly and we will reply within 24 hours." />
    </>
  );
}
