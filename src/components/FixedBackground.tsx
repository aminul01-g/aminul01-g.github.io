import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

interface Mote {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
}

interface Bokeh {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
}

/** Lightweight depth layer: 52 motes, 8 soft bokeh circles, capped ~30fps. */
function ParticleField({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx || reduce) return;

    let motes: Mote[] = [];
    let bokeh: Bokeh[] = [];
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;
    let streak: { x: number; y: number; life: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = Array.from({ length: 52 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.6,
        speed: Math.random() * 0.14 + 0.04,
        drift: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
      }));
      bokeh = Array.from({ length: 8 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 26 + 12,
        speed: Math.random() * 0.08 + 0.02,
        alpha: Math.random() * 0.05 + 0.02,
      }));
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden || time - last < 33) return;
      last = time;
      ctx.clearRect(0, 0, w, h);

      for (const b of bokeh) {
        b.y -= b.speed;
        if (b.y < -b.r) {
          b.y = h + b.r;
          b.x = Math.random() * w;
        }
        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = dark ? '#a78bfa' : '#6366f1';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = dark ? 'rgba(214,228,255,0.85)' : 'rgba(79,70,130,0.45)';
      for (const m of motes) {
        m.y -= m.speed;
        m.x += m.drift;
        if (m.y < -4) {
          m.y = h + 4;
          m.x = Math.random() * w;
        }
        if (m.x < -4) m.x = w + 4;
        if (m.x > w + 4) m.x = -4;
        const twinkle = 0.55 + 0.45 * Math.sin(time / 850 + m.phase);
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (Math.floor(time / 4600) !== Math.floor((time - 34) / 4600)) {
        streak = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.5, life: 1 };
      }
      if (streak && streak.life > 0) {
        streak.x += 7;
        streak.y += 3.5;
        streak.life -= 0.014;
        const grad = ctx.createLinearGradient(streak.x, streak.y, streak.x - 80, streak.y - 40);
        grad.addColorStop(0, dark ? 'rgba(180,205,255,0.6)' : 'rgba(99,102,241,0.35)');
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = Math.max(0, streak.life);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x - 80, streak.y - 40);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [dark]);

  return <canvas ref={ref} className="bg-particles" aria-hidden="true" />;
}

export default function FixedBackground(): React.ReactElement {
  const { theme } = useTheme();
  const dark = theme !== 'transparent';
  const rootRef = useRef<HTMLDivElement>(null);

  // Pointer spot and scroll parallax, both rAF-throttled and reduced-motion aware.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.3;

    const apply = () => {
      frame = 0;
      root.style.setProperty('--pointer-x', `${pointerX}px`);
      root.style.setProperty('--pointer-y', `${pointerY}px`);
      root.style.setProperty('--scroll-shift', `${-Math.min(window.scrollY, 2000) * 0.035}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      schedule();
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    apply();
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="site-bg" data-mode={theme} aria-hidden="true">
      <div className="aurora-field">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" />
        <div className="aurora-ribbon ribbon-one" />
        <div className="aurora-ribbon ribbon-two" />
      </div>
      <div className="bg-spotlight" />
      <div className="bg-grid" />
      <div className="bg-stars-static" />
      <ParticleField dark={dark} />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  );
}
