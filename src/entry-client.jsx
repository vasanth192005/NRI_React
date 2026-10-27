import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

const root = document.getElementById('root');
// Prerendered HTML present -> hydrate; otherwise (dev) -> render
if (root.hasChildNodes()) hydrateRoot(root, tree);
else createRoot(root).render(tree);
