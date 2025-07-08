import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import React from 'react'; // <--- THIS IS CRITICAL

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

function AnimatedRoutes(): JSX.Element { // <--- THIS IS CRITICAL
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[40vh] text-lg">Loading...</div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App(): JSX.Element { // <--- THIS IS CRITICAL
  return (
    <>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}

export default App;