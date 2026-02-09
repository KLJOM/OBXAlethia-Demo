'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export type InteractionState = {
  pointer: { x: number; y: number };
  velocity: { x: number; y: number };
  scroll: number;
  scrollVelocity: number;
  time: number;
  quality: number;
};

const InteractionContext = createContext<React.MutableRefObject<InteractionState> | null>(null);

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function InteractionProvider({ children }: { children: React.ReactNode }) {
  const stateRef = useRef<InteractionState>({
    pointer: { x: 0.5, y: 0.5 },
    velocity: { x: 0, y: 0 },
    scroll: 0,
    scrollVelocity: 0,
    time: 0,
    quality: 1
  });

  const targetPointer = useRef({ x: 0.5, y: 0.5 });
  const lastPointer = useRef({ x: 0.5, y: 0.5 });
  const lastTime = useRef(0);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      targetPointer.current = {
        x: clamp01(event.clientX / innerWidth),
        y: clamp01(event.clientY / innerHeight)
      };
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      duration: 1.1,
      syncTouch: true
    });

    lenis.on('scroll', ({ scroll, velocity }) => {
      stateRef.current.scroll = scroll;
      stateRef.current.scrollVelocity = velocity;
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      const dt = (time - lastTime.current) / 1000;
      lastTime.current = time;
      stateRef.current.time = time / 1000;

      const pointer = stateRef.current.pointer;
      pointer.x += (targetPointer.current.x - pointer.x) * 0.12;
      pointer.y += (targetPointer.current.y - pointer.y) * 0.12;

      stateRef.current.velocity = {
        x: (pointer.x - lastPointer.current.x) / Math.max(dt, 0.016),
        y: (pointer.y - lastPointer.current.y) / Math.max(dt, 0.016)
      };
      lastPointer.current = { ...pointer };

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const updateQuality = () => {
      const { devicePixelRatio, innerWidth } = window;
      const sizeFactor = innerWidth < 768 ? 0.75 : 1;
      stateRef.current.quality = Math.min(1.2, devicePixelRatio) * sizeFactor;
    };

    updateQuality();
    window.addEventListener('resize', updateQuality);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateQuality);
      lenis.destroy();
    };
  }, []);

  const value = useMemo(() => stateRef, []);

  return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>;
}

export function useInteractionState() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error('useInteractionState must be used within InteractionProvider');
  }
  return context;
}
