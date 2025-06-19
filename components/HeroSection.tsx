import React from 'react';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { FileTextIcon } from './icons/FileTextIcon';

const HeroSection = () => (
    <section id="home" className="text-center py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Aminul Islam
        </h1>
        <p className="mt-4 text-lg md:text-xl text-sky-300">
            AI Engineer in the making, building intelligent systems.
        </p>
        <p className="mt-2 text-md text-slate-400 max-w-2xl mx-auto">
            Currently learning, building, and open-sourcing projects at the intersection of machine learning and software engineering.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-colors">
                <FileTextIcon /> <span className="ml-2">View Resume</span>
            </a>
            <a href="https://github.com/aminul01-g" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors">
                 <GithubIcon /> <span className="ml-2">GitHub</span>
            </a>
             <a href="#" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors">
                 <LinkedinIcon /> <span className="ml-2">LinkedIn</span>
            </a>
        </div>
    </section>
);
export default HeroSection;

