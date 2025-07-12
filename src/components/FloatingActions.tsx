import React from 'react';

const FloatingActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
    {React.Children.map(children, child => (
      <div className="pointer-events-auto">{child}</div>
    ))}
  </div>
);

export default FloatingActions; 