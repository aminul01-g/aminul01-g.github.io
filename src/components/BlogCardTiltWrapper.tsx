import React, { PropsWithChildren } from 'react';
import { useTilt } from './useTilt';

export default function BlogCardTiltWrapper({ children }: PropsWithChildren): React.ReactElement {
  const tiltRef = useTilt();
  return (
    <div ref={tiltRef} className="will-change-transform" data-testid="blog-card">
      {children}
    </div>
  );
}
