import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
  { cmd: 'analyze_portfolio.py', output: 'Optimizing UX for maximum engagement...' },
  { cmd: 'train_model.sh', output: 'Training neural network on engineering excellence...' },
  { cmd: 'deploy_app.ts', output: 'Deploying high-performance web application...' },
  { cmd: 'run_diagnostics.exe', output: 'System status: 100% Operational.' },
];

export default function TerminalOverlay(): React.ReactElement {
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [stage, setStage] = useState<'typing_cmd' | 'output' | 'waiting'>('typing_cmd');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentCommand = commands[currentCmdIndex];
    if (stage === 'typing_cmd') {
      if (displayedText.length < currentCommand.cmd.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentCommand.cmd.slice(0, displayedText.length + 1));
        }, 80 + Math.random() * 50); // Random typing speed
      } else {
        timeout = setTimeout(() => setStage('output'), 400);
      }
    } else if (stage === 'output') {
      timeout = setTimeout(() => {
        setStage('waiting');
      }, 2000);
    } else if (stage === 'waiting') {
      timeout = setTimeout(() => {
        setCurrentCmdIndex((prev) => (prev + 1) % commands.length);
        setDisplayedText('');
        setStage('typing_cmd');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, stage, currentCmdIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="hidden lg:block absolute top-[20%] right-[10%] w-80 bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700 shadow-2xl overflow-hidden font-mono text-xs z-0"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-3 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center text-[var(--theme-text-primary)] text-opacity-70 text-[10px]">ai_engineer_terminal</div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-32 text-[var(--theme-text-primary)] text-opacity-80 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCmdIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            className="space-y-2"
          >
            <div className="flex gap-2">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-100">{displayedText}</span>
              {stage === 'typing_cmd' && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-1.5 h-3 bg-gray-400 inline-block align-middle ml-1"
                />
              )}
            </div>
            {stage !== 'typing_cmd' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[var(--theme-text-primary)] text-opacity-70 pl-4 border-l-2 border-gray-700 ml-1"
              >
                {commands[currentCmdIndex].output}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
