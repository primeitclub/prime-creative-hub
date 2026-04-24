'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  phi: number;
  theta: number;
  size: number;
  baseOpacity: number;
  speed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    function init() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    init();

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;

    // Fibonacci sphere distribution for even particle spread
    const N = 220;
    const particles: Particle[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const phi = Math.acos(y);
      const theta = golden * i;
      particles.push({
        phi,
        theta,
        size: Math.random() * 2.2 + 0.8,
        baseOpacity: Math.random() * 0.5 + 0.3,
        speed: 0.0008 + Math.random() * 0.0012,
      });
    }

    // Add outer ring particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        phi: Math.PI / 2 + (Math.random() - 0.5) * 0.4,
        theta: (i / 60) * Math.PI * 2,
        size: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.4 + 0.2,
        speed: 0.0005,
      });
    }

    let rotation = 0;
    let time = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);
      rotation += 0.004;
      time += 0.01;

      const rendered = particles.map((p) => {
        const theta = p.theta + rotation * (0.5 + Math.cos(p.phi) * 0.5);
        const x3d = Math.sin(p.phi) * Math.cos(theta);
        const y3d = Math.cos(p.phi);
        const z3d = Math.sin(p.phi) * Math.sin(theta);

        const perspective = 2.2;
        const scale = perspective / (perspective - z3d * 0.6);
        const depth = (z3d + 1) / 2; // 0..1, 1 = front

        return {
          sx: cx + x3d * R * scale,
          sy: cy - y3d * R * scale,
          z: z3d,
          size: p.size * scale,
          opacity: p.baseOpacity * (0.3 + depth * 0.7),
        };
      });

      // Sort back-to-front
      rendered.sort((a, b) => a.z - b.z);

      rendered.forEach(({ sx, sy, size, opacity }) => {
        // Subtle pulse
        const pulse = 1 + Math.sin(time * 1.5) * 0.08;

        ctx.beginPath();
        ctx.arc(sx, sy, size * pulse, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * pulse * 2);
        gradient.addColorStop(0, `rgba(10, 196, 208, ${opacity})`);
        gradient.addColorStop(1, `rgba(10, 196, 208, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Central glow
      const glowR = R * 0.25 + Math.sin(time) * R * 0.03;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glow.addColorStop(0, 'rgba(10, 196, 208, 0.06)');
      glow.addColorStop(1, 'rgba(10, 196, 208, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      init();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
