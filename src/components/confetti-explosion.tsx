"use client";

import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiExplosionProps {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
}

const fire = (particleRatio: number, opts: object) => {
    confetti(Object.assign({}, {
        particleCount: Math.floor(200 * particleRatio),
        colors: ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#ffffff'],
        ...opts
    }));
}

export default function ConfettiExplosion({
  particleCount = 150,
  spread = 70,
  startVelocity = 45,
}: ConfettiExplosionProps) {

  const explode = useCallback(() => {
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
  }, []);

  useEffect(() => {
    explode();
  }, [explode]);

  return null;
}
