import React, { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  layers?: Array<{
    className: string;
    speed: number;
    style?: React.CSSProperties;
  }>;
}

export default function ParallaxBackground({
  children,
  className = '',
  layers = [],
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      layers.forEach((layer, i) => {
        const el = containerRef.current?.querySelectorAll('.parallax-layer')[i] as HTMLElement;
        if (el) {
          el.style.transform = `translateY(${scrollY * layer.speed}px)`;
        }
      });
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layers]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className={`parallax-layer absolute inset-0 pointer-events-none ${layer.className}`}
          style={{ ...layer.style, zIndex: i + 1 }}
          aria-hidden
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
