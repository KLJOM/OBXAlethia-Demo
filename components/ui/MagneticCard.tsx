'use client';

import React, { useRef } from 'react';

type MagneticCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function MagneticCard({ className, children }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
    card.style.setProperty('--rx', `${(y - 0.5) * 6}deg`);
    card.style.setProperty('--ry', `${(x - 0.5) * -6}deg`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 ${className ?? ''}`}
      style={{
        transform: 'perspective(1200px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))'
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.25), transparent 60%)'
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
