import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from '@sentry/react';

// Initialize Sentry (replace the dsn with your real one to enable)
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN || '', // Set your DSN in .env
  integrations: [browserTracingIntegration()],
  tracesSampleRate: 0.2, // Adjust for performance monitoring
  environment: process.env.NODE_ENV,
  enabled: Boolean(process.env.REACT_APP_SENTRY_DSN), // Only enable if DSN is set
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>,
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
