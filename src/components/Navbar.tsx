import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  // Contact handled as anchor link
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and ThemeToggle always together */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-primary">Aminul</Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
        <div className="sm:hidden">
          {menuOpen ? (
            <button onClick={() => setMenuOpen(false)} className="p-2 focus:outline-none" aria-label="Close menu">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button onClick={() => setMenuOpen(true)} className="p-2 focus:outline-none" aria-label="Open menu">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
        <div className={`space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 sm:flex ${menuOpen ? 'block' : 'hidden'} absolute sm:static top-16 left-0 w-full sm:w-auto bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent p-4 sm:p-0 transition-all duration-300 ease-in-out z-40`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-3 px-2 rounded-lg sm:inline dark:text-white text-black font-medium hover:text-primary dark:hover:text-primary transition focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Contact anchor link for smooth scroll */}
          <a
            href="/#contact"
            className="block py-3 px-2 rounded-lg sm:inline dark:text-white text-black font-medium hover:text-primary dark:hover:text-primary transition focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={handleContactClick}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}