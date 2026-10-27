import { Link, useParams } from 'react-router-dom';
import Seo, { breadcrumbSchema, faqSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import NotFound from './NotFound';
import { getService } from '../data/services';
import { servicePages } from '../data/services';
import { SITE } from '../config';

export default function ServicePage({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  const s = getService(slug);
  if (!s) return <NotFound />;

  const path = `/services/${s.slug}/`;
  const crumbs = [
    { name: 'Services', path: '/services/' },
    { name: s.short, path, last: true },
  ];
  const related = s.related.map(getService).filter(Boolean);

  return (
    <>
      <Seo
        title={s.metaTitle}
        description={s.metaDesc}
        path={path}
        schema={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs.map(({ name, path }) => ({ name, path }))]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.h1,
            serviceType: s.short,
            description: s.metaDesc,
            url: SITE.url + path,
            areaServed: 'IN',
            provider: { '@type': 'LegalService', '@id': SITE.url + '/#org', name: SITE.name },
          },
          faqSchema(s.faqs),
        ]}
      />
      <PageHero crumbs={crumbs} title={s.h1} lead={s.lead}>
        <div className="page-hero__btns">
          <Link className="btn btn--navy" to="/contact/">Get a Free Quote →</Link>
          <a className="btn btn--white" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap detail">
          <div className="detail__main">
            <h2 className="h2-sm">Who this is for</h2>
            <ul className="checklist">{s.who.map((x) => <li key={x}>{x}</li>)}</ul>

            <h2 className="h2-sm">What we do for you</h2>
            <ul className="checklist">{s.includes.map((x) => <li key={x}>{x}</li>)}</ul>

            <h2 className="h2-sm">Documents you will typically need</h2>
            <ul className="checklist checklist--plain">{s.documents.map((x) => <li key={x}>{x}</li>)}</ul>

            <h2 className="h2-sm">How it works</h2>
            <ol className="steps-list">
              {s.steps.map(([t, d]) => (
                <li key={t}><strong>{t}</strong><span>{d}</span></li>
              ))}
            </ol>

            <p className="callout"><Icon name="info" size={18} /><span>{s.note}</span></p>

            <h2 className="h2-sm">Frequently asked questions</h2>
            <div className="faq-static">
              {s.faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="detail__side">
            <div className="card side-card">
              <h3>Other NRI services</h3>
              <ul>
                {servicePages.filter((x) => x.slug !== s.slug).map((x) => (
                  <li key={x.slug}><Link to={`/services/${x.slug}/`}>{x.short}</Link></li>
                ))}
              </ul>
            </div>
            <div className="card side-card side-card--dark">
              <h3>Need help now?</h3>
              <p>Tell us what you need and we will confirm whether you have to travel.</p>
              <Link className="btn btn--white btn--block" to="/contact/">Contact Us</Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--blue">
          <div className="wrap">
            <h2 className="h2-sm">Related services</h2>
            <div className="rel-grid">
              {related.map((r) => (
                <Link className="card rel" key={r.slug} to={`/services/${r.slug}/`}>
                  <span className="ico-box"><Icon name={r.icon} size={20} /></span>
                  <h3>{r.short}</h3>
                  <span className="more">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
