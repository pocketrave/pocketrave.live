'use client';

import { useEffect, useState } from 'react';

const FRAMES = ['/', '-', '\\', '|'] as const;

export default function BusyIndicator({
  className,
  intervalMs = 140,
}: {
  className?: string;
  intervalMs?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((x) => (x + 1) % FRAMES.length), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);

  return (
    <span
      className={className}
      aria-hidden
      style={{ display: 'inline-block', width: '1ch', textAlign: 'center' }}
    >
      {FRAMES[i]}
    </span>
  );
}


