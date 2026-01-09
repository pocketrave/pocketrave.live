function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function hexToRgb(hex: string) {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = Number.parseInt(full, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  const to = (x: number) => Math.round(x).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function mixHexColors(hexes: string[]) {
  if (hexes.length === 0) return '#ffffff';
  const rgbs = hexes.map(hexToRgb);
  const sum = rgbs.reduce(
    (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
    { r: 0, g: 0, b: 0 }
  );
  return rgbToHex(sum.r / rgbs.length, sum.g / rgbs.length, sum.b / rgbs.length);
}

// Mix two colors with a weight in [0..1]
export function lerpHex(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const k = clamp01(t);
  return rgbToHex(A.r + (B.r - A.r) * k, A.g + (B.g - A.g) * k, A.b + (B.b - A.b) * k);
}


