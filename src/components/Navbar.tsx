import { Link } from 'react-router-dom';
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

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">Aminul</Link>
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 focus:outline-none">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className={`space-x-4 sm:flex ${menuOpen ? 'block' : 'hidden'} absolute sm:static top-16 left-0 w-full sm:w-auto bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent p-4 sm:p-0 transition-all duration-300 ease-in-out`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 sm:inline dark:text-white text-black font-medium hover:text-primary dark:hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Contact anchor link for smooth scroll */}
          <a
            href="/#contact"
            className="block py-2 sm:inline dark:text-white text-black font-medium hover:text-primary dark:hover:text-primary transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}