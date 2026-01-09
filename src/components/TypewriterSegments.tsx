'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

type TextSeg = { type: 'text'; text: string };
type LinkSeg = {
  type: 'link';
  text: string;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
};

export type TypewriterSegment = TextSeg | LinkSeg;

function totalLength(segments: TypewriterSegment[]) {
  return segments.reduce((sum, s) => sum + s.text.length, 0);
}

export default function TypewriterSegments({
  segments,
  className,
  typingMs = 16,
  startDelayMs = 0,
  showCaret = true,
}: {
  segments: TypewriterSegment[];
  className?: string;
  typingMs?: number;
  startDelayMs?: number;
  showCaret?: boolean;
}) {
  const normalized = useMemo(
    () =>
      segments
        .map((s) => ({ ...s, text: s.text ?? '' }))
        .filter((s) => s.text.length > 0),
    [segments]
  );

  const fullLen = useMemo(() => totalLength(normalized), [normalized]);
  const [n, setN] = useState(0);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const v = Boolean(mq?.matches);
    setReducedMotion(v);
    if (!mq) return;
    const handler = () => setReducedMotion(Boolean(mq.matches));
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setN(fullLen);
      return;
    }

    if (fullLen === 0) {
      setN(0);
      return;
    }

    setN(0);

    let intervalId: number | undefined;
    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setN((x) => {
          if (x >= fullLen) {
            if (intervalId) window.clearInterval(intervalId);
            return x;
          }
          const nx = x + 1;
          if (nx >= fullLen && intervalId) window.clearInterval(intervalId);
          return nx;
        });
      }, typingMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [fullLen, reducedMotion, startDelayMs, typingMs]);

  // Build partially-typed render
  let remaining = n;
  const out: Array<React.ReactElement> = [];
  normalized.forEach((seg, idx) => {
    const take = Math.max(0, Math.min(seg.text.length, remaining));
    remaining -= take;
    if (take <= 0) return;

    const visibleText = seg.text.slice(0, take);
    if (seg.type === 'text') {
      out.push(
        <span key={idx} suppressHydrationWarning>
          {visibleText}
        </span>
      );
      return;
    }

    // Link segment: not clickable until fully typed
    if (take < seg.text.length) {
      out.push(
        <span key={idx} className={seg.className} suppressHydrationWarning>
          {visibleText}
        </span>
      );
      return;
    }

    out.push(
      <Link
        key={idx}
        href={seg.href}
        className={seg.className}
        target={seg.target}
        rel={seg.rel}
        suppressHydrationWarning
      >
        {seg.text}
      </Link>
    );
  });

  return (
    <span className={className}>
      {out}
      {showCaret ? (
        <span className="typewriter-caret" aria-hidden>
          ▍
        </span>
      ) : null}
    </span>
  );
}


