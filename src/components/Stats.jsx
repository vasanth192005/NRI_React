import Icon from './Icon';

export default function Stats() {
  return (
    <section id="experience" className="section section--pad-sm">
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
            <li><Icon name="dollar" size={15} />Fixed &amp; Transparent Charges</li>
            <li><Icon name="video" size={15} />Remote Assistance &amp; Video KYC</li>
            <li><Icon name="headset" size={15} />One Dedicated Point of Contact</li>
            <li><Icon name="trend" size={15} />Structured Weekly Milestones</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
