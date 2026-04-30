import { fitCanvasToHost, keyToggle, seededRand } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let rand = seededRand(2);
    let density = 14;

    function reset() {
      rand = seededRand(Math.floor(p.millis()) ^ 0x85ebca6b);
      density = 14;
    }

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      p.textFont("ui-monospace, Menlo, Monaco, monospace");
      p.textAlign(p.CENTER, p.CENTER);
      reset();
    };

    p.windowResized = () => fitCanvasToHost(p, hostEl);

    p.mouseDragged = () => {
      const t = p.constrain(p.mouseX / p.width, 0, 1);
      density = Math.round(p.lerp(9, 24, t));
    };

    p.keyPressed = (e) => keyToggle(e, "r", reset);

    p.draw = () => {
      p.background(10);
      p.noStroke();
      p.fill(245);

      const cols = density;
      const rows = Math.round(density * (p.height / p.width));
      const cw = p.width / cols;
      const rh = p.height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * cw;
          const y = (r + 0.5) * rh;
          const n = p.noise(c * 0.18, r * 0.18, p.frameCount * 0.01);
          const ch = n > 0.55 ? "#" : n > 0.46 ? "+" : n > 0.38 ? "." : " ";
          const s = p.lerp(10, Math.min(cw, rh) * 0.95, 0.75);
          p.textSize(s);
          p.text(ch, x, y + (rand() - 0.5) * 1.2);
        }
      }

      p.fill(255, 60);
      p.rect(0, 0, p.width, 1);
      p.rect(0, p.height - 1, p.width, 1);
    };
  };
}

