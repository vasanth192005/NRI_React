import { SITE } from '../config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer__grid">
        <div className="footer__about">
          <a className="brand" href="/">
            <img src="/assets/img/logo-mark.png" width="40" height="42" alt="" />
            <span className="brand__txt"><strong>BHARATH NRI <em>Property</em></strong></span>
          </a>
          <p>Trusted NRI legal, documentation &amp; tax support — handled entirely from India, for you. Specialized in remote property registration, cross-border wills, and capital repatriation.</p>
          <a className="chip-btn" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Direct</a>
        </div>
        <div>
          <h3>SERVICES</h3>
          <ul>
            <li><a href="#services">Property &amp; Sale Deeds</a></li>
            <li><a href="#services">Power of Attorney (POA)</a></li>
            <li><a href="#services">Wills &amp; Registration</a></li>
            <li><a href="#services">PAN &amp; KYC Updates</a></li>
            <li><a href="#services">15CA / 15CB Repatriation</a></li>
          </ul>
        </div>
        <div>
          <h3>OFFICES &amp; DESKS</h3>
          <ul className="offices">
            <li><strong>BENGALORE: Indiranagar 100ft Rd</strong></li>
            <li><strong>CHENNAI : EC Road, Shivajinagar</strong></li>
          </ul>
        </div>
        <div>
          <h3>RESOURCES &amp; LEGAL</h3>
          <ul>
            <li><a href="#faq">FAQs for NRIs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Professional Service</a></li>
            <li><a href="#">Disclaimer &amp; Scope</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer__legal">© {new Date().getFullYear()} NRIProperty Registration. All rights reserved.</div>
    </footer>
  );
}
