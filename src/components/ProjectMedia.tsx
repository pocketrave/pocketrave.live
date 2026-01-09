'use client';

import type { ProjectMediaItem } from '@/data/projects';

export default function ProjectMedia({ item }: { item: ProjectMediaItem }) {
  if (item.kind === 'link') {
    return (
      <a
        className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-cyan-100"
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        <span className="underline underline-offset-2">{item.label}</span>
      </a>
    );
  }

  if (item.kind === 'soundcloud') {
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
        <iframe
          title={item.title ?? 'SoundCloud'}
          width="100%"
          height="120"
          scrolling="no"
          allow="autoplay"
          src={item.src}
          className="border-0"
        />
      </div>
    );
  }

  if (item.kind === 'iframe') {
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
        <iframe
          title={item.title ?? 'Embed'}
          width="100%"
          height={item.height ?? 320}
          src={item.src}
          className="border-0"
        />
      </div>
    );
  }

  if (item.kind === 'video') {
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
        <video
          src={item.src}
          controls
          playsInline
          preload="metadata"
          className="block w-full h-48 object-cover"
        />
      </div>
    );
  }

  // image
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
      {/* Using plain img to avoid Next Image constraints for arbitrary sizes */}
      <img src={item.src} alt={item.alt} className="block w-full h-48 object-cover" />
    </div>
  );
}


