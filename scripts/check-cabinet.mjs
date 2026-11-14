// 时间档案柜 + 干员档案卡 浏览器检查（Chromium）。
//   npm run build:pages && (serve dist under /rhine-album/) &&
//   BASE=http://127.0.0.1:4602/rhine-album/ PLAYWRIGHT=/path/to/playwright-core/index.mjs node scripts/check-cabinet.mjs
// 可选 SHOTS=/dir 保存截图。检查（竖屏手机 390×844、横屏手机 844×390、桌面 1440×900）：
//  - 开场结束后进入档案柜；抽屉数量 = content/album.json 的 volumes；不加载 three.js / GLB
//  - 抽屉打开后每张档案纸按清单 width/height 比例显示；档案卡翻面后照片比例正确、无占位假文字
//  - 上一张/下一张、档案卡 → 全屏查看、收藏、检索 → 档案卡、按钮避开安全区
//  - 竖⇄横 旋转过渡；prefers-reduced-motion 下跳过翻牌
//  - 4× CPU 降速下抽屉/翻牌期间的帧间隔与长任务（粗略）
import { readFileSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT || "playwright-core");
const BASE = (process.env.BASE || "http://127.0.0.1:4602/rhine-album/").replace(/\/?$/, "/");
const SHOTS = process.env.SHOTS || "";
const album = JSON.parse(readFileSync(new URL("../content/album.json", import.meta.url), "utf8"));
const volumes = album.volumes;
const VIEWS = [[390, 844, true], [844, 390, true], [1440, 900, false]];
const SAFE = (w, h) => (w > h ? { top: 0, left: 47, right: 47, bottom: 21 } : { top: 47, left: 0, right: 0, bottom: 34 });
let pass = 0, fail = 0;
const errors = [];
const log = (name, ok, x) => { ok ? pass++ : fail++; console.log(`${ok ? "  ok " : "  FAIL"} ${name}${x === undefined ? "" : "  " + JSON.stringify(x).slice(0, 500)}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox", "--disable-dev-shm-usage"] });

async function open(w, h, mobile, { url = "?from=jelly", reduced = false, settings = {} } = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, reducedMotion: reduced ? "reduce" : "no-preference", serviceWorkers: "block" });
  await ctx.addInitScript((s) => localStorage.setItem("rhine-settings", s), JSON.stringify({ sound: false, music: false, autoQuality: false, classic3D: false, classic3DChosen: true, ...settings }));
  const p = await ctx.newPage();
  const requests = [];
  p.on("request", (r) => requests.push(r.url()));
  p.on("pageerror", (e) => errors.push(`${w}x${h}: ${e.message}`));
  const cdp = await ctx.newCDPSession(p);
  const safe = async (W, H) => { if (!mobile) return; try { await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: SAFE(W, H) }); } catch {} };
  await safe(w, h);
  await p.goto(BASE + url, { waitUntil: "load" });
  await p.waitForFunction(() => window.rhine?.stats()?.startup === "started", null, { timeout: 60000 });
  return { ctx, p, cdp, safe, requests };
}
const shot = async (p, name) => { if (SHOTS) await p.screenshot({ path: `${SHOTS}/${name}.png` }); };
const state = (p) => p.evaluate(() => window.rhine.cabinet.state());
const idle = (p) => p.waitForFunction(() => !window.rhine.cabinet.state().busy && !document.querySelector(".cab .dv-in, .cab .op-in:not(.op-revealed)"), null, { timeout: 15000 }).then(() => true, () => false);
const ratios = (p, sel) => p.evaluate((sel) => [...document.querySelectorAll(sel)].map((el) => { const img = el.querySelector("img"); const r = el.getBoundingClientRect(); return { box: r.width / r.height, nat: +img.getAttribute("width") / +img.getAttribute("height"), w: Math.round(r.width), h: Math.round(r.height) }; }), sel);
const ratioOk = (list, tol = 0.025) => list.length > 0 && list.every((x) => x.w > 20 && Math.abs(x.box / x.nat - 1) < tol);
const controls = (p, sel, ins) => p.evaluate(([sel, ins]) => [...document.querySelectorAll(sel)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !e.closest("[hidden],[inert]") && r.bottom > 0 && r.top < innerHeight; }).map((e) => {
  const r = e.getBoundingClientRect();
  const c = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2)), Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2)));
  return { t: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 14), inView: r.left >= ins.left - 1 && r.right <= innerWidth - ins.right + 1 && r.top >= ins.top - 1 && r.bottom <= innerHeight - ins.bottom + 1, top: !!c && (e.contains(c) || c.contains(e)), size: Math.round(Math.min(r.width, r.height)) };
}), [sel, ins]);
const good = (list, min = 40) => list.length > 0 && list.every((c) => c.inView && c.top && c.size >= min);
// Rough frame budget: rAF intervals + long tasks while `action` runs.
async function measure(p, action, ms = 1400) {
  await p.evaluate(() => { window.__lt = []; window.__po?.disconnect(); window.__po = new PerformanceObserver((l) => window.__lt.push(...l.getEntries().map((e) => e.duration))); window.__po.observe({ type: "longtask", buffered: false }); window.__fr = []; let last = performance.now(); window.__stop = false; const f = (t) => { window.__fr.push(t - last); last = t; if (!window.__stop) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await action();
  await sleep(ms);
  return p.evaluate(() => { window.__stop = true; const fr = window.__fr.slice(1).sort((a, b) => a - b); const q = (x) => +(fr[Math.min(fr.length - 1, Math.floor(fr.length * x))] || 0).toFixed(1); return { frames: fr.length, p50: q(0.5), p95: q(0.95), max: q(1), over33: fr.filter((x) => x > 33.4).length, longTasks: window.__lt.length, longTaskMs: Math.round(window.__lt.reduce((a, b) => a + b, 0)) }; });
}

console.log("check-cabinet", BASE);
for (const [w, h, mobile] of VIEWS) {
  const tag = `${w}x${h}`;
  const ins = mobile ? SAFE(w, h) : { top: 0, left: 0, right: 0, bottom: 0 };
  const { ctx, p, cdp, requests } = await open(w, h, mobile);
  // Let the real opening sequence finish into the cabinet (21.9 s); headless runs it at real time.
  const fromBoot = await p.waitForFunction(() => window.rhine.cabinet.state().visible, null, { timeout: 40000 }).then(() => true, () => false);
  log(`${tag} opening sequence ends in the cabinet`, fromBoot);
  if (!fromBoot) await p.evaluate(() => window.rhine.archive());
  await sleep(1800);
  const st = await state(p);
  log(`${tag} drawers = album volumes (${volumes.length})`, st.drawers === volumes.length && (await p.locator(".cab-drawer").count()) === volumes.length, st);
  log(`${tag} jelly route hint shown`, await p.evaluate(() => /JELLY/i.test(document.body.innerText)));
  const nav = await controls(p, ".cab-nav button, .cab-foot button", ins);
  log(`${tag} cabinet controls inside safe area, tappable`, good(nav), nav.filter((c) => !c.inView || !c.top || c.size < 40));
  const dr = await controls(p, ".cab-drawer", { ...ins, top: 0, bottom: 0 });
  log(`${tag} drawers visible and unobstructed`, dr.length > 0 && dr.every((d) => d.top && d.size >= 44), dr);
  await shot(p, `${tag}-cabinet`);

  // Drawer: pick the one with most mixed ratios to exercise justified rows.
  const di = await p.evaluate(() => { const c = [...document.querySelectorAll('.cab-drawer')].map((d) => +d.querySelector('.cd-count b').textContent); return c.indexOf(Math.max(...c)); });
  const openPerf = await measure(p, () => p.click(`[data-drawer="${di}"]`));
  log(`${tag} drawer pull: frames (4× not applied)`, openPerf.frames > 10, openPerf);
  await idle(p);
  const sheets = await ratios(p, ".dv-sheet .ds-photo");
  const filesN = await p.locator(`.cab-drawer[data-drawer="${di}"] .cd-print`).count() && +(await p.textContent(`.cab-drawer[data-drawer="${di}"] .cd-count b`));
  log(`${tag} drawer ${di + 1}: ${filesN} sheets at their true ratio`, sheets.length === filesN && ratioOk(sheets), sheets);
  const overflow = await p.evaluate(() => { const v = document.querySelector(".cab-drawer-view"); return v.scrollWidth - v.clientWidth; });
  log(`${tag} drawer view has no horizontal overflow`, overflow <= 1, overflow);
  await shot(p, `${tag}-drawer`);

  // Card
  await p.click(".dv-sheet");
  const revealed = await p.waitForFunction(() => document.querySelector(".op-view.op-revealed") && !window.rhine.cabinet.state().busy, null, { timeout: 8000 }).then(() => true, () => false);
  log(`${tag} card flips and reveals`, revealed);
  await sleep(900);
  const card = await ratios(p, ".op-photo");
  log(`${tag} card photo at its true ratio`, ratioOk(card), card);
  const fit = await p.evaluate(() => { const r = document.querySelector(".op-card").getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), vw: innerWidth, vh: innerHeight }; });
  log(`${tag} card fits the screen`, fit.w <= fit.vw && fit.h <= fit.vh, fit);
  const text = await p.evaluate(() => document.querySelector(".op-file").innerText);
  log(`${tag} file card has no placeholder / fake text`, !/—|undefined|null|NaN|lorem/i.test(text) && /待补充|TAGS|CAPTION|标签/.test(text), text.slice(0, 160));
  const bar = await controls(p, ".op-bar button, .op-bar a:not([hidden]), .op-return", ins);
  log(`${tag} card controls inside safe area, tappable`, good(bar), bar.filter((c) => !c.inView || !c.top || c.size < 40));
  await shot(p, `${tag}-card`);
  const id0 = (await state(p)).card;
  await p.click('[data-cab="card-next"]'); await idle(p);
  const id1 = (await state(p)).card;
  await p.click('[data-cab="card-prev"]'); await idle(p);
  log(`${tag} next / prev step through files`, id1 && id1 !== id0 && (await state(p)).card === id0, [id0, id1]);
  // Favorite toggles and persists.
  await p.click(".op-save");
  const sv = await p.evaluate(() => [document.querySelector(".op-save").getAttribute("aria-pressed"), JSON.parse(localStorage.getItem("rhine-saved") || "[]")]);
  await p.click(".op-save");
  const sv2 = await p.evaluate(() => JSON.parse(localStorage.getItem("rhine-saved") || "[]"));
  log(`${tag} favorite toggles and is stored`, sv[0] === "true" && sv[1].includes(id0) && !sv2.includes(id0), sv);
  // Export link points at the full image.
  const ex = await p.evaluate(() => document.querySelector(".op-export")?.getAttribute("href"));
  log(`${tag} export links the full photo`, /full|\.webp|\.jpe?g/.test(ex || ""), ex);
  // Lightbox from the card.
  await p.click(".op-photo");
  const lb = await p.waitForFunction(() => { const r = document.querySelector(".album-lightbox"); return r && !r.hidden; }, null, { timeout: 5000 }).then(() => true, () => false);
  log(`${tag} card photo opens the zoom viewer`, lb);
  await p.keyboard.press("Escape"); await sleep(500);
  const back = await p.evaluate(() => ({ lb: document.querySelector(".album-lightbox").hidden, card: window.rhine.cabinet.state().card }));
  log(`${tag} Esc closes the viewer back to the card`, back.lb && back.card === id0, back);
  await p.keyboard.press("Escape"); await idle(p); await sleep(400);
  log(`${tag} Esc from card returns to the drawer`, (await state(p)).card === null && (await state(p)).drawer === di && (await p.evaluate(() => document.querySelector('.op-view').hidden)));
  await p.keyboard.press("Escape"); await idle(p); await sleep(400);
  log(`${tag} Esc from drawer returns to the cabinet`, (await state(p)).drawer === -1, await state(p));
  // Search → card.
  await p.click('.cab-nav [data-action="search"]');
  await p.waitForSelector("#archive-search", { timeout: 5000 });
  await p.fill("#archive-search", id0);
  await sleep(300);
  await p.click(".result-row");
  const viaSearch = await p.waitForFunction((id) => window.rhine.cabinet.state().card === id, id0, { timeout: 8000 }).then(() => true, () => false);
  log(`${tag} search result opens its file card`, viaSearch, await state(p));
  await idle(p);

  // Rough frame budget under 4× CPU throttle.
  await p.evaluate(() => window.rhine.cabinet.closeCard(true)); await sleep(300);
  await p.evaluate(() => window.rhine.cabinet.closeDrawer(true)); await sleep(300);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const pull4 = await measure(p, () => p.evaluate((i) => window.rhine.cabinet.openDrawer(i), di), 1500);
  await idle(p);
  const flip4 = await measure(p, () => p.evaluate(() => document.querySelector(".dv-sheet").click()), 1800);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  console.log(`  perf ${tag} 4× CPU  drawer-pull ${JSON.stringify(pull4)}  card-flip ${JSON.stringify(flip4)}`);
  log(`${tag} 4× CPU: no long task > 200 ms total during flip`, flip4.longTaskMs < 200, flip4);
  const heavy = requests.filter((u) => /\.glb(\?|$)|\/assets\/(scene|quality-renderer|model-viewer)-/.test(u));
  log(`${tag} three.js / GLB models never loaded`, heavy.length === 0, heavy);
  await ctx.close();
}

// Rotation keeps the cabinet state and runs the transition.
{
  const { ctx, p, safe } = await open(390, 844, true, { url: "?scene=archive" });
  await p.waitForFunction(() => window.rhine.cabinet.state().visible, null, { timeout: 15000 });
  await p.evaluate(() => window.rhine.cabinet.openCard(0)); await idle(p); await sleep(400);
  await safe(844, 390); await p.setViewportSize({ width: 844, height: 390 });
  const seen = await p.waitForFunction(() => window.__orient?.runs() > 0, null, { timeout: 15000 }).then(() => p.evaluate(() => document.querySelector(".orient-veil").className), () => null);
  log("rotate portrait → landscape: scan transition runs", !!seen && /cover/.test(seen), seen);
  const cleared = await p.waitForFunction(() => window.__orient.phase() === "idle", null, { timeout: 15000 }).then(() => true, () => false);
  await sleep(400);
  const card = await ratios(p, ".op-photo");
  const fit = await p.evaluate(() => { const r = document.querySelector(".op-card").getBoundingClientRect(); return r.bottom <= innerHeight && r.right <= innerWidth; });
  log("after rotation: card still open, true ratio, fits", cleared && (await state(p)).card !== null && ratioOk(card) && fit, card);
  await shot(p, "rotate-landscape-card");
  await ctx.close();
}
// Reduced motion: no flip, immediate clean view.
{
  const { ctx, p } = await open(390, 844, true, { url: "?scene=archive", reduced: true });
  await p.waitForFunction(() => window.rhine.cabinet.state().visible, null, { timeout: 15000 });
  const t = await p.evaluate(async () => { const t0 = performance.now(); window.rhine.cabinet.openCard(3); await new Promise((r) => { const c = () => (!window.rhine.cabinet.state().busy && document.querySelector(".op-revealed") ? r() : requestAnimationFrame(c)); c(); }); return Math.round(performance.now() - t0); });
  log("reduced motion: card opens without the flip (< 300 ms)", t < 300, t);
  await ctx.close();
}
// Classic 3D array is still reachable.
{
  // 2026-11-14: the classic 3D array is the default home; the cabinet is the option
  for (const [name, settings, url, want] of [
    ["first visit (no saved choice) opens the classic 3D array", { classic3D: undefined, classic3DChosen: undefined }, "?from=jelly", "three"],
    ["a cabinet-era classic3D:false without an explicit choice still opens the classic array", { classic3D: false, classic3DChosen: undefined }, "?from=jelly", "three"],
    ["switched off in settings → the time archive cabinet", { classic3D: false, classic3DChosen: true }, "?from=jelly", "cabinet"],
    ["?classic=0 forces the cabinet", { classic3D: undefined, classic3DChosen: undefined }, "?from=jelly&classic=0", "cabinet"],
  ]) {
    const o = await open(393, 873, true, { url, settings });
    const view = await o.p.evaluate(() => document.querySelector("#viewport").dataset.view);
    log(name, view === want, { view, want });
    await o.ctx.close();
  }
  const { ctx, p, requests } = await open(844, 390, true, { url: "?scene=archive&classic=1", settings: { superPerformance: true } });
  const ok = await p.waitForFunction(() => document.querySelector("#three-scene canvas"), null, { timeout: 60000 }).then(() => true, () => false);
  log("?classic=1 loads the original 3D array on demand", ok && requests.some((u) => /\/assets\/scene-/.test(u)) && (await p.evaluate(() => document.querySelector("#viewport").dataset.view)) === "three");
  await ctx.close();
}
log("no page errors", errors.length === 0, errors);
await b.close();
console.log(`check-cabinet: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
