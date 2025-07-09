import React, { useRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className = '', ...props }: ButtonProps) : React.ReactElement {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = btnRef.current;
    if (!button) return;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.className = 'ripple';
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      ref={btnRef}
      className={`btn relative overflow-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${className}`}
      {...props}
      onClick={handleClick}
      tabIndex={props.tabIndex ?? 0}
      aria-pressed={props['aria-pressed']}
    >
      {children}
    </button>
  );
}
