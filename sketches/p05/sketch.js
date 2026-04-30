import { fitCanvasToHost, keyToggle } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let speed = 1;
    let trails = true;

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      p.background(10);
    };

    p.windowResized = () => fitCanvasToHost(p, hostEl);

    p.mouseDragged = () => {
      speed = p.lerp(0.25, 2.2, p.constrain(p.mouseX / p.width, 0, 1));
    };

    p.keyPressed = (e) => keyToggle(e, "t", () => (trails = !trails));

    p.draw = () => {
      if (!trails) p.background(10);
      else {
        p.noStroke();
        p.fill(10, 18);
        p.rect(0, 0, p.width, p.height);
      }

      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.noFill();
      p.stroke(245, 200);
      p.strokeWeight(1);

      const t = p.frameCount * 0.01 * speed;
      const rings = 5;
      for (let r = 1; r <= rings; r++) {
        const R = (Math.min(p.width, p.height) * 0.09) * r;
        p.circle(0, 0, R * 2);
        const a = t * (0.6 + r * 0.12);
        const x = Math.cos(a) * R;
        const y = Math.sin(a) * R;
        p.line(0, 0, x, y);
        p.circle(x, y, 4 + r * 0.3);
      }
      p.pop();

      p.noStroke();
      p.fill(255, 70);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);
      p.text("Drag to change speed • T toggles trails", 12, 12);
    };
  };
}

