import React from 'react';
import { motion } from 'framer-motion';

export default function FixedBackground(): React.ReactElement {
  return (
    <div className="fixed inset-0 min-h-screen w-full overflow-hidden bg-[#0A0A0A]" style={{ zIndex: -10 }}>
      {/* The exact gradient mesh from the Home page */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      {/* Glowing Floating Orbs matching the Home page Hero */}
      <motion.div
        className="absolute top-10 left-[10%] w-72 h-72 bg-primary/30 rounded-full blur-[80px] mix-blend-screen"
        animate={{
          x: [0, 50, -20, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] mix-blend-screen"
        animate={{
          x: [0, -60, 30, 0],
          y: [0, -50, 50, 0],
          scale: [1.2, 1, 1.3, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: ['-50%', '-40%', '-60%', '-50%'],
          y: ['-50%', '-60%', '-40%', '-50%'],
          scale: [0.8, 1.1, 0.9, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
