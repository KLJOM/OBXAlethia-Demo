'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
