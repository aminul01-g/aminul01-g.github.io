import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function FixedBackground(): React.ReactElement {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div 
      className="fixed inset-0 min-h-screen w-full overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ 
        zIndex: -10,
        backgroundColor: isDark ? '#0A0A0A' : '#fafafa'
      }}
    >
      <AnimatePresence>
        {isDark ? (
          <motion.div
            key="dark-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
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
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <motion.div
              className="absolute bottom-20 right-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] mix-blend-screen"
              animate={{
                x: [0, -60, 30, 0],
                y: [0, -50, 50, 0],
                scale: [1.2, 1, 1.3, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: ['-50%', '-40%', '-60%', '-50%'],
                y: ['-50%', '-60%', '-40%', '-50%'],
                scale: [0.8, 1.1, 0.9, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="light-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Lavender Pearl Blob */}
            <motion.div
              className="absolute top-[-5%] left-[-5%] w-[65%] h-[65%] rounded-full bg-violet-300 opacity-80 blur-[100px]"
              animate={{
                x: [0, 60, -30, 0],
                y: [0, 40, -40, 0],
                scale: [1, 1.15, 0.9, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Soft Mint Blob */}
            <motion.div
              className="absolute bottom-[5%] right-[-5%] w-[55%] h-[55%] rounded-full bg-emerald-300 opacity-70 blur-[100px]"
              animate={{
                x: [0, -50, 25, 0],
                y: [0, -30, 50, 0],
                scale: [1.1, 0.95, 1.2, 1.1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Sky Blue Blob */}
            <motion.div
              className="absolute top-1/3 left-1/3 w-[50%] h-[50%] rounded-full bg-sky-300 opacity-75 blur-[100px]"
              animate={{
                x: [0, 40, -40, 0],
                y: [0, -50, 30, 0],
                scale: [0.9, 1.1, 0.95, 0.9],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Grainy Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
