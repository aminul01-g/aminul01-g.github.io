import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => (
    <section className="py-16 sm:py-24">
         <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projectsData.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
    </section>
);
export default ProjectsSection; // <-- ADD THIS LINE
