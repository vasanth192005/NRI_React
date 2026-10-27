import { useRef } from 'react';
import { steps } from '../data/content';

export default function Process({ heading = 'h2' }) {
  const H = heading;
  const track = useRef(null);
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <section id="process" className="section section--cream process">
      <div className="wrap">
        <div className="process__head">
          <div>
            <span className="eyebrow">STRUCTURED EXECUTION</span>
            <H className="serif">A Clear Process, Start to Finish</H>
            <p>From your initial consultation to registered deed possession in 7 transparent phases.</p>
          </div>
          <div className="arrows">
            <button type="button" className="arrow" aria-label="Previous steps" onClick={() => scroll(-1)}>‹</button>
            <button type="button" className="arrow" aria-label="Next steps" onClick={() => scroll(1)}>›</button>
          </div>
        </div>
      </div>
      <div className="track" tabIndex={0} aria-label="Process steps" ref={track}>
        {steps.map(([title, text], i) => (
          <article className={'step' + (i === steps.length - 1 ? ' step--last' : '')} key={title}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
