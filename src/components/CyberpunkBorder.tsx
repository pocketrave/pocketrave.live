'use client';

import { useEffect, useRef } from 'react';

/**
 * Component that adds an SVG border overlay to cyberpunk capsule shapes
 * The border perfectly follows the clip-path shape using SVG stroke
 */
export default function CyberpunkBorder({
  borderWidth = 1,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  hoverColor,
}: {
  borderWidth?: number;
  borderColor?: string;
  hoverColor?: string;
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

      // Get the sibling element with cyberpunk-capsule class to read CSS variables
      // The border component is a sibling, so we need to find the capsule element
      const parent = container.parentElement?.querySelector('.cyberpunk-capsule') as HTMLElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();

      // Get computed pixel values by creating a temporary element
      // CSS custom properties are inherited, so temp element will get parent's vars
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
      const centerOffset = getComputedPixelValue('--cp-center-offset', 14);
      const centerGap = getComputedPixelValue('--cp-center-gap', 29);
      const sideNotchOffset = getComputedPixelValue('--cp-side-notch-offset', 7);
      const sideNotchSize = getComputedPixelValue('--cp-side-notch-size', 17);

      const width = rect.width;
      const height = rect.height;

      // Generate polygon points matching the CSS clip-path exactly
      const points: Array<[number, number]> = [
        // Top edge with center notch
        [0, borderCut],
        [borderCut, 0],
        [width / 2 - borderCut - centerOffset, 0],
        [width / 2 - borderCut - centerOffset + borderCut, borderCut],
        [width / 2 - borderCut - centerOffset + borderCut + centerGap, borderCut],
        [width / 2 - borderCut - centerOffset + borderCut + centerGap + borderCut, 0],
        [width - borderCut, 0],
        [width, borderCut],
        // Right side notch
        [width, height / 2 - borderCut - sideNotchOffset],
        [width - borderCut, height / 2 - borderCut - sideNotchOffset + borderCut],
        [width - borderCut, height / 2 - borderCut - sideNotchOffset + borderCut + sideNotchSize],
        [width, height / 2 - borderCut - sideNotchOffset + borderCut + sideNotchSize + borderCut],
        // Bottom edge
        [width, height - borderCut],
        [width - borderCut, height],
        [width / 2 - borderCut - centerOffset + borderCut + centerGap + borderCut, height],
        [width / 2 - borderCut - centerOffset + borderCut + centerGap, height - borderCut],
        [width / 2 - borderCut - centerOffset + borderCut, height - borderCut],
        [width / 2 - borderCut - centerOffset, height],
        [borderCut, height],
        [0, height - borderCut],
        // Left side notch
        [0, height / 2 - borderCut - sideNotchOffset + borderCut + sideNotchSize + borderCut],
        [borderCut, height / 2 - borderCut - sideNotchOffset + borderCut + sideNotchSize],
        [borderCut, height / 2 - borderCut - sideNotchOffset + borderCut],
        [0, height / 2 - borderCut - sideNotchOffset],
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

    // Observe parent resize (the cyberpunk-capsule element)
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

