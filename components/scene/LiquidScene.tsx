'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useInteractionState } from '../interaction/InteractionProvider';

const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uVelocity: new THREE.Vector2(0, 0),
    uScroll: 0,
    uIntensity: 0.45,
    uResolution: new THREE.Vector2(1, 1)
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
  `,
  `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uScroll;
  uniform float uIntensity;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec2 center = uMouse;
    float dist = distance(uv, center);
    float falloff = 1.0 / (1.0 + dist * 18.0);

    float flow = noise(uv * 4.0 + vec2(uTime * 0.15, uTime * 0.12));
    float ripple = noise(uv * 10.0 - vec2(uTime * 0.4, uTime * 0.25));

    vec2 velocity = uVelocity * 0.2;
    uv += (velocity * 0.05 + vec2(flow, ripple) * 0.08) * falloff;
    uv += vec2(sin(uTime + uv.y * 6.0), cos(uTime * 0.7 + uv.x * 6.0)) * 0.015 * uIntensity;

    float field = noise(uv * 5.0 + uTime * 0.2 + uScroll * 0.0002);
    vec3 base = mix(vec3(0.02, 0.04, 0.08), vec3(0.08, 0.16, 0.28), field);
    vec3 highlight = vec3(0.35, 0.45, 0.9) * falloff;

    gl_FragColor = vec4(base + highlight, 1.0);
  }
  `
);

extend({ LiquidMaterial });

type LiquidMaterialImpl = {
  uTime: number;
  uMouse: THREE.Vector2;
  uVelocity: THREE.Vector2;
  uScroll: number;
  uIntensity: number;
  uResolution: THREE.Vector2;
};

function LiquidPlane() {
  const interaction = useInteractionState();
  const material = useRef<LiquidMaterialImpl>(null);
  const clockRef = useRef(0);

  useFrame((state, delta) => {
    clockRef.current += delta;
    if (clockRef.current < 1 / 45) return;
    const frameDelta = clockRef.current;
    clockRef.current = 0;
    if (!material.current) return;

    const { pointer, velocity, scroll, time, quality } = interaction.current;
    material.current.uTime = time;
    material.current.uMouse.set(pointer.x, 1 - pointer.y);
    material.current.uVelocity.set(velocity.x, -velocity.y);
    material.current.uScroll = scroll;
    material.current.uIntensity = 0.4 + Math.min(0.6, Math.abs(velocity.x + velocity.y));
    material.current.uResolution.set(state.size.width * quality, state.size.height * quality);
    state.gl.setPixelRatio(quality);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2, 64, 64]} />
      {/* @ts-expect-error custom shader material */}
      <liquidMaterial ref={material} />
    </mesh>
  );
}

export function LiquidScene() {
  const camera = useMemo(() => ({ position: [0, 0, 1] as [number, number, number] }), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      >
        <LiquidPlane />
      </Canvas>
    </div>
  );
}
