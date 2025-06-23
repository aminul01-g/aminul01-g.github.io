import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import About from './pages/About';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        {/* 404 fallback */}
        <Route path="*" element={
          <motion.div
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl mb-6 dark:text-gray-200">Oops! The page you are looking for does not exist.</p>
            <a href="/" className="text-blue-500 dark:text-blue-300 underline">Go Home</a>
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;