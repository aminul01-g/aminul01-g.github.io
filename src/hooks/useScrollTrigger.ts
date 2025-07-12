import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

// Allowed offset patterns for Framer Motion useScroll
export type OffsetPattern =
  | 'start end'
  | 'end start'
  | 'start start'
  | 'end end'
  | `${number} ${number}`
  | `${number} start`
  | `${number} end`
  | `${number} center`
  | `${number} ${number}px`
  | `${number} ${number}vw`
  | `${number} ${number}vh`
  | `${number} ${number}%`
  | `start ${number}`
  | `end ${number}`
  | `center ${number}`;

interface UseScrollTriggerOptions {
  threshold?: number;
  offset?: [OffsetPattern, OffsetPattern];
}

interface UseScrollTriggerReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
}

export default function useScrollTrigger(
  options: UseScrollTriggerOptions = {}
): UseScrollTriggerReturn {
  const { threshold = 0.1, offset = ['start end', 'end start'] } = options;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const opacity = useTransform(scrollYProgress, [0, threshold], [0, 1]);
  const y = useTransform(scrollYProgress, [0, threshold], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, threshold], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, threshold], [5, 0]);

  return {
    ref,
    opacity,
    y,
    scale,
    rotate,
  };
}
