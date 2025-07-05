import React, { PropsWithChildren } from 'react';
import { useTilt } from './useTilt';

export default function BlogCardTiltWrapper({ children }: PropsWithChildren) {
  const tiltRef = useTilt();
  return (
    <div ref={tiltRef} className="will-change-transform">{children}</div>
  );
}
