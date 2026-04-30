import { fitCanvasToHost, seededRand } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let rand = seededRand(9);
    let layout = [];

    function regen() {
      rand = seededRand(Math.floor(p.millis()) ^ 0xc2b2ae35);
      layout = [];
      const blocks = 10 + Math.floor(rand() * 8);
      for (let i = 0; i < blocks; i++) {
        layout.push({
          x: rand() * 0.92,
          y: rand() * 0.9,
          w: 0.08 + rand() * 0.36,
          h: 0.06 + rand() * 0.22,
          fill: rand() > 0.55 ? 245 : 30,
          stroke: 245,
        });
      }
    }

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      regen();
    };

    p.windowResized = () => fitCanvasToHost(p, hostEl);
    p.mousePressed = () => regen();

    p.keyPressed = () => {
      if (String(p.key).toLowerCase() === "s") p.saveCanvas("poster", "png");
    };

    p.draw = () => {
      p.background(10);

      // poster margin
      const m = Math.min(p.width, p.height) * 0.06;
      p.noFill();
      p.stroke(245, 160);
      p.rect(m, m, p.width - 2 * m, p.height - 2 * m, 16);

      for (const b of layout) {
        const x = m + b.x * (p.width - 2 * m);
        const y = m + b.y * (p.height - 2 * m);
        const w = b.w * (p.width - 2 * m);
        const h = b.h * (p.height - 2 * m);
        p.fill(b.fill);
        p.stroke(245, 180);
        p.rect(x, y, w, h, 12);
      }

      p.noStroke();
      p.fill(245);
      p.textAlign(p.LEFT, p.BOTTOM);
      p.textSize(40);
      p.text("MODULAR", m, p.height - m - 38);
      p.textSize(28);
      p.text("POSTER", m, p.height - m);

      p.fill(255, 70);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);
      p.text("Click to regenerate • S to save frame", 12, 12);
    };
  };
}

