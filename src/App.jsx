import Seo from './components/Seo';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Stats from './components/Stats';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import Promise from './components/Promise';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/main.css';

export default function App() {
  return (
    <>
      <Seo />
      <TopBar />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Stats />
        <Reviews />
        <Faq />
        <Promise />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
