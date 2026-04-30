import { fitCanvasToHost, keyToggle, seededRand } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let rand = seededRand(11);
    let trails = true;
    let energy = 0.6;

    function reseed() {
      rand = seededRand(Math.floor(p.millis()) ^ 0x27d4eb2f);
    }

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      p.background(10);
      reseed();
    };

    p.windowResized = () => fitCanvasToHost(p, hostEl);
    p.mousePressed = () => reseed();

    p.keyPressed = (e) => {
      keyToggle(e, "t", () => (trails = !trails));
      keyToggle(e, "1", () => (energy = 0.35));
      keyToggle(e, "2", () => (energy = 0.6));
      keyToggle(e, "3", () => (energy = 0.9));
    };

    p.draw = () => {
      if (!trails) p.background(10);
      else {
        p.noStroke();
        p.fill(10, 22);
        p.rect(0, 0, p.width, p.height);
      }

      const t = p.frameCount * 0.01;
      const cx = p.width / 2;
      const cy = p.height / 2;

      p.noFill();
      p.stroke(245, 170);
      p.strokeWeight(1);

      const rings = 9;
      for (let r = 0; r < rings; r++) {
        const k = (r + 1) / rings;
        const R = k * Math.min(p.width, p.height) * 0.42;
        p.beginShape();
        const steps = 160;
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * p.TWO_PI;
          const n = p.noise(Math.cos(a) * 1.2 + r * 0.2, Math.sin(a) * 1.2 + r * 0.2, t);
          const wob = (n - 0.5) * 2 * energy;
          const rr = R * (1 + wob * 0.22);
          const x = cx + Math.cos(a + t * (0.2 + k)) * rr;
          const y = cy + Math.sin(a - t * (0.18 + k * 0.6)) * rr;
          p.vertex(x, y);
        }
        p.endShape();
      }

      // interactive spotlight
      const mx = p.constrain(p.mouseX, 0, p.width);
      const my = p.constrain(p.mouseY, 0, p.height);
      p.noStroke();
      p.fill(245, 30);
      for (let i = 0; i < 26; i++) {
        const x = mx + (rand() - 0.5) * 60;
        const y = my + (rand() - 0.5) * 60;
        p.circle(x, y, 2.2);
      }

      p.noStroke();
      p.fill(255, 70);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);
      p.text("Click reseeds • T trails • 1/2/3 energy", 12, 12);
    };
  };
}

