'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Project, ProjectBlurbLink } from '@/data/projects';

function renderBlurbWithLinks(blurb: string, links?: ProjectBlurbLink[]): React.ReactNode {
  if (!links?.length) return blurb;
  // Find the earliest occurrence of any link text (so links work regardless of order)
  let earliestIdx = blurb.length;
  let earliestLink: ProjectBlurbLink | null = null;
  for (const link of links) {
    const idx = blurb.indexOf(link.text);
    if (idx !== -1 && idx < earliestIdx) {
      earliestIdx = idx;
      earliestLink = link;
    }
  }
  if (!earliestLink) return blurb;
  const { text, href } = earliestLink;
  const linkEl = (
    <a
      key={`${href}-${text}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 underline decoration-cyan-400/50 underline-offset-2 hover:text-cyan-300 hover:decoration-cyan-400"
    >
      {text}
    </a>
  );
  return [
    blurb.slice(0, earliestIdx),
    linkEl,
    renderBlurbWithLinks(blurb.slice(earliestIdx + text.length), links),
  ];
}
import CyberpunkBorder from '@/components/CyberpunkBorder';
import MediaCarousel from '@/components/MediaCarousel';

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>(projects[0]?.id);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const displayItems = useMemo(
    () => projects.map((project) => ({ instanceId: project.id, project })),
    [projects]
  );

  // Maintain focus zone selection (middle of scroll container)
  const updateFocus = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const rect = scroller.getBoundingClientRect();
    const focusY = rect.top + rect.height * 0.5; // center - matches snap-center behavior

    let best: { id: string; dist: number; projectId: string } | null = null;
    for (const [instanceId, el] of cardRefs.current.entries()) {
      const r = el.getBoundingClientRect();
      const mid = (r.top + r.bottom) / 2;
      const dist = Math.abs(mid - focusY);
      if (!best || dist < best.dist) best = { id: instanceId, dist, projectId: el.dataset.projectId || '' };
    }
    if (best?.projectId) setActiveProjectId(best.projectId);
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const onScroll = () => {
      updateFocus();
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    queueMicrotask(updateFocus);
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [updateFocus]);


  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] text-white relative bg-neutral-950 overflow-hidden">
      <div className="h-full mx-auto max-w-7xl px-4 md:px-16 py-2 flex flex-col">
        {/* Split view */}
        <div className="mt-2 flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 min-h-0">
          {/* Capsules (left) */}
          <div className="relative border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <div
              ref={scrollRef}
              className="hide-scrollbar relative h-full overflow-y-auto overscroll-contain snap-y snap-mandatory"
            >
              <div className="px-3 py-4">
                <div className="space-y-4">
                  {displayItems.map(({ instanceId, project }) => {
                    const isActive = project.id === activeProjectId;
                    return (
                      <div
                        key={instanceId}
                        className="snap-center snap-always"
                      >
                        <div className="relative">
                          <div
                            ref={(el) => {
                              if (!el) {
                                cardRefs.current.delete(instanceId);
                                return;
                              }
                              cardRefs.current.set(instanceId, el);
                            }}
                            data-project-id={project.id}
                            className={[
                              'cyberpunk-capsule p-4 md:p-5 transition-all',
                              'h-[70vh] overflow-hidden',
                              'bg-linear-to-b from-white/6 to-white/3',
                            ].join(' ')}
                            style={{
                              '--cp-border-width': isActive ? '1.5px' : '1px',
                              '--cp-border-color': isActive ? 'rgba(103, 232, 249, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                              '--cp-border-hover-color': isActive ? undefined : 'rgba(255, 255, 255, 0.2)',
                            } as React.CSSProperties}
                          >
                          <div className="flex h-full min-h-0 flex-col">
                        <div className="flex shrink-0 items-start gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ background: project.color }}
                              />
                              <h2 className="text-lg md:text-xl font-semibold text-white">
                                {project.title}
                              </h2>
                            </div>
                            {project.location && (
                              <div className="mt-1 text-xs text-white/50">
                                {project.location}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="cyberpunk-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto text-sm md:text-base leading-relaxed text-white/75">
                          {renderBlurbWithLinks(project.blurb, project.blurbLinks)}
                        </p>

                        <div className="mt-3 mb-2 flex shrink-0 flex-wrap gap-1.5">
                          {project.role.map((r) => (
                            <button
                              key={r}
                              onClick={() => setActiveProjectId(project.id)}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70 hover:bg-white/10"
                            >
                              {r.replaceAll('-', ' ').replaceAll(/\b\w/g, (c) => c.toUpperCase())}
                            </button>
                          ))}
                        </div>
                        </div>
                          </div>
                          <CyberpunkBorder
                            borderWidth={isActive ? 1.5 : 1}
                            borderColor={isActive ? 'rgba(103, 232, 249, 0.4)' : 'rgba(255, 255, 255, 0.1)'}
                            hoverColor={isActive ? undefined : 'rgba(255, 255, 255, 0.2)'}
                            glowColor={isActive ? 'rgba(0, 217, 255, 0.5)' : 'rgba(255, 255, 255, 0.15)'}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Media carousel (right) */}
          <div className="hidden lg:block relative overflow-hidden min-h-0 h-full">
            <div className="relative h-full w-full">
              <div
                className="cyberpunk-capsule h-full w-full bg-white/5 backdrop-blur-xl relative overflow-hidden"
                style={{
                  '--cp-border-width': '1px',
                  '--cp-border-color': 'rgba(255, 255, 255, 0.1)',
                } as React.CSSProperties}
              >
                <MediaCarousel project={projects.find((p) => p.id === activeProjectId)} />
              </div>
              <CyberpunkBorder
                borderWidth={1}
                borderColor="rgba(255, 255, 255, 0.1)"
                hoverColor="rgba(255, 255, 255, 0.2)"
                glowColor="rgba(0, 217, 255, 0.25)"
              />
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="lg:hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-sm text-white/70">
            Media carousel is available on larger screens.
          </div>
        </div>
      </div>
    </div>
  );
}


