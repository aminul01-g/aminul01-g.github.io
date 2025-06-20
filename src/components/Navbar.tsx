import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Aminul - AI Engineer</Link>
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
        <Link to="/skills" className="hover:underline">Skills</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/blog" className="hover:underline">Blog</Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 p-1 px-2 border rounded"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}