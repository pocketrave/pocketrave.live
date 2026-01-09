'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '@/data/projects';
import { TYPEWRITER_TEXTS } from '@/data/typewriterTexts';
import ProjectsGraph3D from '@/components/ProjectsGraph3D';
import ProjectMedia from '@/components/ProjectMedia';
import TypewriterStatus from '@/components/TypewriterStatus';
import CyberpunkBorder from '@/components/CyberpunkBorder';
import CyberpunkCornerBorder from '@/components/CyberpunkCornerBorder';

type TagGroup = 'medium' | 'role' | 'context' | 'year' | 'tag';

function tagLabel(t: string) {
  // t is like "medium:live-visuals" or "year:2024"
  const [g, v] = t.split(':', 2);
  if (g === 'year') return v;
  return v.replace(/-/g, ' ');
}

function tagGroup(t: string): TagGroup {
  return (t.split(':', 1)[0] as TagGroup) ?? 'tag';
}

function projectAllTags(p: Project) {
  return [
    ...p.medium.map((m) => `medium:${m}`),
    ...p.role.map((r) => `role:${r}`),
    ...p.context.map((c) => `context:${c}`),
    ...p.years.map((y) => `year:${y}`),
    ...p.tags.map((t) => `tag:${t}`),
  ];
}

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>(projects[0]?.id);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [isFiltersExpanded, setIsFiltersExpanded] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Build tags list
  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => projectAllTags(p).forEach((t) => s.add(t)));
    return Array.from(s);
  }, [projects]);

  const tagsByGroup = useMemo(() => {
    const groups: Record<TagGroup, string[]> = { medium: [], role: [], context: [], year: [], tag: [] };
    for (const t of allTags) groups[tagGroup(t)].push(t);
    // stable-ish ordering
    groups.year.sort((a, b) => Number(b.split(':')[1]) - Number(a.split(':')[1]));
    groups.medium.sort();
    groups.role.sort();
    groups.context.sort();
    groups.tag.sort();
    return groups;
  }, [allTags]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.size === 0) return projects;
    return projects.filter((p) => {
      const tags = new Set(projectAllTags(p));
      return [...selectedTags].every((t) => tags.has(t));
    });
  }, [projects, selectedTags]);

  // Fake "infinite" list by repeating filtered projects
  const displayItems = useMemo(() => {
    const base = filteredProjects.length ? filteredProjects : projects;
    const repeats = 20;
    const items: Array<{ instanceId: string; project: Project; instanceIdx: number }> = [];
    for (let i = 0; i < repeats; i++) {
      for (const p of base) items.push({ instanceId: `${p.id}__${i}`, project: p, instanceIdx: i });
    }
    return items;
  }, [filteredProjects, projects]);

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
    updateFocus();
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [updateFocus]);

  // If we change filters, snap scroll near the middle to preserve "infinite" feel.
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollTop = scroller.scrollHeight / 2;
    updateFocus();
  }, [selectedTags, updateFocus]);

  const toggleTag = (t: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const clearTags = () => setSelectedTags(new Set());

  const handleNodeClick = (node: { kind: 'project' | 'tag'; id: string; label: string }) => {
    if (node.kind === 'project') {
      const pid = node.id.replace(/^p:/, '');
      setActiveProjectId(pid);
      // Scroll to the first instance of that project closest to current scroll
      const scroller = scrollRef.current;
      if (!scroller) return;
      const target = Array.from(cardRefs.current.values()).find((el) => el.dataset.projectId === pid);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // tag node label is like "medium:live-visuals" etc.
      const tag = node.label;
      toggleTag(tag);
    }
  };

  const activeTagSet = selectedTags.size > 0 ? selectedTags : undefined;

  return (
    <div className="min-h-screen text-white relative">
      {/* cyberpunk glowing textures */}
      <div className="pointer-events-none fixed inset-0 -z-10 cyberpunk-texture" />
      <div className="pointer-events-none fixed inset-0 -z-10 cyberpunk-noise" />
      <div className="pointer-events-none fixed inset-0 -z-10 cyberpunk-scanlines" />
      <div className="film-grain" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 md:px-16 py-10">
        <div className="font-orbitron flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl tracking-tight font-bold text-white">
              Projects
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/70 max-w-2xl">
              Selected works, roles, and contexts. Scroll the capsules to steer the graph.
            </p>
          </div>
          <button
            onClick={clearTags}
            className="hidden md:inline-flex items-center rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Clear filters
          </button>
        </div>

        {/* Filter chips */}
        <div className="mt-6">
          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="flex items-center gap-2 text-sm md:text-base text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xs uppercase tracking-widest text-white/40">
              Filters
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isFiltersExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {selectedTags.size > 0 && (
              <span className="rounded-full bg-cyan-300/20 text-cyan-300 px-2 py-0.5 text-xs">
                {selectedTags.size}
              </span>
            )}
          </button>
          
          {isFiltersExpanded && (
            <div className="mt-4 space-y-3">
              {(['year', 'medium', 'role', 'context', 'tag'] as TagGroup[]).map((g) => (
                <div key={g} className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/40 mr-1">
                    {g}
                  </span>
                  {tagsByGroup[g].slice(0, g === 'tag' ? 18 : 999).map((t) => {
                    const active = selectedTags.has(t);
                    return (
                      <button
                        key={t}
                        onClick={() => toggleTag(t)}
                        className={[
                          'rounded-full px-3 py-1 text-xs md:text-sm border transition-colors',
                          'backdrop-blur-md',
                          active
                            ? 'border-cyan-300/50 bg-cyan-300/15 text-cyan-50 shadow-[0_0_24px_rgba(0,255,229,0.18)]'
                            : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10',
                        ].join(' ')}
                        title={t}
                      >
                        {tagLabel(t)}
                      </button>
                    );
                  })}
                  {g === 'tag' && tagsByGroup.tag.length > 18 && (
                    <span className="text-xs text-white/40">
                      +{tagsByGroup.tag.length - 18} more (we can add "expand")
                    </span>
                  )}
                </div>
              ))}

              <div className="md:hidden">
                <button
                  onClick={clearTags}
                  className="inline-flex items-center rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Split view */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* Capsules (left) */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <div
              ref={scrollRef}
              className="hide-scrollbar relative h-[70vh] lg:h-[76vh] overflow-y-auto overscroll-contain snap-y snap-mandatory"
            >
              <div className="px-3 py-4">
                {/* focus zone marker (sticky overlay: stays aligned while list scrolls) */}
                <div className="pointer-events-none sticky top-[50%] z-10 h-0">
                  <div className="-translate-y-1/2">
                    <div 
                      className="w-full"
                      style={{
                        boxShadow: '0 0 90px rgba(0,255,229,0.18), 0 0 0 1px rgba(0,255,229,0.22)',
                      }}
                    >
                      <div 
                        className="cyberpunk-selection-frame h-64 md:h-72 w-full bg-cyan-300/5 relative"
                      >
                        <CyberpunkCornerBorder
                          borderWidth={2}
                          borderColor="rgba(0, 217, 255, 0.6)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {displayItems.map(({ instanceId, project }) => {
                    const isActive = project.id === activeProjectId;
                    const tags = projectAllTags(project);
                    return (
                      <div
                        key={instanceId}
                        className="snap-center snap-always"
                        style={{
                          boxShadow: isActive ? `0 0 0 1px ${project.color}33, 0 0 40px ${project.color}22` : undefined,
                        }}
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
                              'h-64 md:h-72 overflow-hidden',
                              'bg-linear-to-b from-white/6 to-white/3',
                            ].join(' ')}
                            style={{
                              '--cp-border-width': isActive ? '1.5px' : '1px',
                              '--cp-border-color': isActive ? 'rgba(103, 232, 249, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                              '--cp-border-hover-color': isActive ? undefined : 'rgba(255, 255, 255, 0.2)',
                            } as React.CSSProperties}
                          >
                          <div className="flex h-full flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
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
                          <button
                            onClick={() => setActiveProjectId(project.id)}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
                          >
                            Focus
                          </button>
                        </div>

                        <p className="mt-3 text-sm md:text-base leading-relaxed text-white/75 max-h-24 md:max-h-28 overflow-hidden">
                          {project.blurb}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {tags.slice(0, 14).map((t) => (
                            <span
                              key={t}
                              className={[
                                'rounded-full px-2.5 py-1 text-[11px] md:text-xs border',
                                selectedTags.has(t)
                                  ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-50/90'
                                  : 'border-white/10 bg-white/5 text-white/60',
                              ].join(' ')}
                            >
                              {tagGroup(t) === 'tag' ? tagLabel(t) : `${tagGroup(t)}:${tagLabel(t)}`}
                            </span>
                          ))}
                          {tags.length > 14 && (
                            <span className="text-xs text-white/40">+{tags.length - 14}</span>
                          )}
                        </div>

                        {project.media?.length ? (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(isActive ? project.media : project.media.filter((m) => m.kind === 'link')).slice(0, 2).map((m, idx) => (
                              <ProjectMedia key={idx} item={m} />
                            ))}
                          </div>
                        ) : null}
                        </div>
                          </div>
                          <CyberpunkBorder
                            borderWidth={isActive ? 1.5 : 1}
                            borderColor={isActive ? 'rgba(103, 232, 249, 0.4)' : 'rgba(255, 255, 255, 0.1)'}
                            hoverColor={isActive ? undefined : 'rgba(255, 255, 255, 0.2)'}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Graph (right) */}
          <div className="hidden lg:block relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center px-4 py-3">
              <TypewriterStatus
                className="text-xs uppercase tracking-widest text-white/50"
                texts={[...TYPEWRITER_TEXTS]}
              />
            </div>

            <div className="h-[76vh] pt-10">
              <ProjectsGraph3D
                projects={projects}
                activeProjectId={activeProjectId}
                activeTagSet={activeTagSet}
                onNodeClick={handleNodeClick}
              />
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="lg:hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-sm text-white/70">
            3D graph is disabled on mobile for performance. We can add a “tap to open graph” mode later.
          </div>
        </div>
      </div>
    </div>
  );
}


