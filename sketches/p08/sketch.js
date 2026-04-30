import { fitCanvasToHost, keyToggle } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let sim = false;

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
    };

    p.windowResized = () => fitCanvasToHost(p, hostEl);
    p.keyPressed = (e) => keyToggle(e, "a", () => (sim = !sim));

    p.draw = () => {
      p.background(10);
      p.noFill();
      p.stroke(245);
      p.strokeWeight(1.5);

      const t = p.frameCount * 0.02;
      const center = p.height * 0.55;
      p.beginShape();
      for (let x = 0; x <= p.width; x += 6) {
        const f = sim ? (Math.sin(t + x * 0.02) + Math.sin(t * 0.6 + x * 0.01)) * 0.5 : 0.05;
        const y = center + f * 120 * Math.sin(t * 1.2) * (0.4 + 0.6 * p.noise(x * 0.01, t));
        p.vertex(x, y);
      }
      p.endShape();

      p.noStroke();
      p.fill(255, 70);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);
      p.text(`Press A to toggle audio sim: ${sim ? "ON" : "OFF"}`, 12, 12);
    };
  };
}

