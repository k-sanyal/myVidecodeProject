import { fitCanvasToHost, seededRand } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let rand = seededRand(1);
    let t = 0;

    function reseed() {
      rand = seededRand(Math.floor(p.millis()) ^ 0x9e3779b9);
    }

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      reseed();
    };

    p.windowResized = () => {
      fitCanvasToHost(p, hostEl);
    };

    p.mousePressed = () => reseed();

    p.draw = () => {
      t += 0.012;
      p.background(10);
      p.noFill();
      p.stroke(245);
      p.strokeWeight(1);

      const bias = p.constrain((p.mouseX / p.width) * 2 - 1, -1, 1);
      const lines = 54;
      for (let i = 0; i < lines; i++) {
        const y = (i + 0.5) * (p.height / lines);
        p.beginShape();
        const steps = 120;
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * p.width;
          const n = p.noise(x * 0.004, y * 0.006, t);
          const amp = 22 + 40 * n;
          const wobble = Math.sin(t * 2 + i * 0.2 + s * 0.08) * 0.6;
          const dx = bias * 10 * Math.sin(t + i * 0.08);
          const yy = y + (n - 0.5) * amp + wobble * amp + dx;
          p.vertex(x, yy);
        }
        p.endShape();
      }

      // subtle grain
      p.noStroke();
      p.fill(255, 8);
      for (let k = 0; k < 90; k++) {
        const x = rand() * p.width;
        const y = rand() * p.height;
        p.rect(x, y, 1, 1);
      }
    };
  };
}

