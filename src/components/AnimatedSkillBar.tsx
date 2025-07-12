import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
  icon?: React.ReactNode;
}

interface AnimatedSkillBarProps {
  skill: Skill;
  index: number;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({ skill, index }) => {
  const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <motion.div
      ref={elementRef}
      className="mb-6"
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {skill.icon && (
            <div className="w-6 h-6 text-primary">
              {skill.icon}
            </div>
          )}
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <span className="text-gray-300 text-sm">{skill.level}%</span>
      </div>
      
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background: skill.color,
            width: `${skill.level}%`,
          }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full blur-sm"
          style={{
            background: skill.color,
            width: `${skill.level}%`,
            opacity: 0.5,
          }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
        />
      </div>
    </motion.div>
  );
};

interface SkillsSectionProps {
  skills: Skill[];
  title?: string;
  subtitle?: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ 
  skills, 
  title = "Skills & Expertise",
  subtitle = "Leveraging cutting-edge technologies to build innovative solutions"
}) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 32px #a5b4fa55' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Technical Skills</h3>
            {skills.slice(0, Math.ceil(skills.length / 2)).map((skill, index) => (
              <AnimatedSkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 32px #a5b4fa55' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Tools & Platforms</h3>
            {skills.slice(Math.ceil(skills.length / 2)).map((skill, index) => (
              <AnimatedSkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 