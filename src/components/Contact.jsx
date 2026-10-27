import { useState } from 'react';
import Icon from './Icon';
import { SITE } from '../config';
import { serviceOptions } from '../data/content';

const initial = { name: '', email: '', phone: '', country: '', city: '', service: serviceOptions[0], description: '', website: '' };

export default function Contact({ heading = 'h2' }) {
  const H = heading;
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | invalid | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('sent');
        setForm(initial);
      } else {
        setStatus(data.status === 'invalid' ? 'invalid' : 'error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap contact__grid">
        <div className="contact__copy">
          <span className="eyebrow gold">LET'S BEGIN</span>
          <H>Your Time Is Valuable.<br />Let Us Handle India.</H>
          <p>Get a clear quote for your requirement — no obligation, no pressure, and full confidentiality assured under advocate-client privilege.</p>
          <div className="cbtns">
            <a className="cbtn cbtn--wa" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            <a className="cbtn" href={`mailto:${SITE.email}`}><Icon name="mail" size={16} />Email Us</a>
            <a className="cbtn cbtn--full" href={SITE.communityUrl}><span className="dot"></span>Join our NRI Property Updates Community</a>
          </div>
          <ul className="ticks ticks--stack">
            <li>No retainer lock-ins · Milestone-linked professional fees</li>
            <li>Pan-India coverage: Delhi NCR, Bengaluru, Mumbai, Chennai, Punjab, Hyderabad</li>
          </ul>
        </div>
        <div className="formcard">
          <h3>Submit Your <span className="gold">Query</span></h3>
          <p className="formcard__sub">Our expert advocates will review and respond within 24 hours.</p>
          {status === 'sent' && <p className="msg msg--ok" role="status">Thank you — your query has been sent. We will respond within 24 hours.</p>}
          {status === 'invalid' && <p className="msg msg--err" role="alert">Please fill in all required fields with a valid email.</p>}
          {status === 'error' && <p className="msg msg--err" role="alert">Sorry, something went wrong. Please try again or WhatsApp us.</p>}
          <form onSubmit={onSubmit}>
            <p className="hp" aria-hidden="true">
              <label>Website <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
            </p>
            <div className="fgrid">
              <label>NAME *<input type="text" name="name" placeholder="Full name" required value={form.name} onChange={set('name')} /></label>
              <label>EMAIL *<input type="email" name="email" placeholder="your@email.com" required value={form.email} onChange={set('email')} /></label>
              <label>PHONE NUMBER (WITH COUNTRY CODE) *<input type="tel" name="phone" placeholder="+91 9876543210" required value={form.phone} onChange={set('phone')} /></label>
              <label>COUNTRY OF RESIDENCE *<input type="text" name="country" required value={form.country} onChange={set('country')} /></label>
              <label>CITY IN INDIA (PROPERTY / REGISTRY LOCATION)<input type="text" name="city" placeholder="e.g.Bengaluru/Tamilnadu/Mumbai" value={form.city} onChange={set('city')} /></label>
              <label>REQUIRED SERVICE
                <select name="service" value={form.service} onChange={set('service')}>
                  {serviceOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="fgrid__full">DESCRIPTION OF YOUR REQUIREMENT *<textarea name="description" rows={3} placeholder="Brief description of the property, co-owners, current status, or specific questions..." required value={form.description} onChange={set('description')} /></label>
            </div>
            <button className="btn btn--navy btn--block" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Submit Query →'}
            </button>
            <ul className="formcard__trust">
              <li><Icon name="lock" size={13} />Secure &amp; Confidential</li>
              <li><Icon name="bolt" size={13} />24h Response SLA</li>
              <li><Icon name="file" size={13} />Free Document Assessment</li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  );
}
