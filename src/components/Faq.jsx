import { useState } from 'react';
import Icon from './Icon';
import { faqs } from '../data/content';

export default function Faq({ heading = 'h2' }) {
  const H = heading;
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="section section--cream faq">
      <div className="wrap faq__in">
        <span className="eyebrow">LEGAL CLARITY</span>
        <H className="serif">Frequently Asked Questions</H>
        <div className="faq__list">
          {faqs.map(([q, a], i) => (
            <div className="qa" key={q}>
              <button
                type="button"
                className="qa__q"
                aria-expanded={open === i}
                aria-controls={`qa-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {q}<Icon name="chevron" size={18} />
              </button>
              <div className="qa__a" id={`qa-${i}`} hidden={open !== i}><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
