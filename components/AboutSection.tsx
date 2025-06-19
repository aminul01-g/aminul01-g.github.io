import React from 'react';

const AboutSection = () => (
    <section id="about" className="py-16 sm:py-24 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-8">About Me</h2>
        <div className="text-left bg-slate-800/50 p-8 rounded-lg">
            <p className="text-slate-300 mb-4 leading-relaxed">
                Hello! I'm Aminul, an aspiring AI Engineer with a passion for developing intelligent applications that solve real-world problems. My journey into tech was driven by a curiosity for how complex systems work, which naturally led me to the fascinating world of machine learning.
            </p>
            <p className="text-slate-300 leading-relaxed">
                I'm currently focused on deepening my expertise in deep learning frameworks and MLOps practices to build robust, scalable, and maintainable AI systems. My goal is to contribute to open-source projects and collaborate with teams that are pushing the boundaries of what's possible with AI.
            </p>
            <div className="mt-8">
                 <h3 className="text-xl font-bold text-sky-300 mb-4">Core Skills</h3>
                 <div className="flex flex-wrap gap-3 justify-center">
                    {['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LangChain', 'Next.js', 'FastAPI', 'Docker', 'Vercel'].map(skill => (
                         <span key={skill} className="bg-slate-700 text-slate-200 text-sm font-medium px-4 py-2 rounded-lg">{skill}</span>
                    ))}
                 </div>
            </div>
        </div>
    </section>
);
export default AboutSection;