import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  group: 'language' | 'library' | 'tool' | 'concept';
}

interface Link {
  source: string;
  target: string;
}

const nodes: Node[] = [
  // Core
  { id: 'python', label: 'Python', x: 50, y: 50, group: 'language' },
  { id: 'js', label: 'JavaScript', x: 20, y: 80, group: 'language' },
  { id: 'ts', label: 'TypeScript', x: 35, y: 70, group: 'language' },
  
  // AI/ML
  { id: 'ai', label: 'AI & ML', x: 70, y: 30, group: 'concept' },
  { id: 'pytorch', label: 'PyTorch', x: 80, y: 45, group: 'library' },
  { id: 'tensorflow', label: 'TensorFlow', x: 65, y: 20, group: 'library' },
  { id: 'nlp', label: 'NLP', x: 85, y: 60, group: 'concept' },
  { id: 'llm', label: 'LLMs', x: 90, y: 30, group: 'concept' },
  
  // Data
  { id: 'pandas', label: 'Pandas', x: 60, y: 60, group: 'library' },
  { id: 'sql', label: 'SQL', x: 40, y: 40, group: 'language' },
  
  // Web
  { id: 'react', label: 'React', x: 25, y: 90, group: 'library' },
  { id: 'node', label: 'Node.js', x: 10, y: 70, group: 'tool' },
  
  // Tools
  { id: 'docker', label: 'Docker', x: 30, y: 20, group: 'tool' },
  { id: 'git', label: 'Git', x: 15, y: 40, group: 'tool' },
  { id: 'linux', label: 'Linux', x: 45, y: 10, group: 'tool' },
];

const links: Link[] = [
  { source: 'python', target: 'ai' },
  { source: 'python', target: 'pytorch' },
  { source: 'python', target: 'tensorflow' },
  { source: 'python', target: 'pandas' },
  { source: 'python', target: 'sql' },
  { source: 'ai', target: 'nlp' },
  { source: 'ai', target: 'llm' },
  { source: 'ai', target: 'pytorch' },
  { source: 'nlp', target: 'llm' },
  { source: 'js', target: 'ts' },
  { source: 'ts', target: 'react' },
  { source: 'js', target: 'node' },
  { source: 'js', target: 'react' },
  { source: 'linux', target: 'docker' },
  { source: 'linux', target: 'git' },
  { source: 'python', target: 'linux' },
];

export default function SkillNetwork(): React.ReactElement {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper to check connectivity
  const isConnected = (id1: string, id2: string) => {
    return links.some(
      (l) => (l.source === id1 && l.target === id2) || (l.source === id2 && l.target === id1)
    );
  };

  const getNodeColor = (group: string) => {
    switch (group) {
      case 'language': return '#6366f1'; // Indigo-500
      case 'library': return '#ec4899'; // Pink-500
      case 'tool': return '#eab308'; // Yellow-500
      case 'concept': return '#10b981'; // Emerald-500
      default: return '#9ca3af';
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-sm overflow-hidden select-none">
      <div className="absolute inset-0 flex items-center justify-center text-[var(--theme-text-primary)]/20 font-bold text-9xl pointer-events-none">
        TECH
      </div>
      
      {/* SVG Layer for Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {links.map((link, i) => {
          const start = nodes.find(n => n.id === link.source);
          const end = nodes.find(n => n.id === link.target);
          if (!start || !end) return null;

          const isActive = hoveredNode && (
            hoveredNode === link.source || 
            hoveredNode === link.target
          );
          const isDimmed = hoveredNode && !isActive;

          return (
            <motion.line
              key={i}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="white"
              strokeWidth={isActive ? 2 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isActive ? 0.6 : isDimmed ? 0.05 : 0.2 
              }}
              transition={{ duration: 1 }}
            />
          );
        })}
      </svg>

      {/* Nodes Layer */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isConnectedNode = hoveredNode && isConnected(hoveredNode, node.id);
        const isDimmed = hoveredNode && !isHovered && !isConnectedNode;

        return (
          <motion.div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%` 
            }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1.2 : 1, 
              opacity: isDimmed ? 0.2 : 1 
            }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div 
              className={`relative flex items-center justify-center w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg transition-colors duration-300`}
              style={{ backgroundColor: getNodeColor(node.group) }}
            >
              {/* Pulse effect */}
              {!isDimmed && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                />
              )}
            </div>
            
            {/* Label */}
            <motion.div
              className={`absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs md:text-sm font-semibold px-2 py-1 rounded bg-black/60 text-white backdrop-blur-md pointer-events-none transition-opacity duration-300 ${
                isHovered || isConnectedNode ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {node.label}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Instructions Overlay */}
      <div className="absolute bottom-4 left-4 text-xs text-[var(--theme-text-primary)] text-opacity-70">
        Hover over a node to explore connections.
      </div>
    </div>
  );
}
