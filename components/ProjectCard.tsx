import Image from 'next/image';
import { GithubIcon } from './icons/GithubIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { Project } from '../data/projects';

const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-slate-800/50 rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-sky-500/20 flex flex-col">
        <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>
            <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                        <span key={tech} className="bg-sky-900/50 text-sky-300 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center mt-6">
                 {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300">
                        Live Demo <ExternalLinkIcon />
                    </a>
                ) : <div/>}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white">
                    <GithubIcon /> <span className="ml-2">Source</span>
                </a>
            </div>
        </div>
    </div>
);
export default ProjectCard; // <-- ADD THIS LINE