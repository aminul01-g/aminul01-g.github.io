import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center px-4">
    <h1 className="text-6xl font-bold mb-4 text-gradient bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="mb-6 text-lg text-gray-500 dark:text-gray-400">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="inline-block px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors">Go Home</Link>
  </div>
);

export default NotFound;
