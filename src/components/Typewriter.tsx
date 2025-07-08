import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  speed?: number;
  pause?: number;
  className?: string;
}

export default function Typewriter({
  words,
  speed = 80,
  pause = 1200,
  className = '',
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = words[index % words.length];
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), speed / 2);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words, speed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span className="blinking-cursor">|</span>
    </span>
  );
}
