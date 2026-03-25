import React from 'react';

const FloatingActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed bottom-8 right-6 sm:right-8 z-[60] flex flex-col items-center gap-3 pointer-events-none">
    {React.Children.map(children, (child) => (
      <div className="pointer-events-auto">{child}</div>
    ))}
  </div>
);

export default FloatingActions;
