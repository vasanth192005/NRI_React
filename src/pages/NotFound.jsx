import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Bharath NRI Property" description="This page could not be found." path="/404/" noindex />
      <section className="section">
        <div className="wrap notfound">
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or has moved.</p>
          <div className="page-hero__btns">
            <Link className="btn btn--navy" to="/">Go to Home</Link>
            <Link className="btn btn--white" to="/services/">View Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
