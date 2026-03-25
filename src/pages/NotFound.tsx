import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-10">
    <h1 className="text-8xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#EC4899] drop-shadow-lg">
      404
    </h1>
    <h2 className="text-2xl font-semibold mb-2 text-white/90">Page Not Found</h2>
    <p className="mb-6 text-lg text-white/50">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
