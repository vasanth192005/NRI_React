import Icon from './Icon';
import { Link } from 'react-router-dom';

export default function Stats({ inHero = false }) {
  const Wrapper = inHero ? 'div' : 'section';
  return (
    <Wrapper id="experience" className={inHero ? 'hero__stats' : 'section section--pad-sm'}>
      <div className="wrap">
        <div className="stats">
          <div className="stats__row">
            <div><b>600+</b><span>NRI PROPERTY SERVED</span></div>
            <div><b className="gold">20+ Years</b><span>PROPERTY &amp; CIVIL LAW PRACTICE</span></div>
            <div><b>1719</b><span>VISITORS COUNT</span></div>
            <div><b className="gold">99.2%</b><span>TIMELY REMOTE EXECUTION</span></div>
            <div><b>4.5 <i className="gold">★</i></b><span>RATINGS</span></div>
          </div>
          <ul className="stats__pills">
            <li><Link to="/contact/"><Icon name="dollar" size={15} />Fixed &amp; Transparent Charges</Link></li>
            <li><Link to="/services/"><Icon name="video" size={15} />Remote Assistance &amp; Video KYC</Link></li>
            <li><Link to="/contact/"><Icon name="headset" size={15} />One Dedicated Point of Contact</Link></li>
            <li><Link to="/process/"><Icon name="trend" size={15} />Structured Weekly Milestones</Link></li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}
