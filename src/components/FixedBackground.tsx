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

interface Field {
  color: string;
  alpha: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  phase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  life: number;
}

const FIELD_SEEDS = [
  { x: 0.24, y: 0.26, size: 0.55, speedX: 0.00016, speedY: 0.00011, phase: 0 },
  { x: 0.78, y: 0.2, size: 0.5, speedX: 0.00012, speedY: 0.00017, phase: 1.7 },
  { x: 0.62, y: 0.82, size: 0.58, speedX: 0.00009, speedY: 0.00013, phase: 3.1 },
  { x: 0.1, y: 0.72, size: 0.46, speedX: 0.00014, speedY: 0.00008, phase: 4.6 },
  { x: 0.5, y: 0.5, size: 0.42, speedX: 0.00007, speedY: 0.00015, phase: 2.4 },
];

/**
 * Low-resolution animated mesh: drifting colour fields, a faint constellation
 * network, pointer ripples and occasional light streaks. Upscaled by the
 * browser, so the cost stays low while the motion reads as fluid.
 */
function LivingMesh({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx || reduce) return;

    const palette = dark
      ? ['124,58,237', '56,189,248', '236,72,153', '99,102,241', '16,185,129']
      : ['167,139,250', '125,211,252', '244,114,182', '129,140,248', '110,231,183'];

    const scale = 4;
    let cw = 0;
    let ch = 0;
    let fields: Field[] = [];
    let motes: Mote[] = [];
    let ripples: Ripple[] = [];
    let raf = 0;
    let last = 0;
    let lastRipple = 0;
    let pointer = { x: -999, y: -999 };
    let streak: { x: number; y: number; life: number } | null = null;

    const resize = () => {
      cw = Math.max(1, Math.ceil(window.innerWidth / scale));
      ch = Math.max(1, Math.ceil(window.innerHeight / scale));
      canvas.width = cw;
      canvas.height = ch;
      fields = FIELD_SEEDS.map((seed, index) => ({
        ...seed,
        color: palette[index % palette.length],
        alpha: dark ? 0.5 : 0.34,
      }));
      motes = Array.from({ length: 58 }, () => ({
        x: Math.random() * cw,
        y: Math.random() * ch,
        r: Math.random() * 0.55 + 0.35,
        speed: Math.random() * 0.045 + 0.012,
        drift: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2,
      }));
      ripples = [];
    };

    const onPointer = (event: PointerEvent) => {
      pointer = { x: event.clientX / scale, y: event.clientY / scale };
      const now = performance.now();
      if (now - lastRipple > 150) {
        ripples.push({ x: pointer.x, y: pointer.y, radius: 1, life: 1 });
        lastRipple = now;
      }
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden || time - last < 33) return;
      last = time;
      ctx.clearRect(0, 0, cw, ch);

      // Fluid colour fields.
      ctx.globalCompositeOperation = dark ? 'screen' : 'source-over';
      for (const field of fields) {
        const x = (0.5 + 0.36 * Math.sin(time * field.speedX + field.phase)) * cw;
        const y = (0.5 + 0.32 * Math.cos(time * field.speedY + field.phase)) * ch;
        const radius = field.size * cw * (0.9 + 0.1 * Math.sin(time * 0.00023 + field.phase));
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${field.color},${field.alpha})`);
        gradient.addColorStop(0.55, `rgba(${field.color},${field.alpha * 0.42})`);
        gradient.addColorStop(1, `rgba(${field.color},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cw, ch);
      }

      // Constellation links — faint, only for nearby motes.
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 0.35;
      for (let i = 0; i < motes.length; i++) {
        for (let j = i + 1; j < motes.length; j++) {
          const dx = motes[i].x - motes[j].x;
          const dy = motes[i].y - motes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 46) {
            ctx.strokeStyle = dark
              ? `rgba(190,210,255,${0.13 * (1 - dist / 46)})`
              : `rgba(79,70,130,${0.11 * (1 - dist / 46)})`;
            ctx.beginPath();
            ctx.moveTo(motes[i].x, motes[i].y);
            ctx.lineTo(motes[j].x, motes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = dark ? 'rgba(226,236,255,0.9)' : 'rgba(67,56,120,0.55)';
      for (const mote of motes) {
        mote.y -= mote.speed;
        mote.x += mote.drift;
        if (mote.y < -2) {
          mote.y = ch + 2;
          mote.x = Math.random() * cw;
        }
        if (mote.x < -2) mote.x = cw + 2;
        if (mote.x > cw + 2) mote.x = -2;
        ctx.globalAlpha = 0.45 + 0.55 * Math.sin(time / 850 + mote.phase) ** 2;
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pointer ripples.
      ripples = ripples.filter((ripple) => ripple.life > 0);
      for (const ripple of ripples) {
        ripple.radius += 0.9;
        ripple.life -= 0.016;
        ctx.globalAlpha = Math.max(0, ripple.life) * (dark ? 0.28 : 0.2);
        ctx.strokeStyle = dark ? '#c4b5fd' : '#6366f1';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (Math.floor(time / 4200) !== Math.floor((time - 34) / 4200)) {
        streak = { x: Math.random() * cw * 0.8, y: Math.random() * ch * 0.5, life: 1 };
      }
      if (streak && streak.life > 0) {
        streak.x += 2;
        streak.y += 1;
        streak.life -= 0.014;
        const gradient = ctx.createLinearGradient(streak.x, streak.y, streak.x - 22, streak.y - 11);
        gradient.addColorStop(0, dark ? 'rgba(200,220,255,0.7)' : 'rgba(99,102,241,0.4)');
        gradient.addColorStop(1, 'transparent');
        ctx.globalAlpha = Math.max(0, streak.life);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x - 22, streak.y - 11);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [dark]);

  return <canvas ref={ref} className="bg-mesh" aria-hidden="true" />;
}

export default function FixedBackground(): React.ReactElement {
  const { theme } = useTheme();
  const dark = theme !== 'transparent';
  const rootRef = useRef<HTMLDivElement>(null);

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
      <LivingMesh dark={dark} />
      <div className="bg-grid" />
      <div className="bg-stars-static" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  );
}
