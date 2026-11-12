import { useEffect, useRef } from 'react';
import { reviews } from '../data/content';

function ReviewCards({ copy = false }) {
  return reviews.map(({ name, location, featured, quote }) => (
    <figure className={'rev' + (featured ? ' rev--hot' : '')} key={`${copy ? 'copy-' : ''}${name}`}>
      {featured && <span className="rev__flag">MOST POPULAR FOR NRIS</span>}
      <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote>“{quote}”</blockquote>
      <figcaption><strong>{name}</strong><small>{location}</small></figcaption>
    </figure>
  ));
}

export default function Reviews() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const dragRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let previousTime = 0;
    const scroll = (time) => {
      if (previousTime && !pausedRef.current && !reducedMotion.matches) {
        const loopWidth = trackRef.current.scrollWidth / 2;
        if (loopWidth > 0) {
          viewport.scrollLeft += Math.min(time - previousTime, 48) * 0.025;
          if (viewport.scrollLeft >= loopWidth) viewport.scrollLeft -= loopWidth;
        }
      }
      previousTime = time;
      frame = window.requestAnimationFrame(scroll);
    };
    frame = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const startDrag = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const viewport = viewportRef.current;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: viewport.scrollLeft };
    pausedRef.current = true;
    viewport.setPointerCapture(event.pointerId);
  };

  const drag = (event) => {
    const state = dragRef.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const distance = event.clientX - state.startX;
    if (Math.abs(distance) > 4) event.preventDefault();
    viewportRef.current.scrollLeft = state.scrollLeft - distance;
  };

  const endDrag = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current = null;
    pausedRef.current = viewportRef.current.matches(':hover') || viewportRef.current.contains(document.activeElement);
  };

  return (
    <section id="reviews" className="section section--white">
      <div className="wrap">
        <span className="pill pill--gold">TESTIMONIALS</span>
        <h2 className="h-center">Client Experiences</h2>
        <p className="sub-center">Unfiltered reflections from individual property owners and institutional clients.</p>
        <div
          className="rev-viewport"
          ref={viewportRef}
          role="region"
          aria-label="Client reviews. Scroll horizontally to browse."
          tabIndex={0}
          onPointerEnter={() => { pausedRef.current = true; }}
          onPointerLeave={() => { if (!dragRef.current) pausedRef.current = viewportRef.current.contains(document.activeElement); }}
          onFocus={() => { pausedRef.current = true; }}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) pausedRef.current = event.currentTarget.matches(':hover'); }}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="rev-track" ref={trackRef}>
            <div className="rev-group"><ReviewCards /></div>
            <div className="rev-group" aria-hidden="true"><ReviewCards copy /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
