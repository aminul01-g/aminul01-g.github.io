import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
}

/** A deliberately light starfield: 36 dots, capped at ~30fps, paused when hidden. */
function StarField({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx || reduce) return;

    let stars: Star[] = [];
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
      stars = Array.from({ length: 36 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.7,
        speed: Math.random() * 0.12 + 0.03,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden || time - last < 33) return;
      last = time;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = dark ? 'rgba(200,215,255,0.8)' : 'rgba(70,60,130,0.4)';
      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < -4) {
          s.y = h + 4;
          s.x = Math.random() * w;
        }
        const twinkle = 0.6 + 0.4 * Math.sin(time / 900 + s.phase);
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // An occasional slow streak makes the motion readable without noise.
      if (Math.floor(time / 5200) !== Math.floor((time - 34) / 5200)) {
        streak = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.5, life: 1 };
      }
      if (streak && streak.life > 0) {
        streak.x += 6;
        streak.y += 3;
        streak.life -= 0.012;
        const grad = ctx.createLinearGradient(streak.x, streak.y, streak.x - 70, streak.y - 35);
        grad.addColorStop(0, dark ? 'rgba(160,190,255,0.55)' : 'rgba(90,70,160,0.3)');
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = Math.max(0, streak.life);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x - 70, streak.y - 35);
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

  return <canvas ref={ref} className="bg-stars" aria-hidden="true" />;
}

export default function FixedBackground(): React.ReactElement {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div className="site-bg" data-mode={theme} aria-hidden="true">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="bg-grid" />
      <div className="bg-stars-static" />
      <StarField dark={dark} />
      <div className="bg-grain" />
    </div>
  );
}
