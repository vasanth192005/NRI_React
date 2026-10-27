import { Link } from 'react-router-dom';
import Icon from './Icon';
import { servicePages } from '../data/services';

export default function Services({ heading = 'h2' }) {
  const H = heading;
  const regular = servicePages.slice(0, -1);
  const tax = servicePages[servicePages.length - 1];
  return (
    <section id="services" className="section section--blue">
      <div className="wrap">
        <span className="pill pill--gold">OUR NRI SERVICES</span>
        <H className="h-left">Everything India-side, handled with care.</H>
        <p className="sub-left">One coordinated team of advocates, chartered accountants, and liaison officers for your legal, documentation, and property needs.</p>
        <div className="svc-grid">
          {regular.map((s) => (
            <article className="card svc" key={s.slug}>
              <span className="ico-box"><Icon name={s.icon} size={22} /></span>
              <h3>{s.short}</h3>
              <p>{s.cardText}</p>
              <Link className="more" to={`/services/${s.slug}/`}>Learn more →</Link>
            </article>
          ))}
          <article className="card svc svc--dark">
            <span className="ico-box"><Icon name={tax.icon} size={22} /></span>
            <small className="gold">CHARTERED ACCOUNTANCY DESK</small>
            <h3>{tax.short}</h3>
            <p>{tax.cardText}</p>
            <Link className="more gold" to={`/services/${tax.slug}/`}>View Tax &amp; Repatriation Solutions →</Link>
          </article>
        </div>
      </div>
    </section>
  );
}
