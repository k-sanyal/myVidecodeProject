export function setActiveNav() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const map = {
    "/index.html": "home",
    "": "home",
    "/projects": "projects",
    "/projects/index.html": "projects",
    "/project.html": "projects",
    "/about.html": "about",
  };
  const active = map[path] ?? null;
  if (!active) return;
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const key = a.getAttribute("data-nav");
    if (key === active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

export async function loadProjects() {
  const res = await fetch("/data/projects.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load projects.json");
  const data = await res.json();
  if (!Array.isArray(data?.projects)) throw new Error("Invalid projects.json");
  return data.projects;
}

export function qs(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

export function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

