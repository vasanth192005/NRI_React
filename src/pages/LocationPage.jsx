import { Link, useParams } from 'react-router-dom';
import Seo, { breadcrumbSchema, faqSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import NotFound from './NotFound';
import { getLocation, servicePages } from '../data/services';
import { SITE } from '../config';

export default function LocationPage({ slug: slugProp }) {
  const params = useParams();
  const l = getLocation(slugProp || params.slug);
  if (!l) return <NotFound />;

  const path = `/locations/${l.slug}/`;
  const crumbs = [{ name: `${l.city} NRI Desk`, path, last: true }];

  return (
    <>
      <Seo
        title={l.metaTitle}
        description={l.metaDesc}
        path={path}
        schema={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: `${l.city} NRI Desk`, path }]),
          {
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: `${SITE.name} — ${l.city}`,
            url: SITE.url + path,
            parentOrganization: { '@id': SITE.url + '/#org' },
            address: { '@type': 'PostalAddress', streetAddress: l.address, addressLocality: l.city, addressCountry: 'IN' },
            areaServed: l.city,
          },
          faqSchema(l.faqs),
        ]}
      />
      <PageHero crumbs={crumbs} title={l.h1} lead={l.lead}>
        <div className="page-hero__btns">
          <Link className="btn btn--navy" to="/contact/">Get a Free Quote →</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap detail">
          <div className="detail__main">
            <h2 className="h2-sm">What our {l.city} desk handles</h2>
            <ul className="checklist">{l.points.map((x) => <li key={x}>{x}</li>)}</ul>

            <h2 className="h2-sm">Our {l.city} office</h2>
            <p className="prose">{l.address}. Most NRI work is completed remotely, so you can reach us by WhatsApp, email or video call from anywhere.</p>

            <h2 className="h2-sm">Frequently asked questions</h2>
            <div className="faq-static">
              {l.faqs.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
          <aside className="detail__side">
            <div className="card side-card">
              <h3>Services in {l.city}</h3>
              <ul>
                {servicePages.map((x) => (
                  <li key={x.slug}><Link to={`/services/${x.slug}/`}>{x.short}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
