import { fitCanvasToHost } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let trail = [];

    function clear() {
      trail = [];
    }

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      clear();
    };

    p.windowResized = () => fitCanvasToHost(p, hostEl);
    p.mousePressed = () => clear();

    p.draw = () => {
      p.background(10);
      const pt = { x: p.mouseX, y: p.mouseY, t: p.millis() };
      if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
        trail.push(pt);
      }
      while (trail.length > 220) trail.shift();

      p.noFill();
      p.stroke(245);
      p.strokeWeight(2);
      p.beginShape();
      for (let i = 0; i < trail.length; i++) {
        const a = i / Math.max(1, trail.length - 1);
        const wob = Math.sin((p.frameCount * 0.06) + a * 14) * 10 * (1 - a);
        p.vertex(trail[i].x, trail[i].y + wob);
      }
      p.endShape();

      p.stroke(255, 70);
      p.strokeWeight(1);
      p.line(0, p.height - 1, p.width, p.height - 1);

      p.noStroke();
      p.fill(255, 70);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);
      p.text("Move to draw • Click to clear", 12, 12);
    };
  };
}

