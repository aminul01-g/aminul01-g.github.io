import { GithubIcon } from './icons/GithubIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';

const Footer = () => (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
             <div className="flex justify-center space-x-6 mb-4">
                <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><GithubIcon /></a>
                <a href="https://linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><LinkedinIcon /></a>
             </div>
            <p>&copy; {new Date().getFullYear()} Aminul Islam. All Rights Reserved.</p>
        </div>
    </footer>
);
export default Footer; // <-- ADD THIS LINE