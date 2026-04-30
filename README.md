## Portfolio (p5.js) — vanilla static site

This is a minimal black/white portfolio to showcase **11 p5.js projects**.

### Run locally

Any static server works. For example:

```bash
cd /Users/sanyal/Desktop/vibecoding
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

### Structure

- `index.html`: Home (intro + featured projects)
- `projects/index.html`: Gallery (all projects)
- `project.html`: Project detail template (loads p5 sketch by `?id=...`)
- `about.html`: About + skills/tools
- `data/projects.json`: Project metadata (titles, descriptions, sketch paths)
- `sketches/`: p5 sketches (one folder per project)
- `assets/`: images (including your main photo)

