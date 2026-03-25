import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function FluidBackground(): React.ReactElement {
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX / window.innerWidth - 0.5) * 400;
      const yOffset = (clientY / window.innerHeight - 0.5) * 400;

      mouseX.set(xOffset);
      mouseY.set(yOffset);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 min-h-screen w-full overflow-hidden bg-[#0A0A0A] -z-50 pointer-events-none">
      <div className="absolute inset-0 w-full h-full filter blur-[80px] sm:blur-[120px] opacity-70">
        <motion.div
          className="absolute rounded-full mix-blend-screen opacity-60"
          style={{
            background: 'radial-gradient(circle at center, #4F46E5 0%, transparent 70%)',
            width: '600px',
            height: '600px',
            top: '10%',
            left: '10%',
            x: mouseX,
            y: mouseY,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute rounded-full mix-blend-screen opacity-50"
          style={{
            background: 'radial-gradient(circle at center, #7C3AED 0%, transparent 70%)',
            width: '700px',
            height: '700px',
            bottom: '10%',
            right: '-10%',
            x: useSpring(0, { damping: 30, stiffness: 80 }), // different speed
            y: useSpring(0, { damping: 30, stiffness: 80 }),
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute rounded-full mix-blend-screen opacity-50"
          style={{
            background: 'radial-gradient(circle at center, #EC4899 0%, transparent 70%)',
            width: '500px',
            height: '500px',
            top: '40%',
            left: '40%',
            x: mouseX, // Will follow mouse but we'll invert it below
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Grid overlay for texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        }}
      />
    </div>
  );
}
