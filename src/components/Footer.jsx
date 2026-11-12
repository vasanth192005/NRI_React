import { Link } from 'react-router-dom';
import { SITE } from '../config';
import { servicePages, locations } from '../data/services';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer__grid">
        <div className="footer__about">
          <Link className="brand" to="/">
            <img src="/assets/img/logo-mark.png" width="40" height="42" alt="" />
            <span className="brand__txt"><strong>BHARATH NRI <em>Property</em></strong></span>
          </Link>
          <p>Trusted NRI legal, documentation &amp; tax support — handled entirely from India, for you. Specialized in remote property registration, cross-border wills, and capital repatriation.</p>
          <a className="chip-btn" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Direct</a>
        </div>
        <div>
          <h3>SERVICES</h3>
          <ul>
            {servicePages.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}/`}>{s.short}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>OFFICES &amp; DESKS</h3>
          <ul className="offices">
            {locations.map((l) => (
              <li key={l.slug}><Link to={`/locations/${l.slug}/`}><strong>{l.city.toUpperCase()}: {l.address.split(',')[0]}</strong></Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>RESOURCES &amp; LEGAL</h3>
          <ul>
            <li><Link to="/faq/">FAQs for NRIs</Link></li>
            <li><Link to="/process/">Our Process</Link></li>
            <li><Link to="/why-us/">Why Choose Us</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer__legal">© {new Date().getFullYear()} NRIProperty Registration. All rights reserved.</div>
    </footer>
  );
}
