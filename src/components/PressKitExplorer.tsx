'use client';

import { useCallback } from 'react';
import CyberpunkBorder from '@/components/CyberpunkBorder';
import type { PressKitFile } from '@/data/press-kit-manifest';

const BASE_PATH = '/assets/press-kit';

function getFileIcon(type: PressKitFile['type']) {
  switch (type) {
    case 'pdf':
      return (
        <svg className="w-6 h-6 text-red-500/90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2 5 5h-5V4zM8 13h2v5H8v-5zm4-2h2v7h-2v-7zm-4-2h2v2H8V9zm4 0h2v2h-2V9z" />
        </svg>
      );
    case 'image':
      return (
        <svg className="w-6 h-6 text-cyan-500/90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-amber-500/90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      );
  }
}

function FileRow({
  file,
  index,
  onDownload,
}: Readonly<{
  file: PressKitFile;
  index: number;
  onDownload: (file: PressKitFile) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onDownload(file)}
      className={[
        'w-full flex items-center gap-4 px-4 py-3 text-left',
        'transition-all duration-200 group',
        'hover:bg-white/10 border-b border-white/5 last:border-b-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
      ].join(' ')}
    >
      <span className="text-white/40 font-mono text-sm tabular-nums w-6 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="shrink-0 text-white/70 group-hover:text-cyan-400/90 transition-colors">
        {getFileIcon(file.type)}
      </span>
      <div className="min-w-0 flex-1">
        <span className="font-medium text-white group-hover:text-cyan-300 truncate block">
          {file.displayName}
        </span>
        {file.size && (
          <span className="text-xs text-white/40 font-mono">{file.size}</span>
        )}
      </div>
      <svg
        className="w-5 h-5 text-white/30 group-hover:text-cyan-400/80 group-hover:translate-x-0.5 transition-all shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </button>
  );
}

export default function PressKitExplorer({ files }: Readonly<{ files: PressKitFile[] }>) {
  const handleDownload = useCallback((file: PressKitFile) => {
    const url = `${BASE_PATH}/${encodeURIComponent(file.filename)}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] text-white relative bg-neutral-950 overflow-hidden">
      {/* Ambient cyberpunk textures */}
      <div className="absolute inset-0 cyberpunk-texture pointer-events-none" />
      <div className="absolute inset-0 cyberpunk-scanlines pointer-events-none" />
      <div className="absolute inset-0 cyberpunk-noise pointer-events-none" />

      <div className="relative h-full mx-auto max-w-4xl px-4 md:px-16 py-8 md:py-12 flex flex-col">
        <div className="font-orbitron mb-8">
          <h1 className="text-3xl md:text-4xl tracking-tight font-bold text-white mb-2">
            Press Kit
          </h1>
          <p className="text-white/50 text-sm md:text-base">
            POCKET_RAVE_ARCHIVE v2.47 — Authorized media assets
          </p>
        </div>

        {/* Main capsule: folder / file share */}
        <div className="relative flex-1 min-h-[400px]">
          <div className="relative h-full w-full min-h-[380px]">
            <div
              className={[
                'cyberpunk-capsule h-full w-full min-h-[380px]',
                'bg-white/5 backdrop-blur-xl',
                'border border-white/10',
              ].join(' ')}
            style={
              {
                '--cp-border-width': '1px',
                '--cp-border-color': 'rgba(255, 255, 255, 0.1)',
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col h-full min-h-[320px]">
              {/* Folder header bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/30 shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 flex items-center gap-2 pl-2">
                  <svg
                    className="w-5 h-5 text-cyan-400/80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
                  </svg>
                  <span className="text-sm font-mono text-white/70">
                    /pocketrave/press-kit
                  </span>
                </div>
                <span className="text-xs font-mono text-white/40">
                  {files.length} file{files.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* File list */}
              <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                {files.map((file, i) => (
                  <FileRow
                    key={file.filename}
                    file={file}
                    index={i}
                    onDownload={handleDownload}
                  />
                ))}
              </div>


            </div>
          </div>

            <CyberpunkBorder
              borderWidth={1}
              borderColor="rgba(255, 255, 255, 0.1)"
              glowColor="rgba(0, 217, 255, 0.25)"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
