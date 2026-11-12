import { Link } from 'react-router-dom';
import Icon from './Icon';
import Stats from './Stats';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <span className="pill pill--white"><span className="dot"></span>NRI Legal · Documentation · Tax Support</span>
          <h1>You live abroad.<br />We take care of India.</h1>
          <p className="hero__lead">Trusted NRI Legal, Documentation &amp; Tax Support handled entirely from India, so you don't have to be physically present.</p>
          <div className="hero__btns">
            <Link className="btn btn--navy" to="/contact/">Get a Free Consultation <span className="gold">→</span></Link>
            <Link className="btn btn--white" to="/services/">Explore Services</Link>
          </div>
          <div className="note">
            <Icon name="info" size={18} />
            <p>Where legally permissible, we help you complete the entire process through registered Power of Attorney and digital adjudication without travelling to India.</p>
          </div>
         
        </div>
        <img className="hero__mark" src="/assets/img/hero-mark.png" alt="" width="205" height="225" />
        <aside className="hero__card">
          <div className="hero__photo">
            <span className="pill pill--float"><span className="dot dot--navy"></span>Verified Legal Execution</span>
            <img src="/assets/img/hero-family.jpg" alt="Family outside their home" width="253" height="238" />
            <p>RESIDENTIAL &amp; COMMERCIAL PROPERTIES</p>
          </div>
          <div className="file">
            <div className="file__head">
              <span className="file__ico"><Icon name="file" size={18} /></span>
              <div><strong>Sale Deed — Registration</strong><small>Sub-Registrar · Bangalore</small></div>
              <span className="tag tag--out">Live File #841</span>
            </div>
            <ul>
              <li><span className="d"></span>Document Review &amp; Title Verification<span className="tag">Complete</span></li>
              <li><span className="d"></span>Consulate POA Adjudication<span className="tag">Complete</span></li>
              <li><span className="d d--light"></span>Sub-Registrar Slot &amp; Biometric Filing<span className="tag tag--out">In Progress</span></li>
            </ul>
          </div>
        </aside>
      </div>
      <Stats inHero />
    </section>
  );
}
