'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { Project } from '@/data/projects';
import { mixHexColors } from '@/utils/colors';

type GraphNode =
  | { id: string; kind: 'project'; label: string; color: string; val: number }
  | {
      id: string;
      kind: 'tag';
      label: string;
      color: string; // mixed base color
      val: number;
      degree: number;
      projectIds: string[]; // raw project ids (without p:)
    };

type GraphLink = { source: string; target: string };

export type ProjectsGraph3DProps = {
  projects: Project[];
  activeProjectId?: string;
  activeTagSet?: Set<string>;
  onNodeClick?: (node: { kind: 'project' | 'tag'; id: string; label: string }) => void;
};

export default function ProjectsGraph3D({
  projects,
  activeProjectId,
  activeTagSet,
  onNodeClick,
}: ProjectsGraph3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fgRef = useRef<any>(null);
  const driftBasePosRef = useRef<{ x: number; y: number; z: number } | null>(null);
  const driftLookAtRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const driftPausedUntilRef = useRef<number>(0);
  const userInteractingRef = useRef(false);
  const userInteractingUntilRef = useRef(0);

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Project nodes
    for (const p of projects) {
      nodes.push({
        id: `p:${p.id}`,
        kind: 'project',
        label: p.title,
        color: p.color,
        val: 6,
      });
    }

    // Tag nodes: include medium/role/context/year + extra tags
    const tagToProjects = new Map<string, Project[]>();
    const addTag = (tag: string, project: Project) => {
      const list = tagToProjects.get(tag) ?? [];
      list.push(project);
      tagToProjects.set(tag, list);
    };

    for (const p of projects) {
      for (const m of p.medium) addTag(`medium:${m}`, p);
      for (const r of p.role) addTag(`role:${r}`, p);
      for (const c of p.context) addTag(`context:${c}`, p);
      for (const y of p.years) addTag(`year:${y}`, p);
      for (const t of p.tags) addTag(`tag:${t}`, p);
    }

    for (const [tag, ps] of tagToProjects.entries()) {
      const base = mixHexColors(ps.map((p) => p.color));
      nodes.push({
        id: `t:${tag}`,
        kind: 'tag',
        label: tag,
        color: base,
        val: Math.min(10, 1 + ps.length),
        degree: ps.length,
        projectIds: ps.map((p) => p.id),
      });
      for (const p of ps) {
        links.push({ source: `p:${p.id}`, target: `t:${tag}` });
      }
    }

    return { nodes, links, tagToProjects };
  }, [projects]);

  // Create / update graph
  useEffect(() => {
    let destroyed = false;

    const init = async () => {
      if (!containerRef.current) return;
      const ForceGraph3D = (await import('3d-force-graph')).default;
      if (destroyed) return;

      const fg = ForceGraph3D()(containerRef.current);
      fgRef.current = fg;

      fg
        .backgroundColor('rgba(0,0,0,0)')
        .showNavInfo(false)
        // Interactive by default; we pause drift/focus while the user is interacting.
        .enableNodeDrag(true)
        .graphData({ nodes: graphData.nodes as any, links: graphData.links as any })
        .nodeLabel((n: any) => n.kind === 'tag' ? n.label : n.label)
        .nodeColor((n: any) => {
          // Default base color
          let color = n.color as string;

          // If tag filters are active, dim nodes not in active set (tags) and dim projects that don't match.
          if (activeTagSet && activeTagSet.size > 0) {
            if (n.kind === 'tag') {
              const isActive = activeTagSet.has(n.label);
              if (!isActive) color = 'rgba(120,120,140,0.25)';
            } else if (n.kind === 'project') {
              const p = projects.find((p) => `p:${p.id}` === n.id);
              if (p) {
                const tags = new Set<string>([
                  ...p.medium.map((m) => `medium:${m}`),
                  ...p.role.map((r) => `role:${r}`),
                  ...p.context.map((c) => `context:${c}`),
                  ...p.years.map((y) => `year:${y}`),
                  ...p.tags.map((t) => `tag:${t}`),
                ]);
                const matches = [...activeTagSet].every((t) => tags.has(t));
                if (!matches) color = 'rgba(120,120,140,0.15)';
              }
            }
          }

          // If a project is focused, highlight its tag neighborhood with the project color.
          if (activeProjectId) {
            const activeProject = projects.find((p) => p.id === activeProjectId);
            if (activeProject) {
              const activeTags = new Set<string>([
                ...activeProject.medium.map((m) => `medium:${m}`),
                ...activeProject.role.map((r) => `role:${r}`),
                ...activeProject.context.map((c) => `context:${c}`),
                ...activeProject.years.map((y) => `year:${y}`),
                ...activeProject.tags.map((t) => `tag:${t}`),
              ]);

              if (n.kind === 'project') {
                if (n.id === `p:${activeProjectId}`) return activeProject.color;
                return 'rgba(120,120,140,0.12)';
              }

              if (n.kind === 'tag') {
                if (activeTags.has(n.label)) {
                  // If tag belongs to multiple projects, keep mixed base (but still dim the rest).
                  // If unique to the active project, tint to the project color.
                  const degree = (n.degree as number | undefined) ?? 1;
                  return degree <= 1 ? activeProject.color : (n.color as string);
                }
                return 'rgba(120,120,140,0.18)';
              }
            }
          }

          return color;
        })
        .linkColor(() => 'rgba(180,180,220,0.10)')
        .linkWidth((l: any) => (activeProjectId ? (String(l.source.id).startsWith(`p:${activeProjectId}`) ? 1.6 : 0.4) : 0.7))
        .linkOpacity(0.6)
        .nodeRelSize(3.8)
        .d3VelocityDecay(0.35)
        .d3AlphaDecay(0.02);

      try {
        const controls = fg.controls?.();
        if (controls) {
          controls.enableZoom = true;
          controls.enablePan = true;
          controls.enableRotate = true;
        }
      } catch {
        // ignore if controls API changes
      }

      fg.onNodeClick((n: any) => {
        if (onNodeClick) onNodeClick({ kind: n.kind, id: n.id, label: n.label });
      });

      // Mark user interaction so our auto camera drift/focus doesn't fight the mouse.
      const el = containerRef.current;
      const bumpInteraction = () => {
        userInteractingRef.current = true;
        userInteractingUntilRef.current = Date.now() + 800;
      };
      const onPointerDown = () => bumpInteraction();
      const onWheel = () => bumpInteraction();
      const onPointerMove = () => {
        if (userInteractingRef.current) bumpInteraction();
      };
      el.addEventListener('pointerdown', onPointerDown, { passive: true });
      el.addEventListener('pointermove', onPointerMove, { passive: true });
      el.addEventListener('wheel', onWheel, { passive: true });

      const ro = new ResizeObserver(() => {
        const el = containerRef.current;
        if (!el || !fgRef.current) return;
        const r = el.getBoundingClientRect();
        fgRef.current.width(r.width).height(r.height);
      });
      ro.observe(containerRef.current);

      // initial sizing
      const r = containerRef.current.getBoundingClientRect();
      fg.width(r.width).height(r.height);

      // cleanup handlers on destroy
      return () => {
        try {
          el.removeEventListener('pointerdown', onPointerDown);
          el.removeEventListener('pointermove', onPointerMove);
          el.removeEventListener('wheel', onWheel);
        } catch {
          // ignore
        }
        try {
          ro.disconnect();
        } catch {
          // ignore
        }
      };
    };

    let cleanup: undefined | (() => void);
    void init().then((c) => {
      cleanup = typeof c === 'function' ? c : undefined;
    });

    return () => {
      destroyed = true;
      if (cleanup) cleanup();
      try {
        fgRef.current && fgRef.current._destructor && fgRef.current._destructor();
      } catch {
        // ignore
      }
      fgRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData.nodes, graphData.links]);

  // Camera focus on active project
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !activeProjectId) return;
    if (userInteractingRef.current && Date.now() < userInteractingUntilRef.current) return;
    const node = fg.graphData().nodes.find((n: any) => n.id === `p:${activeProjectId}`);
    if (!node) return;

    const distance = 180;
    const distRatio = 1 + distance / Math.hypot(node.x ?? 1, node.y ?? 1, node.z ?? 1);
    const base = { x: (node.x ?? 0) * distRatio, y: (node.y ?? 0) * distRatio, z: (node.z ?? 0) * distRatio };
    driftBasePosRef.current = base;
    driftLookAtRef.current = { x: node.x ?? 0, y: node.y ?? 0, z: node.z ?? 0 };

    // Pause drift during the focus animation so it doesn't fight the transition.
    driftPausedUntilRef.current = Date.now() + 700;
    fg.cameraPosition(base, node, 650);
  }, [activeProjectId]);

  // Gentle camera drift loop (ambient motion)
  useEffect(() => {
    let raf = 0;
    let last = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 33) return; // ~30fps
      last = t;

      const fg = fgRef.current;
      if (!fg) return;
      if (userInteractingRef.current && Date.now() < userInteractingUntilRef.current) return;
      if (Date.now() >= userInteractingUntilRef.current) userInteractingRef.current = false;
      if (Date.now() < driftPausedUntilRef.current) return;

      const base = driftBasePosRef.current;
      if (!base) return;

      const tt = Date.now();
      const dx = Math.sin(tt * 0.00022) * 10;
      const dy = Math.cos(tt * 0.00017) * 6;
      const dz = Math.sin(tt * 0.00019 + 1.7) * 10;

      fg.cameraPosition(
        { x: base.x + dx, y: base.y + dy, z: base.z + dz },
        driftLookAtRef.current,
        0
      );
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Update colors when focus/filter changes
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.nodeColor(fg.nodeColor());
    fg.linkWidth(fg.linkWidth());
  }, [activeProjectId, activeTagSet, projects]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {/* subtle focus vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,229,0.12),rgba(0,0,0,0)_55%)]" />
    </div>
  );
}


