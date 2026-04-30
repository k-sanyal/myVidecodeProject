export function fitCanvasToHost(p, hostEl, maxH = 720) {
  const rect = hostEl.getBoundingClientRect();
  const w = Math.max(320, Math.floor(rect.width));
  const h = Math.max(320, Math.min(maxH, Math.floor(rect.width * 0.62)));
  p.resizeCanvas(w, h);
  return { w, h };
}

export function seededRand(seed) {
  let s = (seed >>> 0) || 1;
  return () => {
    // xorshift32
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) / 4294967296);
  };
}

export function keyToggle(e, key, fn) {
  if (String(e.key).toLowerCase() === String(key).toLowerCase()) fn();
}

