import { CodeIcon } from './icons/CodeIcon';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Contact', href: '/#contact' },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/#home" className="flex items-center">
             <CodeIcon />
            <span className="font-bold text-xl ml-2 text-white">Aminul's Portfolio</span>
          </a>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar; // <-- ADD THIS LINE