import { Link } from 'react-router-dom';
import { SITE } from '../config';

export default function CtaBand({ title = 'Talk to an NRI expert about your case', text = 'Get a clear, itemised quote with no obligation. We reply within 24 hours.' }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band__in">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band__btns">
          <Link className="btn btn--white" to="/contact/">Get a Free Consultation</Link>
          <a className="btn btn--gold" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        </div>
      </div>
    </section>
  );
}
