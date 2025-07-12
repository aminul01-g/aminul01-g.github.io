import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { AnimatePresence } from 'framer-motion';
import React, { Suspense, lazy } from 'react';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import AccessibilityMenu from './components/AccessibilityMenu';
import AddToHomeScreenPrompt from './components/AddToHomeScreenPrompt';
import BackToTopButton from './components/BackToTopButton';
import NewsletterModal from './components/NewsletterModal';
import { ToastProvider, useToast } from './components/ToastContext';
import FloatingActions from './components/FloatingActions';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Post = lazy(() => import('./pages/Post'));

function AnimatedRoutes(): React.ReactElement {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[40vh] text-lg" role="status" aria-live="polite">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/about" element={<About />} />
          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App(): React.ReactElement {
  const { showToast } = useToast();
  React.useEffect(() => {
    const handleOffline = () => showToast('You are offline. Some features may not work.', 'warning');
    const handleOnline = () => showToast('You are back online!', 'success');
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [showToast]);
  return (
    <ToastProvider>
      <AccessibilityProvider>
        <>
          {/* Skip to content link for accessibility - must be first focusable element */}
          <a
            href="#main-content"
            className="skip-link"
            tabIndex={0}
          >
            Skip to main content
          </a>
          
          <ScrollProgress />
          <Navbar />
          
          {/* Main content area should have id="main-content" */}
          <div id="main-content" tabIndex={-1} className="outline-none">
            <AnimatedRoutes />
          </div>
          
          <FloatingActions>
            <BackToTopButton />
            {/* Contact button removed as per user request */}
          </FloatingActions>
          <Footer />
          <AddToHomeScreenPrompt />
          <AccessibilityMenu />
          <NewsletterModal />
        </>
      </AccessibilityProvider>
    </ToastProvider>
  );
}

export default App;
