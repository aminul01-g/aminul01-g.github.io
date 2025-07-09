import { useRef, useEffect } from 'react';

export function useTilt(
  maxTilt = 15,
  scale = 1.04
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const tiltX = ((y - midY) / midY) * maxTilt;
      const tiltY = ((x - midX) / midX) * maxTilt;
      node.style.transform = `perspective(700px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
    }

    function resetTilt() {
      const node = ref.current;
      if (!node) return;
      node.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    }

    function handleMouseEnter() {
      const node = ref.current;
      if (!node) return;
      node.style.transition = 'transform 0.2s cubic-bezier(.03,.98,.52,.99)';
    }

    function handleTransitionEnd() {
      const node = ref.current;
      if (!node) return;
      node.style.transition = '';
    }

    const node = ref.current;
    if (!node) return;

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', resetTilt);
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      const node = ref.current;
      if (!node) return;
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', resetTilt);
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [maxTilt, scale]);

  return ref;
}

