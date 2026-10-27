import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  ['/', 'Home', true],
  ['/services/', 'Services'],
  ['/why-us/', 'Why Us'],
  ['/process/', 'Process'],
  ['/faq/', 'FAQ'],
  ['/contact/', 'Contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap header__in">
        <Link className="brand" to="/">
          <img src="/assets/img/logo-mark.png" width="44" height="46" alt="Bharath NRI Property logo" />
          <span className="brand__txt">
            <strong>BHARATH NRI <em>Property</em></strong>
            <small>REGISTRATION &amp; LEGAL</small>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="screen-reader-text">Menu</span><i></i><i></i><i></i>
        </button>
        <nav
          id="primary-nav"
          className={'primary-nav' + (open ? ' is-open' : '')}
          aria-label="Primary"
          onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}
        >
          <ul className="menu">
            {links.map(([to, label, end]) => (
              <li key={to}><NavLink to={to} end={!!end}>{label}</NavLink></li>
            ))}
          </ul>
        </nav>
        <Link className="btn btn--white header__cta" to="/contact/">Talk to an Expert</Link>
      </div>
    </header>
  );
}
