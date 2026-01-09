'use client';

import { useEffect, useRef } from 'react';

const FORWARD_SRC = '/videos/background.webm';
const REVERSE_SRC = '/videos/background-reverse.webm';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const directionRef = useRef<'forward' | 'reverse'>('forward');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure autoplay works consistently.
    video.muted = true;
    video.playsInline = true;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can still be blocked by the browser; ignore.
      }
    };

    void tryPlay();
  }, []);

  const handleEnded = async () => {
    const video = videoRef.current;
    if (!video) return;

    directionRef.current = directionRef.current === 'forward' ? 'reverse' : 'forward';
    const nextSrc = directionRef.current === 'forward' ? FORWARD_SRC : REVERSE_SRC;

    // Swap sources to create a "boomerang" effect reliably (no negative playbackRate hacks).
    video.src = nextSrc;
    video.load();

    try {
      await video.play();
    } catch {
      // ignore
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={FORWARD_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        onEnded={handleEnded}
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-neutral-950/35 z-10 pointer-events-none" aria-hidden="true" />
    </>
  );
}


