import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITE } from '../config';
import { servicePages } from '../data/services';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeMenu = () => { setOpen(false); setServicesOpen(false); };
  const whatsapp = `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}`;

  return (
    <header className="site-header">
      <div className="wrap header__in">
        <Link className="brand" to="/" aria-label="Bharat NRI Property home" onClick={closeMenu}>
          <img src="/assets/img/logo-mark.png" width="48" height="52" alt="" />
          <span className="brand__txt">
            <strong>Bharat NRI Property</strong>
            <small>REGISTRATION SERVICES</small>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <i></i><i></i><i></i>
        </button>
        <nav
          id="primary-nav"
          className={'primary-nav' + (open ? ' is-open' : '')}
          aria-label="Primary"
          onClick={(event) => { if (event.target.closest('a')) closeMenu(); }}
        >
          <ul className="menu">
            <li className={'menu__services' + (servicesOpen ? ' is-open' : '')}>
              <button className="menu__trigger" type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((value) => !value)}>
                Services <span className="menu__chevron" aria-hidden="true"></span>
              </button>
              <ul className="service-menu" aria-label="Services">
                <li><NavLink to="/services/">All services</NavLink></li>
                {servicePages.map((service) => <li key={service.slug}><NavLink to={`/services/${service.slug}/`}>{service.short}</NavLink></li>)}
              </ul>
            </li>
            <li><NavLink to="/process/">How it works</NavLink></li>
            <li><NavLink to="/why-us/">Why us</NavLink></li>
            <li><NavLink to="/faq/">FAQ</NavLink></li>
            <li><NavLink to="/contact/">Contact</NavLink></li>
          </ul>
          <div className="header__actions">
            <a className="header__whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <Link className="header__cta" to="/contact/" onClick={closeMenu}>Free consultation</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
