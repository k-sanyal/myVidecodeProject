import { fitCanvasToHost, keyToggle, seededRand } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let wordIdx = 0;
    const words = ["TYPE", "POINT", "FORM"];
    let points = [];
    let particles = [];
    let rand = seededRand(4);

    function makePointsForWord(w) {
      p.background(10);
      p.clear();
      p.push();
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont("ui-sans-serif, system-ui");
      p.textSize(Math.min(p.width, p.height) * 0.28);
      points = p.font ? [] : [];
      p.pop();

      // Use pixel sampling to avoid external font loading.
      p.background(0);
      p.fill(255);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont("ui-sans-serif, system-ui");
      p.textSize(Math.min(p.width, p.height) * 0.28);
      p.text(w, p.width / 2, p.height / 2);
      p.loadPixels();

      const step = 7;
      const pts = [];
      for (let y = 0; y < p.height; y += step) {
        for (let x = 0; x < p.width; x += step) {
          const i = 4 * (y * p.width + x);
          const a = p.pixels[i + 3];
          if (a > 10) pts.push({ x, y });
        }
      }
      points = pts;
      particles = points.slice(0, 900).map((pt) => ({
        x: rand() * p.width,
        y: rand() * p.height,
        vx: 0,
        vy: 0,
        tx: pt.x,
        ty: pt.y,
      }));
    }

    function nextWord() {
      wordIdx = (wordIdx + 1) % words.length;
      makePointsForWord(words[wordIdx]);
    }

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      makePointsForWord(words[wordIdx]);
    };

    p.windowResized = () => {
      fitCanvasToHost(p, hostEl);
      makePointsForWord(words[wordIdx]);
    };

    p.keyPressed = (e) => keyToggle(e, " ", nextWord);

    p.draw = () => {
      p.background(10);
      p.noStroke();
      p.fill(245);

      const mx = p.mouseX;
      const my = p.mouseY;
      for (const pt of particles) {
        const dx = mx - pt.x;
        const dy = my - pt.y;
        const d2 = dx * dx + dy * dy;
        const repel = d2 < 120 * 120 ? -1 : 0;
        const ax = (pt.tx - pt.x) * 0.02 + repel * (dx / (Math.sqrt(d2) + 1)) * 0.8;
        const ay = (pt.ty - pt.y) * 0.02 + repel * (dy / (Math.sqrt(d2) + 1)) * 0.8;
        pt.vx = (pt.vx + ax) * 0.86;
        pt.vy = (pt.vy + ay) * 0.86;
        pt.x += pt.vx;
        pt.y += pt.vy;
        p.circle(pt.x, pt.y, 2.2);
      }

      p.fill(255, 70);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);
      p.text("Move mouse to disturb • Space to switch", 12, 12);
    };
  };
}

