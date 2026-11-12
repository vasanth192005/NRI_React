import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServicesIndex from './pages/ServicesIndex';
import ServicePage from './pages/ServicePage';
import LocationPage from './pages/LocationPage';
import WhyUsPage from './pages/WhyUsPage';
import ProcessPage from './pages/ProcessPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import './styles/main.css';
import './styles/pages.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesIndex />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="locations/:slug" element={<LocationPage />} />
        <Route path="why-us" element={<WhyUsPage />} />
        <Route path="process" element={<ProcessPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
