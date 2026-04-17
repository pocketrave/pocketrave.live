"use client";

import { useEffect, useMemo, useState } from "react";

const INSPIRED_BY_NAMES = [
  "OK EG",
  "Luigi Tozzi",
  "Priori",
  "Konduku",
  "Kia",
  "Volodymir Gnatenko",
  "Polygonia",
  "Etapp Kyle",
];

type Vec3 = { x: number; y: number; z: number };

function fibonacciSpherePoint(index: number, total: number): Vec3 {
  const y = 1 - (index / (total - 1 || 1)) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = Math.PI * (3 - Math.sqrt(5)) * index;

  return {
    x: Math.cos(theta) * radius,
    y,
    z: Math.sin(theta) * radius,
  };
}

function rotatePoint(point: Vec3, angleY: number, angleX: number): Vec3 {
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;

  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const y2 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

export default function InspiredBySphere() {
  const [rotation, setRotation] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const points = useMemo(
    () => INSPIRED_BY_NAMES.map((_, idx) => fibonacciSpherePoint(idx, INSPIRED_BY_NAMES.length)),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(mediaQuery.matches);
    syncMotion();
    mediaQuery.addEventListener("change", syncMotion);

    return () => {
      mediaQuery.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let frameId = 0;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - start;
      setRotation(elapsed * 0.00035);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [reduceMotion]);

  const renderedTags = INSPIRED_BY_NAMES.map((name, index) => {
    const rotated = rotatePoint(points[index], rotation, 0.42 + Math.sin(rotation * 0.35) * 0.16);
    const depth = (rotated.z + 1) / 2;
    const x = rotated.x * 118;
    const y = rotated.y * 88;
    const blurPx = (1 - depth) * 3.2;
    const opacity = 0.28 + depth * 0.72;
    const scale = 0.82 + depth * 0.32;

    return {
      key: name,
      name,
      depth,
      style: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity,
        filter: `blur(${blurPx}px) saturate(${0.7 + depth * 0.6})`,
        textShadow:
          depth > 0.62
            ? "0 0 8px rgba(0, 217, 255, 0.6), 0 0 20px rgba(0, 217, 255, 0.32)"
            : "0 0 6px rgba(142, 84, 233, 0.35)",
      } as const,
    };
  }).sort((a, b) => a.depth - b.depth);

  return (
    <aside className="inspired-sphere-shell" aria-label="Inspired by artists cloud">
      <div className="inspired-sphere-header">
        <span>Inspired By</span>
      </div>
      <div className="inspired-sphere-stage">
        <div className="inspired-sphere-core" aria-hidden />
        <div className="inspired-sphere-orbit" aria-hidden />
        {renderedTags.map((tag) => (
          <span key={tag.key} className="inspired-sphere-tag" style={tag.style}>
            {tag.name}
          </span>
        ))}
      </div>
    </aside>
  );
}
