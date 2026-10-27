import Icon from './Icon';
import { services } from '../data/content';

export default function Services() {
  return (
    <section id="services" className="section section--blue">
      <div className="wrap">
        <span className="pill pill--gold">OUR NRI SERVICES</span>
        <h2 className="h-left">Everything India-side, handled with care.</h2>
        <p className="sub-left">One coordinated team of advocates, chartered accountants, and liaison officers for your legal, documentation, and property needs.</p>
        <div className="svc-grid">
          {services.map(([icon, title, text], i) => (
            <article className="card svc" key={i}>
              <span className="ico-box"><Icon name={icon} size={22} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a className="more" href="#contact">Learn more →</a>
            </article>
          ))}
          <article className="card svc svc--dark">
            <span className="ico-box"><Icon name="wallet" size={22} /></span>
            <small className="gold">CHARTERED ACCOUNTANCY DESK</small>
            <h3>NRI Income Tax Returns &amp; 15CA/CB</h3>
            <p>Filing of Indian tax returns, TDS refund on sale of property, lower deduction certificates (Section 197), and foreign remittance certificates.</p>
            <a className="more gold" href="#contact">View Tax &amp; Repatriation Solutions →</a>
          </article>
        </div>
      </div>
    </section>
  );
}
