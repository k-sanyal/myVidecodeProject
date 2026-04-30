import { fitCanvasToHost, keyToggle, seededRand } from "/sketches/_shared.js";

export function makeSketch(ctx) {
  return (p) => {
    let hostEl;
    let rand = seededRand(7);
    let cols = 80;
    let rows = 50;
    let grid = [];
    let playing = true;

    function resizeGrid() {
      cols = Math.round(p.width / 10);
      rows = Math.round(p.height / 10);
      grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => (rand() > 0.82 ? 1 : 0)));
    }

    function step() {
      const next = grid.map((row) => row.slice());
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let n = 0;
          for (let yy = -1; yy <= 1; yy++) {
            for (let xx = -1; xx <= 1; xx++) {
              if (xx === 0 && yy === 0) continue;
              const X = (x + xx + cols) % cols;
              const Y = (y + yy + rows) % rows;
              n += grid[Y][X];
            }
          }
          const alive = grid[y][x] === 1;
          next[y][x] = alive ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
        }
      }
      grid = next;
    }

    p.setup = () => {
      hostEl = document.getElementById(ctx.hostId);
      const { w, h } = fitCanvasToHost(p, hostEl);
      p.createCanvas(w, h);
      p.pixelDensity(1);
      resizeGrid();
    };

    p.windowResized = () => {
      fitCanvasToHost(p, hostEl);
      resizeGrid();
    };

    p.mousePressed = () => {
      const x = Math.floor((p.mouseX / p.width) * cols);
      const y = Math.floor((p.mouseY / p.height) * rows);
      if (x >= 0 && x < cols && y >= 0 && y < rows) grid[y][x] = 1;
    };

    p.keyPressed = (e) => keyToggle(e, "p", () => (playing = !playing));

    p.draw = () => {
      p.background(10);
      if (playing && p.frameCount % 2 === 0) step();

      const cw = p.width / cols;
      const rh = p.height / rows;
      p.noStroke();
      p.fill(245);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y][x]) p.rect(x * cw, y * rh, cw + 0.5, rh + 0.5);
        }
      }

      p.fill(255, 70);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);
      p.text("Click to seed • P pause/play", 12, 12);
    };
  };
}

