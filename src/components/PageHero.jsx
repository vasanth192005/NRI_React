import { Link } from 'react-router-dom';

export default function PageHero({ crumbs = [], title, lead, children }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.path}>
              <i aria-hidden="true">/</i>
              {c.last ? <span aria-current="page">{c.name}</span> : <Link to={c.path}>{c.name}</Link>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
