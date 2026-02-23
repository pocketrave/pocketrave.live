'use client';

import { useCallback } from 'react';
import CyberpunkBorder from '@/components/CyberpunkBorder';
import type { PressKitFile } from '@/data/press-kit-manifest';

const BASE_PATH = '/assets/press-kit';
const LARGE_FILE_THRESHOLD_MB = 100;
const DOWNLOAD_ALL_URL =
  'https://drive.usercontent.google.com/u/0/uc?id=1vI28AA9zgiT3z7emJcC1iHRMUMgM3WO8&export=download';

function parseSizeToBytes(sizeStr: string | undefined): number | null {
  if (!sizeStr) return null;
  const re = /^([\d.]+)\s*(KB|MB|GB)$/i;
  const m = re.exec(sizeStr.trim());
  if (!m) return null;
  const n = Number.parseFloat(m[1]);
  const unit = m[2].toUpperCase();
  if (unit === 'KB') return n * 1024;
  if (unit === 'MB') return n * 1024 * 1024;
  if (unit === 'GB') return n * 1024 * 1024 * 1024;
  return null;
}

function getArchiveIcon() {
  return (
    <svg className="w-6 h-6 text-amber-500/90" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" />
    </svg>
  );
}

function getFileIcon(type: PressKitFile['type']) {
  switch (type) {
    case 'pdf':
      return (
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 16 16">
          {/* Bootstrap file-earmark-pdf - document with folded corner and PDF lines */}
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
  isDownloadAll,
}: Readonly<{
  file: PressKitFile;
  index: number;
  onDownload: (file: PressKitFile) => void;
  isDownloadAll?: boolean;
}>) {
  const hasGlowLine = !isDownloadAll;
  return (
    <div
      className={[
        'border-b border-white/5 last:border-b-0',
        hasGlowLine && 'border-l-2 border-cyan-400/50 pl-3',
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        hasGlowLine
          ? { boxShadow: 'inset 4px 0 12px -2px rgba(0, 217, 255, 0.25)' }
          : undefined
      }
    >
      <button
        type="button"
        onClick={() => onDownload(file)}
        className={[
          'w-full flex items-center gap-4 px-4 py-3 text-left',
          'transition-all duration-200 group',
          'hover:bg-white/10',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
        ].join(' ')}
      >
      <span className="text-white/40 font-mono text-sm tabular-nums w-6 shrink-0">
        {isDownloadAll ? '00' : String(index + 1).padStart(2, '0')}
      </span>
      <span className="shrink-0 text-white/70 group-hover:text-cyan-400/90 transition-colors">
        {isDownloadAll ? getArchiveIcon() : getFileIcon(file.type)}
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
    </div>
  );
}

export default function PressKitExplorer({ files }: Readonly<{ files: PressKitFile[] }>) {
  const handleDownload = useCallback((file: PressKitFile) => {
    const url =
      file.url ??
      (file.path ? `${BASE_PATH}/${encodeURIComponent(file.path)}` : '');
    const bytes = parseSizeToBytes(file.size);
    const isLarge = bytes !== null && bytes > LARGE_FILE_THRESHOLD_MB * 1024 * 1024;

    if (isLarge) {
      // Large files (>100MB): open in new tab
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (file.url) {
      // External URL (≤100MB): load in hidden iframe so the page stays in place
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;width:0;height:0;border:0;visibility:hidden';
      iframe.src = url;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 60000);
    } else {
      // Local file: programmatic click with download attr, no new tab
      const a = document.createElement('a');
      a.href = url;
      a.download = file.path ?? file.displayName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] text-white relative overflow-hidden">
      {/* Full-screen ambient cyberpunk textures (behind nav) */}
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

        {/* Main capsule: folder / file share */}
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
              </div>

              {/* File list */}
              <div className="cyberpunk-scrollbar flex-1 overflow-y-auto divide-y divide-white/5">
                <FileRow
                  key="download-all"
                  file={{
                    displayName: 'Download all',
                    size: '201 MB',
                    type: 'other',
                    url: DOWNLOAD_ALL_URL,
                  }}
                  index={-1}
                  onDownload={handleDownload}
                  isDownloadAll
                />
                {files.map((file, i) => (
                  <FileRow
                    key={file.url ?? file.path ?? `${i}-${file.displayName}`}
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
