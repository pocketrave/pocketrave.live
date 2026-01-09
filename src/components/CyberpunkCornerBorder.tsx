'use client';

import { useEffect, useRef } from 'react';

/**
 * Component that adds an SVG border overlay with ONLY corner cuts (no notches)
 * Used for selection frames
 */
export default function CyberpunkCornerBorder({
  borderWidth = 2,
  borderColor = 'rgba(0, 217, 255, 0.6)',
}: {
  borderWidth?: number;
  borderColor?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !polygonRef.current) return;

    const updateSVG = () => {
      const container = containerRef.current;
      const svg = svgRef.current;
      const polygon = polygonRef.current;
      if (!container || !svg || !polygon) return;

      // Get the sibling element with cyberpunk-selection-frame class to read CSS variables
      const parent = container.parentElement?.querySelector('.cyberpunk-selection-frame') as HTMLElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();

      // Get computed pixel values by creating a temporary element
      const getComputedPixelValue = (varName: string, defaultValue: number): number => {
        const temp = document.createElement('div');
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        temp.style.width = `var(${varName})`;
        temp.style.pointerEvents = 'none';
        parent.appendChild(temp);
        
        const computed = getComputedStyle(temp).width;
        parent.removeChild(temp);
        
        const pxMatch = computed.match(/([\d.]+)px/);
        const result = pxMatch ? parseFloat(pxMatch[1]) : defaultValue;
        return result;
      };

      // Get computed CSS variable values as pixels
      const borderCut = getComputedPixelValue('--border-cut', 15);

      const width = rect.width;
      const height = rect.height;

      // Generate polygon points with ONLY corner cuts (no notches)
      // Match the item's corner points exactly
      const points: Array<[number, number]> = [
        // Top-left corner cut (start at left edge, then top edge)
        [0, borderCut],
        [borderCut, 0],
        // Top-right corner cut
        [width - borderCut, 0],
        [width, borderCut],
        // Bottom-right corner cut
        [width, height - borderCut],
        [width - borderCut, height],
        // Bottom-left corner cut
        [borderCut, height],
        [0, height - borderCut],
      ];

      const pointsString = points.map(([x, y]) => `${x},${y}`).join(' ');

      // Update SVG
      svg.setAttribute('width', width.toString());
      svg.setAttribute('height', height.toString());
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      
      polygon.setAttribute('points', pointsString);
      polygon.setAttribute('stroke', borderColor);
      polygon.setAttribute('stroke-width', borderWidth.toString());
      polygon.setAttribute('fill', 'none');
    };

    // Initial update
    const timeoutId = setTimeout(updateSVG, 0);

    // Observe parent resize (the cyberpunk-selection-frame element)
    const observer = new ResizeObserver(updateSVG);
    const parent = containerRef.current?.parentElement;
    if (parent) {
      observer.observe(parent);
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [borderWidth, borderColor]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <polygon ref={polygonRef} />
      </svg>
    </div>
  );
}

