import { fitCanvasToHost } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let zoom = 1;
    let mode = 0;

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      p.noiseDetail(3, 0.55);
    };

    p.windowResized = () => fitCanvasToHost(p, hostEl);
    p.mousePressed = () => (mode = (mode + 1) % 2);

    p.mouseWheel = (e) => {
      const d = Math.sign(e.deltaY);
      zoom = p.constrain(zoom * (d > 0 ? 0.92 : 1.08), 0.55, 2.2);
      return false;
    };

    p.draw = () => {
      p.background(10);
      p.noStroke();

      const t = p.frameCount * 0.01;
      const step = Math.max(4, Math.floor(10 / zoom));
      const scale = 0.012 * zoom;

      for (let y = 0; y < p.height; y += step) {
        for (let x = 0; x < p.width; x += step) {
          const n = p.noise(x * scale, y * scale, t);
          const h = (n - 0.5) * 2;
          const shade = mode === 0 ? 180 + 70 * n : 245 - 170 * Math.abs(h);
          const a = mode === 0 ? 255 : 220;
          p.fill(shade, a);
          const yy = y + h * (12 + 22 * zoom);
          p.rect(x, yy, step + 1, step + 1);
        }
      }

      // highlight line
      p.stroke(255, 70);
      p.noFill();
      p.rect(0.5, 0.5, p.width - 1, p.height - 1);
    };
  };
}

