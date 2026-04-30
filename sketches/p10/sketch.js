import { fitCanvasToHost, keyToggle } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let wire = false;
    let dragging = false;
    let ax = 0.6;
    let ay = -0.6;

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl, 760);
      p.createCanvas(w, h, p.WEBGL);
      p.pixelDensity(1);
    };

    p.windowResized = () => {
      const { w, h } = fitCanvasToHost(p, hostEl, 760);
      p.resizeCanvas(w, h);
    };

    p.mousePressed = () => (dragging = true);
    p.mouseReleased = () => (dragging = false);
    p.mouseDragged = () => {
      if (!dragging) return;
      ay += (p.movedX / p.width) * 2.2;
      ax += (p.movedY / p.height) * 2.2;
    };

    p.keyPressed = (e) => keyToggle(e, "w", () => (wire = !wire));

    p.draw = () => {
      p.background(10);
      p.orbitControl(0, 0, 0); // keep minimal manual control (we handle drag)
      p.rotateX(ax);
      p.rotateY(ay);

      const s = Math.min(p.width, p.height) * 0.12;
      const layers = 6;
      for (let i = 0; i < layers; i++) {
        const t = p.frameCount * 0.01 + i * 0.5;
        p.push();
        p.rotateY(t * 0.6);
        p.rotateX(t * 0.4);
        const k = 1 + i * 0.65;
        if (wire) {
          p.noFill();
          p.stroke(245, 190);
          p.strokeWeight(1);
        } else {
          p.noStroke();
          p.fill(245, 18 + i * 10);
        }
        p.box(s * k, s * 0.55, s * 0.22);
        p.pop();
      }

      // overlay text in screen space
      p.resetMatrix();
      p.translate(-p.width / 2, -p.height / 2);
      p.noStroke();
      p.fill(255, 70);
      p.textSize(12);
      p.textAlign(p.LEFT, p.TOP);
      p.text("Drag to orbit • W toggles wireframe", 12, 12);
    };
  };
}

