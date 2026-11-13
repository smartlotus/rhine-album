// Album layer on top of the original archive terminal: photo markup, the
// full-screen viewer (lightbox), the contact sheet and the 2D fallback wall.
// Everything here lives outside the scaled #stage so it uses the real phone
// viewport, and it never touches the 3D scene.
import { assetUrl } from "./asset-url";
import { escapeHtml } from "./html";
import { records, volumes, photoRecordIndexes, type ArchiveRecord } from "./data";
import "./album.css";

type Size = "full" | "mid" | "thumb";
export const photoUrl = (r: ArchiveRecord, size: Size, format: "webp" | "avif" = "webp") => {
  const set = r.photo?.src[size] as { webp: string; avif?: string } | undefined;
  const path = format === "avif" ? set?.avif : set?.webp;
  return path ? assetUrl(path) : "";
};

/** <picture> with AVIF → WebP, intrinsic size and a blurred preview. */
export function pictureMarkup(r: ArchiveRecord, size: Size, opts: { alt?: string; eager?: boolean; cls?: string } = {}) {
  if (!r.photo) return "";
  const avif = photoUrl(r, size, "avif");
  const { width, height } = r.photo;
  return `<picture class="${opts.cls ?? ""}" style="--ph-color:${escapeHtml(r.photo.color)};--ph-lqip:url('${r.photo.lqip}');aspect-ratio:${width}/${height}">${avif ? `<source type="image/avif" srcset="${avif}"/>` : ""}<img src="${photoUrl(r, size)}" width="${width}" height="${height}" alt="${escapeHtml(opts.alt ?? r.title)}" ${opts.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false" onload="this.parentElement.classList.add('loaded')"/></picture>`;
}

import { ratioInfo } from "./photo-ratio";
export { ratioInfo };
/** Inline style that carries a photo's own ratio to CSS (--ar / --ar-inv). */
export const ratioStyle = (r: ArchiveRecord) => r.photo ? `--ar:${(r.photo.width / r.photo.height).toFixed(5)};--ar-inv:${(r.photo.height / r.photo.width).toFixed(5)}` : "";

const pad = (n: number, d = 3) => String(n).padStart(d, "0");
const reduced = () => document.querySelector("#stage")?.classList.contains("reduce-motion") ?? false;

type Hooks = { sound: (name: "page-open" | "page-close" | "tick" | "ui-tick" | "confirm") => void; locate: (recordIndex: number) => void };

/** Full-screen viewer. Swipe / arrows to move, double-tap or wheel to zoom. */
export class Lightbox {
  private root: HTMLElement;
  private list = photoRecordIndexes;
  private at = 0;
  private openState = false;
  private lastFocus: HTMLElement | null = null;
  private zoom = 1;
  private pan = { x: 0, y: 0 };
  private pointers = new Map<number, { x: number; y: number }>();
  private gesture: { x: number; y: number; px: number; py: number; dist: number; zoom: number; t: number } | null = null;
  private lastTap = 0;
  constructor(private hooks: Hooks) {
    this.root = document.createElement("div");
    this.root.className = "album-lightbox";
    this.root.hidden = true;
    this.root.setAttribute("role", "dialog");
    this.root.setAttribute("aria-modal", "true");
    this.root.setAttribute("aria-label", "照片查看");
    this.root.innerHTML = `<div class="lb-top"><span class="lb-path">RHINE LAB / MEMORY ARCHIVE / <b class="lb-id"></b></span><button class="lb-close" data-lb="close" aria-label="关闭">CLOSE <span>×</span></button></div>
      <div class="lb-stage"><i class="lb-corner tl"></i><i class="lb-corner tr"></i><i class="lb-corner bl"></i><i class="lb-corner br"></i><div class="lb-frame"></div><div class="lb-scan" aria-hidden="true"></div></div>
      <div class="lb-bottom"><button class="lb-nav" data-lb="prev" aria-label="上一张">←</button><div class="lb-meta"><strong class="lb-title"></strong><span class="lb-sub"></span></div><span class="lb-count"></span><button class="lb-nav" data-lb="next" aria-label="下一张">→</button></div>
      <div class="lb-actions"><button data-lb="locate">ACCESS FILE <span>在档案中查看 ↗</span></button><a class="lb-download" download>EXPORT <span>↓</span></a></div>`;
    document.body.append(this.root);
    this.root.addEventListener("click", (e) => {
      e.stopPropagation();
      const b = (e.target as Element).closest<HTMLElement>("[data-lb]");
      if (!b) return;
      const a = b.dataset.lb;
      if (a === "close") this.close();
      if (a === "prev") this.step(-1);
      if (a === "next") this.step(1);
      if (a === "locate") { const i = this.list[this.at]; this.close(); this.hooks.locate(i); }
    });
    window.addEventListener("keydown", (e) => {
      if (!this.openState) return;
      if (e.key === "Escape") this.close();
      else if (e.key === "ArrowLeft") this.step(-1);
      else if (e.key === "ArrowRight") this.step(1);
      else if (e.key === "Tab") {
        const f = [...this.root.querySelectorAll<HTMLElement>("button,a[href]")].filter((el) => el.getClientRects().length);
        const i = f.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length]?.focus();
      } else return;
      e.preventDefault();
      e.stopImmediatePropagation();
    }, true);
    const stage = this.root.querySelector<HTMLElement>(".lb-stage")!;
    stage.addEventListener("pointerdown", (e) => this.down(e));
    stage.addEventListener("pointermove", (e) => this.move(e));
    stage.addEventListener("pointerup", (e) => this.up(e));
    stage.addEventListener("pointercancel", (e) => this.up(e, true));
    stage.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.setZoom(this.zoom * Math.exp(-e.deltaY * 0.002));
    }, { passive: false });
  }
  get isOpen() { return this.openState; }
  open(recordIndex: number) {
    const at = this.list.indexOf(recordIndex);
    if (at < 0) return;
    this.lastFocus = document.activeElement as HTMLElement;
    this.at = at;
    this.openState = true;
    this.root.hidden = false;
    this.root.classList.toggle("lb-reduced", reduced());
    document.documentElement.classList.add("album-locked");
    this.render(0);
    requestAnimationFrame(() => this.root.classList.add("lb-visible"));
    this.root.querySelector<HTMLElement>(".lb-close")!.focus({ preventScroll: true });
    this.hooks.sound("page-open");
  }
  close() {
    if (!this.openState) return;
    this.openState = false;
    this.root.classList.remove("lb-visible");
    document.documentElement.classList.remove("album-locked");
    const done = () => { if (!this.openState) { this.root.hidden = true; this.root.querySelector(".lb-frame")!.replaceChildren(); } };
    if (reduced()) done(); else setTimeout(done, 380);
    this.hooks.sound("page-close");
    this.lastFocus?.focus({ preventScroll: true });
  }
  private step(d: number) {
    if (this.list.length < 2) return;
    this.at = (this.at + d + this.list.length) % this.list.length;
    this.render(d);
    this.hooks.sound("tick");
  }
  private render(direction: number) {
    const r = records[this.list[this.at]];
    this.zoom = 1; this.pan = { x: 0, y: 0 };
    const frame = this.root.querySelector<HTMLElement>(".lb-frame")!;
    const holder = document.createElement("div");
    holder.className = "lb-photo";
    holder.style.setProperty("--dir", String(direction));
    if (r.photo) { holder.style.setProperty("--ar", String(r.photo.width / r.photo.height)); holder.dataset.kind = ratioInfo(r.photo.width, r.photo.height).kind.toLowerCase(); }
    holder.innerHTML = pictureMarkup(r, "full", { eager: true });
    frame.querySelectorAll(".lb-photo").forEach((old) => {
      old.classList.add("lb-out");
      setTimeout(() => old.remove(), reduced() ? 0 : 420);
    });
    frame.append(holder);
    this.applyTransform();
    // Preload neighbours so swiping feels instant.
    for (const d of [-1, 1]) {
      const n = records[this.list[(this.at + d + this.list.length) % this.list.length]];
      const img = new Image(); img.decoding = "async"; img.src = photoUrl(n, "full");
    }
    this.root.querySelector(".lb-id")!.textContent = r.id;
    this.root.querySelector(".lb-title")!.textContent = r.title;
    const sub = [r.department, r.date].filter((v) => v && v !== "—");
    const ri = r.photo ? ratioInfo(r.photo.width, r.photo.height) : null;
    this.root.querySelector(".lb-sub")!.textContent = [r.category, ...sub, ...(ri ? [`${ri.label} ${ri.zh}`] : [])].join("  ·  ");
    this.root.querySelector(".lb-count")!.textContent = `${pad(this.at + 1)} / ${pad(this.list.length)}`;
    const dl = this.root.querySelector<HTMLAnchorElement>(".lb-download")!;
    dl.href = photoUrl(r, "full");
    dl.download = `RHINE-LAB-${r.id}.webp`;
    const scan = this.root.querySelector<HTMLElement>(".lb-scan")!;
    scan.classList.remove("run");
    void scan.offsetWidth;
    scan.classList.add("run");
  }
  private current() { return this.root.querySelector<HTMLElement>(".lb-photo:not(.lb-out)"); }
  private setZoom(z: number) {
    this.zoom = Math.min(4, Math.max(1, z));
    if (this.zoom === 1) this.pan = { x: 0, y: 0 };
    this.applyTransform();
  }
  private applyTransform() {
    const el = this.current();
    if (!el) return;
    el.style.setProperty("--zoom", String(this.zoom));
    el.style.setProperty("--pan-x", `${this.pan.x}px`);
    el.style.setProperty("--pan-y", `${this.pan.y}px`);
    el.classList.toggle("zoomed", this.zoom > 1);
  }
  private down(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...this.pointers.values()];
    const c = pts.reduce((a, p) => ({ x: a.x + p.x / pts.length, y: a.y + p.y / pts.length }), { x: 0, y: 0 });
    const dist = pts.length > 1 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0;
    this.gesture = { x: c.x, y: c.y, px: this.pan.x, py: this.pan.y, dist, zoom: this.zoom, t: performance.now() };
    this.current()?.classList.add("dragging");
  }
  private move(e: PointerEvent) {
    if (!this.pointers.has(e.pointerId) || !this.gesture) return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...this.pointers.values()];
    const c = pts.reduce((a, p) => ({ x: a.x + p.x / pts.length, y: a.y + p.y / pts.length }), { x: 0, y: 0 });
    if (pts.length > 1 && this.gesture.dist) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      this.zoom = Math.min(4, Math.max(1, this.gesture.zoom * dist / this.gesture.dist));
    }
    if (this.zoom > 1) this.pan = { x: this.gesture.px + c.x - this.gesture.x, y: this.gesture.py + c.y - this.gesture.y };
    else this.current()?.style.setProperty("--swipe", `${c.x - this.gesture.x}px`);
    this.applyTransform();
  }
  private up(e: PointerEvent, cancel = false) {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.delete(e.pointerId);
    const g = this.gesture;
    const el = this.current();
    el?.classList.remove("dragging");
    el?.style.setProperty("--swipe", "0px");
    if (this.pointers.size) {
      // Continue as a one-finger pan from the remaining pointer.
      const p = [...this.pointers.values()][0];
      this.gesture = { x: p.x, y: p.y, px: this.pan.x, py: this.pan.y, dist: 0, zoom: this.zoom, t: performance.now() };
      return;
    }
    this.gesture = null;
    if (!g || cancel) return;
    const dx = e.clientX - g.x, dy = e.clientY - g.y;
    if (this.zoom === 1 && g.dist === 0) {
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { this.step(dx < 0 ? 1 : -1); return; }
      if (dy > 110 && Math.abs(dy) > Math.abs(dx) * 1.4) { this.close(); return; }
    }
    if (Math.hypot(dx, dy) < 8 && performance.now() - g.t < 300) {
      const now = performance.now();
      if (now - this.lastTap < 320) { this.setZoom(this.zoom > 1 ? 1 : 2.2); this.lastTap = 0; }
      else this.lastTap = now;
    }
  }
}

/** Every photo at a glance, grouped by volume. */
export class ContactSheet {
  private root: HTMLElement;
  private openState = false;
  private lastFocus: HTMLElement | null = null;
  constructor(private hooks: Hooks & { view: (recordIndex: number) => void }) {
    this.root = document.createElement("div");
    this.root.className = "album-sheet";
    this.root.hidden = true;
    this.root.setAttribute("role", "dialog");
    this.root.setAttribute("aria-modal", "true");
    this.root.setAttribute("aria-label", "相册总览");
    const groups = volumes.map((v) => {
      const items = records.map((r, i) => ({ r, i })).filter(({ r }) => r.photo && r.category === v.name);
      return `<section class="sheet-volume"><header><span>${escapeHtml(v.en)}</span><strong>${escapeHtml(v.name)}</strong><i>${pad(items.length, 2)} FILES</i></header>${items.length ? `<div class="sheet-grid">${items.map(({ r, i }) => `<button class="sheet-item" data-sheet="${i}" data-kind="${ratioInfo(r.photo!.width, r.photo!.height).kind.toLowerCase()}" style="${ratioStyle(r)}" aria-label="${escapeHtml(`${r.id} ${r.title}`)}">${pictureMarkup(r, "thumb")}<span><b>${r.id}</b>${r.department !== "—" ? `<small>${escapeHtml(r.department)}</small>` : ""}</span></button>`).join("")}<i class="sheet-fill" aria-hidden="true"></i></div>` : `<p class="sheet-empty">AWAITING ARCHIVE / 待归档</p>`}</section>`;
    }).join("");
    this.root.innerHTML = `<div class="sheet-panel"><div class="lb-top"><span class="lb-path">RHINE LAB / MEMORY ARCHIVE / CONTACT SHEET</span><button class="lb-close" data-sheet-close aria-label="关闭">CLOSE <span>×</span></button></div><h2>CONTACT SHEET<small>相册总览 · ${pad(photoRecordIndexes.length)} FILES</small></h2><div class="sheet-body">${groups}</div><div class="sheet-bottom"><span>MEMORY ARCHIVE <i>●</i> CONNECTED</span><span>TAP TO VIEW</span></div></div>`;
    document.body.append(this.root);
    this.root.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target === this.root || (e.target as Element).closest("[data-sheet-close]")) return this.close();
      const item = (e.target as Element).closest<HTMLElement>("[data-sheet]");
      if (item) this.hooks.view(Number(item.dataset.sheet));
    });
    window.addEventListener("keydown", (e) => {
      if (!this.openState || document.querySelector(".album-lightbox:not([hidden])")) return;
      if (e.key === "Escape") { e.preventDefault(); e.stopImmediatePropagation(); this.close(); }
      else if (e.key === "Tab") {
        const f = [...this.root.querySelectorAll<HTMLElement>("button")];
        const i = f.indexOf(document.activeElement as HTMLElement);
        e.preventDefault(); e.stopImmediatePropagation();
        f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length]?.focus();
      } else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", "/"].includes(e.key)) {
        // Keep the archive underneath still; Enter still activates the focused button.
        e.stopImmediatePropagation();
      }
    }, true);
  }
  get isOpen() { return this.openState; }
  open() {
    this.lastFocus = document.activeElement as HTMLElement;
    this.openState = true;
    this.root.hidden = false;
    this.root.classList.toggle("lb-reduced", reduced());
    document.documentElement.classList.add("album-locked");
    requestAnimationFrame(() => this.root.classList.add("lb-visible"));
    this.root.querySelector<HTMLElement>("[data-sheet-close]")!.focus({ preventScroll: true });
    this.hooks.sound("page-open");
  }
  close() {
    if (!this.openState) return;
    this.openState = false;
    this.root.classList.remove("lb-visible");
    document.documentElement.classList.remove("album-locked");
    setTimeout(() => { if (!this.openState) this.root.hidden = true; }, reduced() ? 0 : 380);
    this.hooks.sound("page-close");
    this.lastFocus?.focus({ preventScroll: true });
  }
}

/** Without WebGL the archive terminal still works; this wall replaces the 3D array. */
export function mountFallbackWall(container: HTMLElement) {
  const photos = photoRecordIndexes.map((i) => records[i]);
  const tiles = photos.length ? Array.from({ length: Math.max(24, photos.length) }, (_, k) => photos[k % photos.length]) : [];
  container.classList.add("album-fallback");
  container.innerHTML = `<div class="fallback-wall" aria-hidden="true">${tiles.map((r, k) => `<div class="fallback-tile" style="--k:${k}">${pictureMarkup(r, "thumb", { alt: "" })}</div>`).join("")}</div>`;
}

/** ?from=jelly — arriving from the anniversary site. */
export function arrivalSource() {
  const from = new URLSearchParams(location.search).get("from");
  return from && /^[a-z0-9-]{1,24}$/i.test(from) ? from.toLowerCase() : "";
}
