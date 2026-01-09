'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

function pickNext(texts: string[], current: string) {
  if (texts.length <= 1) return texts[0] ?? '';
  let next = current;
  let guard = 0;
  while (next === current && guard < 12) {
    next = texts[Math.floor(Math.random() * texts.length)] ?? '';
    guard++;
  }
  return next;
}

export default function TypewriterStatus({
  texts,
  typingMs = 34,
  pauseMs = 900,
  betweenMs = 250,
  className,
}: {
  texts: string[];
  typingMs?: number;
  pauseMs?: number;
  betweenMs?: number;
  className?: string;
}) {
  const normalized = useMemo(() => texts.map((t) => t.trim()).filter(Boolean), [texts]);
  const [phrase, setPhrase] = useState(() => normalized[0] ?? '');
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause'>('typing');
  const lastPhraseRef = useRef(phrase);

  useEffect(() => {
    // keep phrase in sync if texts change
    if (!normalized.length) {
      setPhrase('');
      setTyped('');
      setPhase('typing');
      return;
    }
    if (!normalized.includes(phrase)) {
      setPhrase(normalized[0] ?? '');
      setTyped('');
      setPhase('typing');
    }
  }, [normalized, phrase]);

  useEffect(() => {
    if (!normalized.length || !phrase) return;

    const timer = window.setTimeout(() => {
      if (phase === 'typing') {
        if (typed.length < phrase.length) {
          setTyped(phrase.slice(0, typed.length + 1));
          return;
        }
        setPhase('pause');
        return;
      }

      // pause -> rotate phrase
      lastPhraseRef.current = phrase;
      setTyped('');
      setPhrase(pickNext(normalized, lastPhraseRef.current));
      setPhase('typing');
    }, phase === 'typing' ? typingMs : phase === 'pause' ? pauseMs + betweenMs : typingMs);

    return () => window.clearTimeout(timer);
  }, [betweenMs, normalized, pauseMs, phrase, phase, typed, typingMs]);

  return (
    <div className={className}>
      <span>{typed}</span>
      <span className="typewriter-dots" aria-hidden>
        ...
      </span>
      <span className="typewriter-caret" aria-hidden>
        ▍
      </span>
    </div>
  );
}


