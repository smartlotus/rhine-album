// Time archive cabinet (时间档案柜) + operator file cards (干员档案卡).
// The default home of the album: a 2.5D Rhine Lab filing cabinet built from
// DOM + CSS transforms (no WebGL, no models). Every volume in
// content/album.json is one drawer; opening a drawer pulls its photos out as
// archive sheets at their own aspect ratio; a sheet opens as an operator file
// card with a draw-and-flip reveal. Animations only move transform / opacity.
import { records, volumes, photoRecordIndexes, type ArchiveRecord } from "./data";
import { pictureMarkup, photoUrl, ratioInfo, ratioStyle, upgradeToFull } from "./album";
import { escapeHtml } from "./html";
import { logo } from "./brand";
import "./cabinet.css";

type Sound = "page-open" | "page-close" | "tick" | "ui-tick" | "confirm" | "open" | "back" | "scan" | "inspect";
export type CabinetHooks = {
  sound: (name: Sound) => void;
  /** Full-screen viewer (zoom / swipe). */
  view: (index: number) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  /** Keep the terminal's current selection in step (search, keyboard). */
  focus: (index: number) => void;
  /** Motion off (system setting or the site's own preference). */
  reduced: () => boolean;
};
export type CabinetFx = "full" | "lite";

const pad = (n: number, d = 3) => String(n).padStart(d, "0");
const filled = (v?: string) => !!v && v.trim() !== "" && v !== "—";
const ease = "cubic-bezier(.2,.8,.2,1)";

type Drawer = { no: number; name: string; en: string; period: string; note: string; files: number[] };
const drawers: Drawer[] = volumes.map((v, i) => ({
  no: i + 1, ...v,
  files: records.map((r, idx) => ({ r, idx })).filter(({ r }) => r.category === v.name).map(({ idx }) => idx),
}));
const photosOf = (d: Drawer) => d.files.filter((i) => records[i].photo);
const drawerOf = (index: number) => drawers.find((d) => d.files.includes(index)) ?? drawers[0];

function drawerFace(d: Drawer) {
  const photos = photosOf(d);
  const prints = photos.slice(0, 3).map((i, k) => `<span class="cd-print" style="${ratioStyle(records[i])};--k:${k}">${pictureMarkup(records[i], "thumb", { alt: "" })}</span>`).join("");
  return `<button class="cab-drawer" data-drawer="${d.no - 1}" style="--i:${d.no - 1}" aria-label="${escapeHtml(`打开 ${d.name}，${photos.length} 张照片`)}">
    <span class="cd-face">
      <span class="cd-no" aria-hidden="true">${pad(d.no, 2)}</span>
      <span class="cd-label"><b>${escapeHtml(d.en)}</b><strong>${escapeHtml(d.name)}</strong>${d.period ? `<small>${escapeHtml(d.period)}</small>` : ""}</span>
      <span class="cd-window" aria-hidden="true">${prints || '<span class="cd-empty">EMPTY</span>'}</span>
      <span class="cd-count"><b>${pad(photos.length, 2)}</b>FILES</span>
      <span class="cd-handle" aria-hidden="true"><i></i></span>
    </span>
  </button>`;
}

function sheetMarkup(index: number, k: number) {
  const r = records[index];
  const info = ratioInfo(r.photo!.width, r.photo!.height);
  return `<button class="dv-sheet" data-card="${index}" data-kind="${info.kind.toLowerCase()}" style="${ratioStyle(r)};--k:${k}" aria-label="${escapeHtml(`档案 ${r.id}`)}">
    <span class="ds-paper"><span class="ds-photo">${pictureMarkup(r, "mid", { alt: r.title, eager: k < 2 })}<i class="ds-mark tl"></i><i class="ds-mark br"></i></span>
    <span class="ds-meta"><b>${r.id}</b>${filled(r.department) ? `<span>${escapeHtml(r.department)}</span>` : ""}<em>${info.label}</em></span></span>
  </button>`;
}

export class Cabinet {
  readonly root: HTMLElement;
  private drawerView: HTMLElement;
  private cardView: HTMLElement;
  private openDrawerIndex = -1;
  private cardIndex = -1;
  private cardFrom: HTMLElement | null = null;
  private busy = false;
  private fxAuto = true;
  private slowProbes = 0;
  private probeFrames: number[] = [];
  private lastFocus: HTMLElement | null = null;
  private pointer: { id: number; x: number; y: number; t: number } | null = null;
  private visibleState = false;

  constructor(host: HTMLElement, private hooks: CabinetHooks) {
    this.root = document.createElement("div");
    this.root.className = "cab";
    this.root.hidden = true;
    this.root.dataset.fx = "full";
    this.root.style.setProperty("--n", String(drawers.length));
    const total = photoRecordIndexes.length;
    this.root.innerHTML = `
    <div class="cab-home">
      <header class="cab-bar">
        <div class="cab-brand"><span class="cab-logo">${logo}</span><div><b>RHINE LAB</b><small>MEMORY ARCHIVE</small></div></div>
        <nav class="cab-nav" aria-label="档案柜导航">
          <button data-action="search" aria-label="检索档案"><span aria-hidden="true">⌕</span><em>检索</em></button>
          <button data-action="saved" aria-label="收藏档案"><span aria-hidden="true">＋</span><em>收藏</em><i class="cab-saved" hidden>00</i></button>
          <button data-action="album" aria-label="相册总览"><span aria-hidden="true">▦</span><em>总览</em></button>
          <button data-action="settings" aria-label="系统设置"><span aria-hidden="true">◷</span><em>设置</em></button>
        </nav>
      </header>
      <main class="cab-main">
        <section class="cab-hero">
          <div class="cab-kicker">INTERNAL DATABASE <i>／</i> TIME ARCHIVE</div>
          <h1><span>TIME ARCHIVE</span><span>CABINET</span></h1>
          <p class="cab-cn">时间档案柜 <i>·</i> 每个抽屉是一段时光</p>
          <dl class="cab-stats"><div><dt>FILES</dt><dd>${pad(total)}</dd></div><div><dt>DRAWERS</dt><dd>${pad(drawers.length, 2)}</dd></div><div><dt>STATUS</dt><dd><i></i>AUTHORIZED</dd></div></dl>
          <p class="cab-tip"><i></i>轻点抽屉，取出这段时间的照片</p>
        </section>
        <section class="cab-unit" aria-label="时间档案柜">
          <div class="cab-cap"><span>RL / ARCHIVE CABINET</span><span>${pad(drawers.length, 2)} DRAWERS · ${pad(total)} FILES</span></div>
          <div class="cab-body">${drawers.map(drawerFace).join("")}</div>
          <div class="cab-plinth"><span>RHINE LAB.LLC.</span><i></i><span>PROPERTY OF MEMORY ARCHIVE</span></div>
        </section>
      </main>
      <footer class="cab-foot"><span>界面、动效与配乐来自 <a href="https://github.com/LBEILC/RhineLabUI" target="_blank" rel="noopener">RhineLabUI ↗</a> © 路北路陈 LBEILC（MIT）· 《明日方舟》及莱茵生命相关设定归鹰角网络所有，本站为非官方同人改作</span><button data-action="replay">REINITIALIZE ↻</button></footer>
    </div>
    <section class="cab-drawer-view" hidden role="dialog" aria-modal="true" aria-label="抽屉">
      <header class="dv-head">
        <button class="dv-back" data-cab="close-drawer" aria-label="返回档案柜">← <span>CABINET</span></button>
        <div class="dv-title"><span class="dv-no"></span><div><b class="dv-en"></b><strong class="dv-name"></strong><small class="dv-period"></small></div></div>
        <div class="dv-step"><button data-cab="prev-drawer" aria-label="上一个抽屉">‹</button><span class="dv-pos"></span><button data-cab="next-drawer" aria-label="下一个抽屉">›</button></div>
      </header>
      <div class="dv-body"><p class="dv-note" hidden></p><div class="dv-sheets"></div><div class="dv-end">END OF DRAWER <i></i></div></div>
    </section>
    <section class="op-view" hidden role="dialog" aria-modal="true" aria-label="档案卡">
      <div class="op-top"><button class="op-return" data-cab="close-card" aria-label="返回">← <span>BACK</span></button><span class="op-path">RHINE LAB / OPERATOR FILE / <b class="op-id"></b></span><span class="op-count"></span></div>
      <div class="op-stage">
        <div class="op-cardcol"><div class="op-card">
          <div class="op-face op-front"><button class="op-photo" data-cab="view" aria-label="全屏查看"></button></div>
          <div class="op-face op-back" aria-hidden="true"><div class="ob-stripes"></div><div class="ob-logo">${logo}</div><b>MEMORY FILE</b><span class="ob-id"></span><small>RHINE LAB · CLASSIFIED</small></div>
        </div></div>
        <article class="op-file"></article>
      </div>
      <div class="op-bar">
        <button data-cab="card-prev" aria-label="上一张">‹</button>
        <button data-cab="save" class="op-save"><span>＋</span><em>收藏</em></button>
        <button data-cab="view"><span>⤢</span><em>全屏</em></button>
        <a class="op-export" download><span>↓</span><em>导出</em></a>
        <button data-cab="card-next" aria-label="下一张">›</button>
      </div>
    </section>`;
    host.append(this.root);
    this.drawerView = this.root.querySelector(".cab-drawer-view")!;
    this.cardView = this.root.querySelector(".op-view")!;
    this.root.addEventListener("click", (e) => this.click(e));
    window.addEventListener("keydown", (e) => this.key(e), true);
    const photo = this.cardView.querySelector<HTMLElement>(".op-photo")!;
    photo.addEventListener("pointerdown", (e) => { this.pointer = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() }; });
    photo.addEventListener("pointerup", (e) => {
      const p = this.pointer;
      this.pointer = null;
      if (!p || p.id !== e.pointerId) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) { this.swiped = true; this.stepCard(dx < 0 ? 1 : -1); }
    });
    this.updateSaved();
  }
  private swiped = false;
  get visible() { return this.visibleState; }
  get state() {
    return { visible: this.visibleState, drawer: this.openDrawerIndex, card: this.cardIndex >= 0 ? records[this.cardIndex].id : null, busy: this.busy, fx: this.root.dataset.fx, slowProbes: this.slowProbes, drawers: drawers.length };
  }
  /** Quality tier: "lite" drops shadows, glints and depth; set from the render presets. */
  setFx(fx: CabinetFx, auto: boolean) {
    this.fxAuto = auto;
    if (!auto || fx === "lite") this.root.dataset.fx = fx;
    else if (this.slowProbes < 2) this.root.dataset.fx = "full";
  }
  setInert(inert: boolean) { this.root.inert = inert; }
  updateSaved() {
    const count = records.filter((r) => this.hooks.isSaved(r.id)).length;
    this.root.querySelectorAll<HTMLElement>(".cab-saved").forEach((el) => { el.textContent = pad(count, 2); el.hidden = count === 0; });
    if (this.cardIndex >= 0) {
      const on = this.hooks.isSaved(records[this.cardIndex].id);
      const b = this.cardView.querySelector<HTMLElement>(".op-save")!;
      b.setAttribute("aria-pressed", String(on));
      b.querySelector("span")!.textContent = on ? "✓" : "＋";
      b.querySelector("em")!.textContent = on ? "已收藏" : "收藏";
    }
  }
  show(entrance: boolean) {
    if (this.visibleState) return;
    this.visibleState = true;
    this.root.hidden = false;
    this.root.classList.toggle("cab-entering", entrance && !this.hooks.reduced());
    if (entrance && !this.hooks.reduced()) {
      const unit = this.root.querySelector<HTMLElement>(".cab-unit")!;
      unit.style.setProperty("--scan-h", `${unit.offsetHeight}px`);
      this.probe(1400);
      setTimeout(() => this.root.classList.remove("cab-entering"), 1600);
    }
  }
  hide() {
    this.visibleState = false;
    this.root.hidden = true;
    this.closeCard(true);
    this.closeDrawer(true);
  }

  // ---------- drawers ----------
  openDrawer(i: number, from?: HTMLElement) {
    if (i < 0 || i >= drawers.length) return;
    const d = drawers[i];
    const switching = this.openDrawerIndex >= 0;
    this.openDrawerIndex = i;
    const v = this.drawerView;
    v.querySelector(".dv-no")!.textContent = pad(d.no, 2);
    v.querySelector(".dv-en")!.textContent = d.en;
    v.querySelector(".dv-name")!.textContent = d.name;
    const period = v.querySelector<HTMLElement>(".dv-period")!;
    period.textContent = d.period;
    period.hidden = !d.period;
    v.querySelector(".dv-pos")!.textContent = `${pad(d.no, 2)} / ${pad(drawers.length, 2)}`;
    const note = v.querySelector<HTMLElement>(".dv-note")!;
    note.textContent = d.note;
    note.hidden = !d.note;
    const photos = photosOf(d);
    v.querySelector(".dv-sheets")!.innerHTML = photos.length
      ? photos.map(sheetMarkup).join("") + '<i class="dv-fill" aria-hidden="true"></i>'
      : `<div class="dv-empty"><strong>AWAITING ARCHIVE</strong><span>这个抽屉暂时没有照片</span></div>`;
    v.querySelector(".dv-body")!.scrollTop = 0;
    v.scrollTop = 0;
    const reduced = this.hooks.reduced();
    if (!switching) {
      this.lastFocus = from ?? (document.activeElement as HTMLElement);
      v.hidden = false;
      this.root.querySelector<HTMLElement>(".cab-home")!.inert = true;
      v.classList.remove("dv-in");
      if (!reduced && from) {
        // The drawer face slides out toward the viewer, then the sheets are pulled out of it.
        from.classList.add("cd-pulled");
        setTimeout(() => from.classList.remove("cd-pulled"), 700);
        const r = from.getBoundingClientRect();
        v.style.setProperty("--from-y", `${Math.round(r.top + r.height / 2 - innerHeight / 2)}px`);
      } else v.style.setProperty("--from-y", "0px");
      void v.offsetWidth;
      v.classList.add("dv-in");
      v.querySelector<HTMLElement>(".dv-back")!.focus({ preventScroll: true });
    } else {
      v.classList.remove("dv-swap");
      void v.offsetWidth;
      v.classList.add("dv-swap");
    }
    v.classList.toggle("dv-reduced", reduced);
    if (!reduced) this.probe(900);
    this.hooks.sound(switching ? "tick" : "open");
  }
  closeDrawer(instant = false) {
    if (this.openDrawerIndex < 0) return;
    const i = this.openDrawerIndex;
    this.openDrawerIndex = -1;
    const v = this.drawerView;
    this.root.querySelector<HTMLElement>(".cab-home")!.inert = false;
    const done = () => { if (this.openDrawerIndex < 0) { v.hidden = true; v.classList.remove("dv-out", "dv-in", "dv-swap"); v.querySelector(".dv-sheets")!.replaceChildren(); } };
    if (instant || this.hooks.reduced()) done();
    else { v.classList.add("dv-out"); setTimeout(done, 320); }
    if (!instant) {
      this.hooks.sound("back");
      const face = this.root.querySelector<HTMLElement>(`[data-drawer="${i}"]`);
      (face ?? this.lastFocus)?.focus({ preventScroll: true });
    }
  }

  // ---------- operator file card ----------
  openCard(index: number, from?: HTMLElement | null) {
    const r = records[index];
    if (!r) return;
    this.hooks.focus(index);
    const opening = this.cardIndex < 0;
    this.cardIndex = index;
    this.cardFrom = from ?? null;
    this.renderCard(0);
    const v = this.cardView;
    if (!opening) return;
    v.hidden = false;
    this.drawerView.inert = true;
    this.root.querySelector<HTMLElement>(".cab-home")!.inert = true;
    v.querySelector<HTMLElement>(".op-stage")!.scrollTop = 0;
    v.scrollTop = 0;
    const reduced = this.hooks.reduced();
    v.classList.toggle("op-reduced", reduced);
    v.classList.remove("op-in", "op-out", "op-revealed");
    void v.offsetWidth;
    v.classList.add("op-in");
    v.querySelector<HTMLElement>(".op-return")!.focus({ preventScroll: true });
    if (reduced) { v.classList.add("op-revealed"); this.hooks.sound("page-open"); return; }
    this.drawCard(from ?? null);
  }
  /** 抽卡: the sheet lifts off, turns to its back (Rhine Lab file cover), flies to the centre and flips face-up. */
  private drawCard(from: HTMLElement | null) {
    const card = this.cardView.querySelector<HTMLElement>(".op-card")!;
    const end = card.getBoundingClientRect();
    let start = from?.querySelector(".ds-photo")?.getBoundingClientRect() ?? from?.getBoundingClientRect();
    if (!start || !start.width) start = new DOMRect(end.left + end.width * 0.3, innerHeight, end.width * 0.4, end.height * 0.4);
    const dx = start.left + start.width / 2 - (end.left + end.width / 2);
    const dy = start.top + start.height / 2 - (end.top + end.height / 2);
    const s = Math.max(0.2, start.width / Math.max(1, end.width));
    const lift = Math.min(60, innerHeight * 0.06);
    this.busy = true;
    this.hooks.sound("inspect");
    const lite = this.root.dataset.fx === "lite";
    const anim = card.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotateY(0deg)` },
      { transform: `translate(${dx * 0.35}px, ${dy * 0.35 - lift}px) scale(${Math.max(s, 0.62)}) rotateY(180deg)`, offset: 0.42 },
      { transform: `translate(0, ${-lift * 0.4}px) scale(${lite ? 1 : 1.03}) rotateY(180deg)`, offset: 0.62 },
      { transform: "translate(0, 0) scale(1) rotateY(360deg)" },
    ], { duration: lite ? 760 : 980, easing: ease, fill: "backwards" });
    this.probe(1000);
    setTimeout(() => this.hooks.sound("page-open"), lite ? 480 : 620);
    anim.finished.then(() => {
      this.busy = false;
      this.cardView.classList.add("op-revealed");
      this.hooks.sound("scan");
    }, () => { this.busy = false; this.cardView.classList.add("op-revealed"); });
  }
  closeCard(instant = false) {
    if (this.cardIndex < 0) return;
    const index = this.cardIndex;
    this.cardIndex = -1;
    const v = this.cardView;
    this.drawerView.inert = false;
    this.root.querySelector<HTMLElement>(".cab-home")!.inert = this.openDrawerIndex >= 0;
    const done = () => { if (this.cardIndex < 0) { v.hidden = true; v.classList.remove("op-in", "op-out", "op-revealed"); v.querySelector(".op-photo")!.replaceChildren(); } };
    if (instant || this.hooks.reduced()) done();
    else { v.classList.add("op-out"); setTimeout(done, 300); }
    if (instant) return;
    this.hooks.sound("page-close");
    // Return focus to the sheet of this file when its drawer is open.
    const sheet = this.drawerView.querySelector<HTMLElement>(`[data-card="${index}"]`) ?? this.cardFrom;
    sheet?.focus({ preventScroll: true });
  }
  private stepCard(d: number) {
    if (this.cardIndex < 0 || this.busy) return;
    const list = photoRecordIndexes;
    if (list.length < 2) return;
    const at = list.indexOf(this.cardIndex);
    const next = list[((at < 0 ? 0 : at) + d + list.length) % list.length];
    this.hooks.focus(next);
    this.cardIndex = next;
    this.renderCard(d);
    this.hooks.sound("tick");
    // Follow along in the open drawer underneath.
    if (this.openDrawerIndex >= 0) {
      const di = drawers.indexOf(drawerOf(next));
      if (di !== this.openDrawerIndex) this.openDrawer(di);
    }
  }
  private renderCard(direction: number) {
    const r = records[this.cardIndex];
    const v = this.cardView;
    const d = drawerOf(this.cardIndex);
    const photo = r.photo;
    const info = photo ? ratioInfo(photo.width, photo.height) : null;
    const pos = photoRecordIndexes.indexOf(this.cardIndex);
    v.querySelector(".op-id")!.textContent = r.id;
    v.querySelector(".ob-id")!.textContent = r.id;
    v.querySelector(".op-count")!.textContent = pos >= 0 ? `${pad(pos + 1)} / ${pad(photoRecordIndexes.length)}` : "";
    const card = v.querySelector<HTMLElement>(".op-card")!;
    card.setAttribute("style", photo ? ratioStyle(r) : "--ar:0.75;--ar-inv:1.3333");
    card.dataset.kind = info?.kind.toLowerCase() ?? "empty";
    const holder = v.querySelector<HTMLElement>(".op-photo")!;
    holder.innerHTML = photo
      ? `${pictureMarkup(r, "mid", { eager: true, alt: r.title })}<i class="oc tl"></i><i class="oc tr"></i><i class="oc bl"></i><i class="oc br"></i><span class="op-badge"><i></i>${r.id}</span><span class="op-ratio">${info!.label}</span><span class="op-glint" aria-hidden="true"></span>`
      : `<span class="op-awaiting"><strong>AWAITING ARCHIVE</strong><span>此档案暂无照片</span></span>`;
    if (photo) upgradeToFull(holder, r);
    const missing: string[] = [];
    const row = (k: string, en: string, value: string, wide = false) => `<div class="of-row of-reveal${wide ? " wide" : ""}"><dt>${en}<span>${k}</span></dt><dd>${value}</dd></div>`;
    const rows = [
      row("编号", "FILE NO.", `<b class="of-mono">${r.id}</b>`),
      row("抽屉", "DRAWER", `${escapeHtml(d.en)} · ${escapeHtml(d.name)}${d.period ? `<small>${escapeHtml(d.period)}</small>` : ""}`),
    ];
    if (filled(r.department)) rows.push(row("日期", "DATE", escapeHtml(r.department))); else missing.push("日期");
    if (filled(r.date)) rows.push(row("地点", "PLACE", escapeHtml(r.date))); else missing.push("地点");
    if (photo && info) {
      rows.push(row("画幅", "FORMAT", `${info.kind} · ${info.label} ${info.zh}`));
      rows.push(row("尺寸", "SIZE", `${photo.width} × ${photo.height}`));
    }
    if (!r.tags.length) missing.push("标签");
    if (!filled(r.abstract)) missing.push("说明");
    if (!r.findings.length) missing.push("备注");
    v.querySelector(".op-file")!.innerHTML = `
      <header class="of-head of-reveal">
        <div class="of-code"><small>OPERATOR FILE</small><b>${r.id}</b></div>
        <div class="of-name"><strong>${escapeHtml(r.title)}</strong><span>${escapeHtml(r.en)}</span></div>
        <span class="of-logo" aria-hidden="true">${logo}</span>
      </header>
      <div class="of-class of-reveal"><span>FACTION</span><b>RHINE LAB</b><span>CLEARANCE</span><b>${escapeHtml(r.clearance)}</b></div>
      <dl class="of-stats">${rows.join("")}</dl>
      ${r.tags.length ? `<div class="of-block of-reveal"><div class="of-label">TAGS / 标签</div><div class="of-tags">${r.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div></div>` : ""}
      ${filled(r.abstract) ? `<div class="of-block of-reveal"><div class="of-label">CAPTION / 说明</div>${r.abstract.split(/\n+/).map((l) => `<p>${escapeHtml(l)}</p>`).join("")}</div>` : ""}
      ${r.findings.length ? `<div class="of-block of-reveal"><div class="of-label">NOTES / 备注</div><ol>${r.findings.map((f, i) => `<li><span>${pad(i + 1, 2)}</span>${escapeHtml(f)}</li>`).join("")}</ol></div>` : ""}
      ${photo && missing.length ? `<p class="of-missing of-reveal"><span>PENDING</span>待补充：${missing.join(" · ")}</p>` : ""}
      <div class="of-foot"><span>RHINE LAB · MEMORY ARCHIVE</span><span>${pos >= 0 ? `${pad(pos + 1)} / ${pad(photoRecordIndexes.length)}` : ""}</span></div>`;
    v.querySelectorAll<HTMLElement>(".of-reveal").forEach((el, k) => el.style.setProperty("--d", `${k * 55}ms`));
    const dl = v.querySelector<HTMLAnchorElement>(".op-export")!;
    dl.hidden = !photo;
    if (photo) { dl.href = photoUrl(r, "full"); dl.download = `RHINE-LAB-${r.id}.webp`; }
    this.updateSaved();
    if (direction && !this.hooks.reduced()) {
      card.animate([{ transform: `translateX(${direction * 36}px)`, opacity: 0.2 }, { transform: "none", opacity: 1 }], { duration: 300, easing: ease });
      v.classList.remove("op-revealed");
      void v.offsetWidth;
      v.classList.add("op-revealed");
    }
  }

  // ---------- input ----------
  private click(e: MouseEvent) {
    const t = e.target as Element;
    const drawer = t.closest<HTMLElement>("[data-drawer]");
    if (drawer) { this.openDrawer(Number(drawer.dataset.drawer), drawer); return; }
    const sheet = t.closest<HTMLElement>("[data-card]");
    if (sheet) { this.openCard(Number(sheet.dataset.card), sheet); return; }
    const b = t.closest<HTMLElement>("[data-cab]");
    if (!b) return;
    const a = b.dataset.cab;
    if (a === "close-drawer") this.closeDrawer();
    else if (a === "prev-drawer") this.openDrawer((this.openDrawerIndex - 1 + drawers.length) % drawers.length);
    else if (a === "next-drawer") this.openDrawer((this.openDrawerIndex + 1) % drawers.length);
    else if (a === "close-card") this.closeCard();
    else if (a === "card-prev") this.stepCard(-1);
    else if (a === "card-next") this.stepCard(1);
    else if (a === "save" && this.cardIndex >= 0) { this.hooks.toggleSave(records[this.cardIndex].id); this.updateSaved(); }
    else if (a === "view" && this.cardIndex >= 0 && records[this.cardIndex].photo) {
      if (this.swiped) { this.swiped = false; return; }
      this.hooks.view(this.cardIndex);
    }
  }
  private key(e: KeyboardEvent) {
    if (!this.visibleState || e.defaultPrevented) return;
    if (document.querySelector(".album-lightbox:not([hidden]), .album-sheet:not([hidden]), #modal-root .modal-backdrop")) return;
    if (e.target instanceof HTMLInputElement) return;
    let handled = true;
    if (this.cardIndex >= 0) {
      if (e.key === "Escape" || e.key === "Backspace") this.closeCard();
      else if (e.key === "ArrowLeft") this.stepCard(-1);
      else if (e.key === "ArrowRight") this.stepCard(1);
      else handled = false;
    } else if (this.openDrawerIndex >= 0) {
      if (e.key === "Escape" || e.key === "Backspace") this.closeDrawer();
      else if (e.key === "ArrowLeft") this.openDrawer((this.openDrawerIndex - 1 + drawers.length) % drawers.length);
      else if (e.key === "ArrowRight") this.openDrawer((this.openDrawerIndex + 1) % drawers.length);
      else if (e.key === "ArrowDown" || e.key === "ArrowUp") this.moveFocus(".dv-sheet", e.key === "ArrowDown" ? 1 : -1);
      else handled = false;
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.moveFocus(".cab-drawer", e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1);
    } else if (e.key === "Enter" && !(document.activeElement instanceof HTMLButtonElement || document.activeElement instanceof HTMLAnchorElement)) {
      this.openDrawer(0, this.root.querySelector<HTMLElement>(".cab-drawer") ?? undefined);
    } else handled = false;
    if (!handled) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  private moveFocus(selector: string, d: number) {
    const items = [...this.root.querySelectorAll<HTMLElement>(selector)];
    if (!items.length) return;
    const at = items.indexOf(document.activeElement as HTMLElement);
    const next = items[at < 0 ? 0 : (at + d + items.length) % items.length];
    next.focus();
    next.scrollIntoView({ block: "nearest", behavior: this.hooks.reduced() ? "auto" : "smooth" });
    this.hooks.sound("ui-tick");
  }

  /** Watches frame times during an animation; two slow ones (< 45 fps) switch the auto tier to lite. */
  private probe(ms: number) {
    if (!this.fxAuto || this.root.dataset.fx === "lite") return;
    this.probeFrames = [];
    let last = 0;
    const end = performance.now() + ms;
    const tick = (t: number) => {
      if (last) this.probeFrames.push(t - last);
      last = t;
      if (t < end) { requestAnimationFrame(tick); return; }
      const f = this.probeFrames;
      if (f.length < 8) return;
      const fps = (1000 * f.length) / f.reduce((a, b) => a + b, 0);
      if (fps < 45 && ++this.slowProbes >= 2 && this.fxAuto) this.root.dataset.fx = "lite";
    };
    requestAnimationFrame(tick);
  }
}
