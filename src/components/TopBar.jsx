import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar__in">
        <p className="topbar__left">
          <span className="dot dot--green" aria-hidden="true"></span>
          NRI desks in <Link to="/locations/bangalore/">Bengaluru</Link> &amp; <Link to="/locations/chennai/">Chennai</Link>
        </p>
        <p className="topbar__right">
          <span>Reply within 24 hours</span>
          <span>Advocates &amp; Chartered Accountants on our team</span>
        </p>
      </div>
    </div>
  );
}
