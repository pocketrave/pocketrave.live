'use client';

import { useCallback, useEffect, useState } from 'react';
import CyberpunkBorder from '@/components/CyberpunkBorder';
import type { PressKitFile } from '@/data/press-kit-manifest';

const BASE_PATH = '/assets/press-kit';

function getFileUrl(file: PressKitFile): string {
  return `${BASE_PATH}/${encodeURIComponent(file.path)}`;
}

function getFileIcon(type: PressKitFile['type']) {
  switch (type) {
    case 'pdf':
      return (
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 16 16">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 0H4.5A1.5 1.5 0 0 0 3 1.5v1A1.5 1.5 0 0 0 4.5 4H8v1.5A1.5 1.5 0 0 0 9.5 7H11v1.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5H9.5A1.5 1.5 0 0 1 8 5V4H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h5.793L9.293 0Z" />
          <path d="M4.603 12.087a.81.81 0 0 1 0 1.06l-.848.847a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l.847-.848a.81.81 0 0 1 1.06 0l.848.848a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707 0l-.848-.848ZM5.5 10.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
        </svg>
      );
    case 'image':
      return (
        <svg className="w-6 h-6 text-cyan-500/90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      );
    case 'video':
      return (
        <svg className="w-6 h-6 text-violet-500/90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
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
  onPreview,
}: Readonly<{
  file: PressKitFile;
  index: number;
  onDownload: (file: PressKitFile) => void;
  onPreview: (file: PressKitFile) => void;
}>) {
  return (
    <div
      className="border-b border-b-white/5 last:border-b-0 border-l-2 border-l-cyan-400/50 pl-3"
      style={{ boxShadow: 'inset 4px 0 12px -2px rgba(0, 217, 255, 0.25)' }}
    >
      <div className="w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 group hover:bg-white/10">
        <button
          type="button"
          onClick={() => onPreview(file)}
          className="flex items-center gap-4 flex-1 min-w-0 text-left focus:outline-none cursor-pointer"
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
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDownload(file);
          }}
          className="shrink-0 p-2 rounded hover:bg-cyan-400/10 transition-colors focus:outline-none cursor-pointer"
          title={`Download ${file.displayName}`}
        >
          <svg
            className="w-5 h-5 text-white/30 group-hover:text-cyan-400/60 hover:text-cyan-300 transition-all"
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
      </div>
    </div>
  );
}

function PreviewContent({ file }: Readonly<{ file: PressKitFile }>) {
  const url = getFileUrl(file);

  if (file.type === 'pdf') {
    return (
      <iframe
        key={file.path}
        src={url}
        title={file.displayName}
        className="flex-1 w-full border-0"
      />
    );
  }

  if (file.type === 'video') {
    return (
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-hidden">
        <video
          key={file.path}
          src={url}
          controls
          playsInline
          preload="metadata"
          className="max-w-full max-h-full rounded"
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  if (file.type === 'image') {
    return (
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-hidden">
        <img
          src={url}
          alt={file.displayName}
          className="max-w-full max-h-full object-contain rounded"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <span className="text-white/50 font-orbitron text-sm">
        Preview not available
      </span>
    </div>
  );
}

const NAV_BUTTON_CLASS = [
  'font-orbitron text-cyan-400 hover:text-cyan-300',
  'border border-cyan-400/40 hover:border-cyan-400/70',
  'p-2.5 cursor-pointer',
  'hover:bg-cyan-400/10 transition-all duration-200',
  'hover:shadow-[0_0_12px_rgba(0,217,255,0.3)]',
  'disabled:opacity-20 disabled:pointer-events-none',
].join(' ');

export default function PressKitExplorer({ files }: Readonly<{ files: PressKitFile[] }>) {
  const [displayIndex, setDisplayIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const displayFile = displayIndex >= 0 && displayIndex < files.length ? files[displayIndex] : null;

  const openPreview = useCallback(
    (file: PressKitFile) => {
      const idx = files.indexOf(file);
      setDisplayIndex(Math.max(idx, 0));
      setIsOpen(true);
    },
    [files],
  );

  const closePreview = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goToPrev = useCallback(() => {
    setDisplayIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goToNext = useCallback(() => {
    setDisplayIndex((i) => (i < files.length - 1 ? i + 1 : i));
  }, [files.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closePreview();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closePreview, goToPrev, goToNext]);

  const handleDownload = useCallback((file: PressKitFile) => {
    const a = document.createElement('a');
    a.href = getFileUrl(file);
    a.download = file.path;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  const [archiveProgress, setArchiveProgress] = useState<number | null>(null);

  const handleDownloadAll = useCallback(async () => {
    if (archiveProgress !== null) return;
    setArchiveProgress(0);

    try {
      const { zipSync } = await import('fflate');
      const zipData: Record<string, Uint8Array> = {};

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await fetch(getFileUrl(file));
        const buf = await res.arrayBuffer();
        zipData[file.path] = new Uint8Array(buf);
        setArchiveProgress(i + 1);
      }

      const zipped = zipSync(zipData, { level: 0 });
      const blob = new Blob([zipped.buffer as ArrayBuffer], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Pocket Rave - Press Kit.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setArchiveProgress(null);
    }
  }, [files, archiveProgress]);

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] text-white relative overflow-hidden">
      {/* Full-screen ambient cyberpunk textures */}
      <div className="fixed inset-0 z-0 bg-neutral-950 pointer-events-none">
        <div className="absolute inset-0 cyberpunk-texture" />
        <div className="absolute inset-0 cyberpunk-scanlines" />
        <div className="absolute inset-0 cyberpunk-noise" />
      </div>

      <div className="relative z-10 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] mx-auto max-w-7xl px-4 md:px-16 py-2 flex flex-col min-h-0">
        <div className="font-orbitron shrink-0">
          <h1 className="text-2xl md:text-3xl tracking-tight font-bold text-white">
            Press Kit
          </h1>
          <p className="text-white/50 text-sm md:text-base mt-1">
            POCKET_RAVE_ARCHIVE v2.47 — Authorized media assets
          </p>
        </div>

        {/* Main capsule */}
        <div className="relative flex-1 min-h-0 mt-2">
          <div className="relative h-full w-full">
            <div
              className={[
                'cyberpunk-capsule h-full w-full',
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
              <div className="flex flex-col h-full min-h-0">
                {/* Folder header bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/30 shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-cyan-400/80" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400/80" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400/80" />
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
                      /home/press-kit
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/40">
                    {files.length} file{files.length === 1 ? '' : 's'}
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={archiveProgress !== null}
                    className={[
                      'flex items-center gap-2 ml-2',
                      'font-orbitron text-xs tracking-wider uppercase',
                      'text-cyan-400 hover:text-cyan-300',
                      'border border-cyan-400/40 hover:border-cyan-400/70',
                      'px-3 py-1',
                      'hover:bg-cyan-400/10 transition-all duration-200',
                      'hover:shadow-[0_0_12px_rgba(0,217,255,0.3)]',
                      'disabled:opacity-50 disabled:pointer-events-none',
                      'cursor-pointer shrink-0',
                    ].join(' ')}
                    style={{
                      clipPath:
                        'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                    }}
                    title="Download all files as ZIP archive"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {archiveProgress === null
                      ? 'ZIP'
                      : `${archiveProgress}/${files.length}`}
                  </button>
                </div>

                {/* File list */}
                <div className="cyberpunk-scrollbar flex-1 overflow-y-auto divide-y divide-white/5">
                  {files.map((file, i) => (
                    <FileRow
                      key={file.path}
                      file={file}
                      index={i}
                      onDownload={handleDownload}
                      onPreview={openPreview}
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

      {/* Preview backdrop */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={[
          'fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={closePreview}
      />

      {/* Preview slide-in panel */}
      <div
        className={[
          'fixed top-14 md:top-20 bottom-0 right-0 z-40',
          'w-full md:w-3/5 lg:w-1/2',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div
          className="h-full flex flex-col bg-neutral-950/95 backdrop-blur-xl border-l border-cyan-400/20"
          style={{ boxShadow: '-4px 0 24px rgba(0, 217, 255, 0.08)' }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 bg-black/30 shrink-0">
            <div className="flex items-center gap-3 min-w-0 mr-4">
              <span className="font-orbitron text-sm text-white/70 truncate">
                {displayFile?.displayName}
              </span>
              <span className="font-mono text-xs text-white/30 shrink-0">
                {displayIndex >= 0 ? `${displayIndex + 1}/${files.length}` : ''}
              </span>
            </div>
            <button
              type="button"
              onClick={closePreview}
              className={[
                'font-orbitron text-xs tracking-widest uppercase',
                'text-cyan-400 hover:text-cyan-300',
                'border border-cyan-400/40 hover:border-cyan-400/70',
                'px-4 py-1.5',
                'hover:bg-cyan-400/10 transition-all duration-200',
                'hover:shadow-[0_0_12px_rgba(0,217,255,0.3)]',
                'shrink-0 cursor-pointer',
              ].join(' ')}
              style={{
                clipPath:
                  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              CLOSE
            </button>
          </div>

          {/* Panel content with nav arrows */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
            {displayFile && <PreviewContent file={displayFile} />}

            {/* Prev arrow */}
            <button
              type="button"
              onClick={goToPrev}
              disabled={displayIndex <= 0}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 ${NAV_BUTTON_CLASS}`}
              style={{
                clipPath:
                  'polygon(7px 0, 100% 0, 100% 100%, 7px 100%, 0 calc(50% + 0px), 0 50%)',
              }}
              title="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={goToNext}
              disabled={displayIndex >= files.length - 1}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 ${NAV_BUTTON_CLASS}`}
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 7px) 0, 100% 50%, calc(100% - 7px) 100%, 0 100%)',
              }}
              title="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
