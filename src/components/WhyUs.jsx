import Icon from './Icon';
import { why } from '../data/content';

export default function WhyUs() {
  return (
    <section id="why-us" className="section section--navy">
      <div className="wrap">
        <span className="pill pill--mint">WHY NRI</span>
        <h2 className="h-center light">Because Distance Shouldn't Make India Complicated.</h2>
        <p className="sub-center light">Designed specifically to solve timezone mismatches, bureaucratic friction, and untraceable payments.</p>
        <div className="why-grid">
          {why.map(([icon, title, text]) => (
            <article className="card why" key={title}>
              <span className="ico-box"><Icon name={icon} size={20} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
          <article className="card why why--wide">
            <span className="ico-box"><Icon name="check" size={20} /></span>
            <h3>End-to-End Assistance</h3>
            <p>From first draft to final Sub-Registrar delivery, revenue ledger updates, and original document DHL shipping, we stay with you whole way.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
