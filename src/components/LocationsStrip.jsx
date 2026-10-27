import { Link } from 'react-router-dom';
import { locations } from '../data/services';

export default function LocationsStrip() {
  return (
    <section className="section section--white locs">
      <div className="wrap">
        <span className="pill pill--gold">LOCAL NRI DESKS</span>
        <h2 className="h-center">On-the-ground support in Bengaluru and Chennai</h2>
        <p className="sub-center">Local advocates who know the sub-registrar offices, revenue records and procedures in your city.</p>
        <div className="loc-grid">
          {locations.map((l) => (
            <Link className="card loc" key={l.slug} to={`/locations/${l.slug}/`}>
              <h3>NRI Property Registration in {l.city}</h3>
              <p>{l.address}</p>
              <span className="more">View {l.city} services →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
