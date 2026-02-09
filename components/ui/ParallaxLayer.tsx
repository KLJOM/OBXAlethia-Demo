'use client';

import React, { useEffect, useRef } from 'react';
import { useInteractionState } from '../interaction/InteractionProvider';

type ParallaxLayerProps = {
  depth?: number;
  className?: string;
  children: React.ReactNode;
};

export function ParallaxLayer({ depth = 10, className, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const interaction = useInteractionState();

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const node = ref.current;
      if (!node) return;
      const { pointer, scrollVelocity } = interaction.current;
      const x = (pointer.x - 0.5) * depth * 2;
      const y = (pointer.y - 0.5) * depth * 2;
      const scroll = Math.min(40, Math.abs(scrollVelocity)) * 0.2;
      node.style.transform = `translate3d(${x}px, ${y + scroll}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [depth, interaction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
