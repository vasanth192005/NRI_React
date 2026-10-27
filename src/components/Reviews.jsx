import { reviews, quote } from '../data/content';

export default function Reviews() {
  return (
    <section id="reviews" className="section section--white">
      <div className="wrap">
        <span className="pill pill--gold">TESTIMONIAL‘S</span>
        <h2 className="h-center">Client Experiences</h2>
        <p className="sub-center">Unfiltered reflections from individual property owners and institutional clients.</p>
        <div className="rev-grid">
          {reviews.map(([name, meta, hot]) => (
            <figure className={'rev' + (hot ? ' rev--hot' : '')} key={name}>
              {hot && <span className="rev__flag">MOST POPULAR FOR NRIS</span>}
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>"{quote}"</blockquote>
              <figcaption><strong>{name}</strong><small>{meta}</small></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
