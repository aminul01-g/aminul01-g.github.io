import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
}

export default function SparkleCursor(): React.ReactElement | null {
  const { theme } = useTheme();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Only activate in Liquid Transparent mode
    if (theme !== 'transparent') {
      setSparkles([]);
      return;
    }

    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      
      // Spawn a sparkle if the mouse moved sufficiently to prevent overload
      if (distance > 15) {
        lastX = e.clientX;
        lastY = e.clientY;
        
        const newSparkle: Sparkle = {
          id: Date.now().toString() + Math.random().toString(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4, // 4px to 12px
        };
        
        setSparkles(prev => [...prev.slice(-30), newSparkle]); // Cap at 30
        
        // Remove sparkle after animation (800ms)
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  if (theme !== 'transparent') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 1, x: sparkle.x, y: sparkle.y }}
            animate={{ 
              opacity: 0, 
              scale: 0, 
              x: sparkle.x + (Math.random() - 0.5) * 60, 
              y: sparkle.y + 40 + Math.random() * 40 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full bg-amber-200"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              left: -sparkle.size / 2,
              top: -sparkle.size / 2,
              boxShadow: '0 0 10px 2px rgba(251, 191, 36, 0.8), 0 0 20px 4px rgba(251, 191, 36, 0.4)',
              mixBlendMode: 'multiply'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
