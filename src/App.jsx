
import { Routes, Route, Navigate } from 'react-router-dom';

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

// Admin imports
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import Enquiries from './admin/pages/Enquiries';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';

import './styles/main.css';
import './styles/pages.css';
import './admin/admin.scss';

export default function App() {

  return (
    <Routes>

      {/* PUBLIC WEBSITE ROUTES */}
      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />

        <Route path="services" element={<ServicesIndex />} />

        <Route path="services/:slug" element={<ServicePage />} />

        <Route path="locations/:slug" element={<LocationPage />} />

        <Route path="why-us" element={<WhyUsPage />} />

        <Route path="process" element={<ProcessPage />} />

        <Route path="faq" element={<FaqPage />} />

        <Route path="contact" element={<ContactPage />} />

      </Route>

      {/* ADMIN LOGIN - WITHOUT PUBLIC LAYOUT */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* PROTECTED ADMIN ROUTES */}
      <Route element={<ProtectedRoute />}>

        <Route path="/admin" element={<AdminLayout />}>

          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="enquiries"
            element={<Enquiries />}
          />

        </Route>

      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
