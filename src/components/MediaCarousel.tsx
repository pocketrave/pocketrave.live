'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';

const FALLBACK_IMAGE = '/img/synth.gif';
const ROTATE_INTERVAL_MS = 4000;

function getProjectImages(project: Project | undefined): string[] {
  if (!project?.images?.length) return [FALLBACK_IMAGE];
  return project.images.map((filename) => `/img/projects/${project.id}/${filename}`);
}

const isVideo = (src: string) => /\.(mp4|webm|ogg)(\?|$)/i.test(src);

export default function MediaCarousel({ project }: { project: Project | undefined }) {
  const images = getProjectImages(project);
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setIndex(0);
    videoRefs.current = [];
  }, [project?.id]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length, project?.id]);

  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (el) {
        if (i === index) el.play().catch(() => {});
        else el.pause();
      }
    });
  }, [index]);

  return (
    <div className="carousel-fill absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
        >
          {isVideo(src) ? (
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={src}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              {...(i === index ? { autoPlay: true } : {})}
            />
          ) : (
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
