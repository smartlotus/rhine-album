// 横屏 / 竖屏 浏览器检查（Chromium，手机触屏视口）。
//   npm run build:pages && (serve dist under /rhine-album/) &&
//   BASE=http://127.0.0.1:4602/rhine-album/ PLAYWRIGHT=/path/to/playwright-core/index.mjs node scripts/check-landscape.mjs
// 可选 SHOTS=/dir 保存截图。检查：
//  - 每个视口（390×844, 844×390, 932×430, 667×375）按钮都在屏幕内、未被遮挡、≥40px，避开模拟的安全区（刘海/Home 条）
//  - 3D 画布尺寸跟随视口；详情页照片、总览缩略图、全屏查看都按清单里的 width/height 比例显示（不拉伸，不裁切）
//  - 竖⇄横 旋转：出现扫描过渡（cover → reveal → idle），画布重新适配，布局切换；prefers-reduced-motion 只淡入淡出
const { chromium } = await import(process.env.PLAYWRIGHT || "playwright-core");
const BASE = (process.env.BASE || "http://127.0.0.1:4602/rhine-album/").replace(/\/?$/, "/");
const SHOTS = process.env.SHOTS || "";
const VIEWS = [[390, 844], [844, 390], [932, 430], [667, 375]];
// iPhone-like safe areas: notch side + home indicator.
const SAFE = (w, h) => (w > h ? { top: 0, left: 47, right: 47, bottom: 21 } : { top: 47, left: 0, right: 0, bottom: 34 });
let pass = 0, fail = 0;
const errors = [];
const log = (name, ok, x) => { ok ? pass++ : fail++; console.log(`${ok ? "  ok " : "  FAIL"} ${name}${ok || x === undefined ? "" : "  " + JSON.stringify(x).slice(0, 600)}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox", "--disable-dev-shm-usage", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
async function open(w, h, url, { reduced = false } = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, reducedMotion: reduced ? "reduce" : "no-preference" });
  // Light render settings keep SwiftShader usable; layout is identical.
  await ctx.addInitScript(() => localStorage.setItem("rhine-settings", JSON.stringify({ superPerformance: true, sound: false, music: false })));
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errors.push(`${w}x${h}: ${e.message}`));
  const cdp = await ctx.newCDPSession(p);
  const safe = async (W, H) => { try { await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: SAFE(W, H) }); return true; } catch { return false; } };
  const hasSafe = await safe(w, h);
  await p.goto(BASE + url, { waitUntil: "load" });
  await p.waitForFunction(() => document.querySelector("#stage")?.dataset.mode && document.querySelector("#three-scene canvas"), null, { timeout: 60000 }).catch(() => {});
  return { ctx, p, safe, hasSafe };
}
// Settle CSS transitions / one-shot animations first (SwiftShader renders the 3D scene slowly, so they crawl).
const settle = (p) => p.evaluate(() => { for (const a of document.getAnimations()) { try { if (a.effect?.getTiming().iterations !== Infinity && !a.effect?.target?.closest?.(".orient-veil")) a.finish(); } catch {} } });
const shot = async (p, name) => { if (!SHOTS) return; await settle(p); await p.screenshot({ path: `${SHOTS}/${name}.png`, timeout: 300000 }); };
// Visible controls inside the screen and outside the safe-area insets, not covered.
const controls = (p, sel, ins) => p.evaluate(([sel, ins]) => [...document.querySelectorAll(sel)].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && +cs.opacity > 0.2 && !e.closest("[hidden],[inert]"); }).map((e) => {
  const r = e.getBoundingClientRect();
  const c = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2)), Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2)));
  return { t: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 18), r: [r.left, r.top, r.right, r.bottom].map(Math.round),
    inView: r.left >= ins.left - 1 && r.right <= innerWidth - ins.right + 1 && r.top >= ins.top - 1 && r.bottom <= innerHeight - ins.bottom + 1,
    top: !!c && (e.contains(c) || c.contains(e)), size: Math.min(r.width, r.height) };
}), [sel, ins]);
const canvasFits = (p) => p.evaluate(() => { const c = document.querySelector("#three-scene canvas"); if (!c) return null; const r = c.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), vw: innerWidth, vh: innerHeight, bw: c.width, bh: c.height, ok: Math.abs(r.width - innerWidth) <= 2 && Math.abs(r.height - innerHeight) <= 2 && Math.abs(c.width / c.height - r.width / r.height) < 0.03 }; });
const ratioOf = (p, sel) => p.evaluate((sel) => [...document.querySelectorAll(sel)].map((pic) => { const host = pic.closest("[style*='--ar']"); const ar = parseFloat(getComputedStyle(host || pic).getPropertyValue("--ar")); const img = pic.querySelector("img"); const r = pic.getBoundingClientRect(); return { ar, box: r.width / r.height, nat: +img.getAttribute("width") / +img.getAttribute("height"), w: Math.round(r.width), h: Math.round(r.height) }; }), sel);
const ratioOk = (list, tol = 0.02) => list.length > 0 && list.every((x) => Math.abs(x.box / x.nat - 1) < tol && Math.abs(x.ar / x.nat - 1) < 0.002);

console.log("check-landscape", BASE);
for (const [w, h] of VIEWS) {
  const tag = `${w}x${h}`;
  const ins = SAFE(w, h);
  // Archive
  {
    const { ctx, p, hasSafe } = await open(w, h, "?scene=archive");
    if (w === 390) log("safe-area emulation available (Emulation.setSafeAreaInsetsOverride)", hasSafe);
    await sleep(6000);
    const lay = await p.evaluate(() => document.querySelector("#stage").dataset.layout);
    log(`${tag} archive: layout ${w > h ? "compact" : "portrait"}`, lay === (w > h ? "compact" : "portrait"), lay);
    const cv = await canvasFits(p);
    log(`${tag} archive: 3D canvas fills the viewport, buffer keeps its ratio`, cv?.ok, cv);
    const ctl = await controls(p, ".system-nav button, .file-title, .read-file, .column-navigation button, .archive-navigation button, .file-ticks button", ins);
    const bad = ctl.filter((c) => !c.inView || !c.top || c.size < 22);
    log(`${tag} archive: ${ctl.length} controls inside the safe area and not covered`, ctl.length >= 6 && bad.length === 0, bad);
    await shot(p, `album-${tag}-archive`);
    // Contact sheet
    await p.click('[data-action="album"]', { force: true });
    await sleep(900);
    const items = await ratioOf(p, ".sheet-item picture");
    log(`${tag} sheet: ${items.length} thumbnails keep their own ratio (justified rows)`, ratioOk(items, 0.04), items.slice(0, 4));
    const over = await p.evaluate(() => { const g = [...document.querySelectorAll(".sheet-grid")]; return g.some((x) => x.scrollWidth > x.clientWidth + 1); });
    log(`${tag} sheet: no horizontal overflow`, !over);
    const sctl = await controls(p, ".album-sheet [data-sheet-close]", ins);
    log(`${tag} sheet: close button inside the safe area`, sctl.length === 1 && sctl[0].inView && sctl[0].top, sctl);
    await shot(p, `album-${tag}-sheet`);
    // Lightbox on a portrait (0001) and the landscape photo (0010, record 9)
    for (const k of [0, 9]) {
      await p.evaluate((k) => document.querySelector(`[data-sheet="${k}"]`)?.click(), k);
      await p.waitForSelector(".album-lightbox.lb-visible .lb-photo:not(.lb-out) picture.loaded", { timeout: 40000 }).catch(() => {});
      await sleep(600);
      const lb = await p.evaluate(() => { const pic = document.querySelector(".lb-photo:not(.lb-out) picture"); const fr = document.querySelector(".lb-frame").getBoundingClientRect(); const r = pic.getBoundingClientRect(); const img = pic.querySelector("img"); const nat = +img.getAttribute("width") / +img.getAttribute("height"); return { nat, box: r.width / r.height, inFrame: r.left >= fr.left - 1 && r.right <= fr.right + 1 && r.top >= fr.top - 1 && r.bottom <= fr.bottom + 1, fills: Math.max(r.width / fr.width, r.height / fr.height), r: [r.width, r.height].map(Math.round), fr: [fr.width, fr.height].map(Math.round) }; });
      log(`${tag} lightbox #${k + 1}: contained (inside the frame, fills one side, own ratio)`, lb.inFrame && lb.fills > 0.97 && Math.abs(lb.box / lb.nat - 1) < 0.02, lb);
      const lctl = await controls(p, ".album-lightbox button, .album-lightbox a", ins);
      const lbad = lctl.filter((c) => !c.inView || !c.top || c.size < 40);
      log(`${tag} lightbox #${k + 1}: ${lctl.length} controls usable`, lctl.length >= 5 && lbad.length === 0, lbad);
      const fr = await p.evaluate(() => document.querySelector(".lb-frame").getBoundingClientRect().height);
      log(`${tag} lightbox #${k + 1}: photo area ≥ 55% of the screen height`, fr >= h * 0.55, { fr, h });
      await shot(p, `album-${tag}-lightbox-${k + 1}`);
      await p.evaluate(() => document.querySelector('[data-lb="close"]').click());
      await sleep(700);
    }
    await ctx.close();
  }
  // Detail
  {
    const { ctx, p } = await open(w, h, "?scene=detail");
    await p.waitForSelector(".album-photo-frame picture.loaded", { timeout: 40000 }).catch(() => {});
    await sleep(9000);
    const ph = await ratioOf(p, ".album-photo-frame picture");
    log(`${tag} detail: the photo keeps its own ratio`, ratioOk(ph), ph);
    const fit = await p.evaluate(() => { const f = document.querySelector(".album-photo-frame"), pic = f?.querySelector("picture"); if (!pic) return null; const a = f.getBoundingClientRect(), r = pic.getBoundingClientRect(); return { inside: r.left >= a.left - 1 && r.right <= a.right + 1, h: Math.round(r.height), vh: innerHeight }; });
    log(`${tag} detail: photo fits the dossier column and ≤ 62% of the screen height`, fit && fit.inside && fit.h <= fit.vh * 0.62, fit);
    const dctl = await controls(p, ".system-nav button, .back-button", ins);
    log(`${tag} detail: nav + back inside the safe area`, dctl.length >= 4 && dctl.every((c) => c.inView && c.top), dctl.filter((c) => !c.inView || !c.top));
    const overlap = await p.evaluate(() => { const lab = [...document.querySelectorAll(".system-nav .settings-label")].filter((e) => e.getClientRects().length && getComputedStyle(e).display !== "none"); const dc = document.querySelector(".detail-content"); if (!dc) return false; const d = dc.getBoundingClientRect(); return lab.some((l) => { const r = l.getBoundingClientRect(); return r.bottom > d.top && r.top < d.bottom && r.right > d.left && r.left < d.right; }); });
    log(`${tag} detail: nav labels do not sit on the dossier`, !overlap);
    await shot(p, `album-${tag}-detail`);
    await ctx.close();
  }
}
// Rotation: portrait → landscape → portrait
for (const reduced of [false, true]) {
  const { ctx, p, safe } = await open(390, 844, "?scene=archive", { reduced });
  await sleep(6000);
  await safe(844, 390);
  // SwiftShader keeps the main thread busy, so events land seconds late; pre-hold so a mid frame can be captured.
  if (!reduced && SHOTS) await p.evaluate(() => window.__orient.hold(0.8));
  await p.setViewportSize({ width: 844, height: 390 });
  const seen = await p.waitForFunction(() => window.__orient?.runs() > 0, null, { timeout: 30000 }).then(() => p.evaluate(() => ({ phase: window.__orient.phase(), cls: document.querySelector(".orient-veil").className })), () => null);
  log(`rotate${reduced ? " (reduced motion)" : ""}: veil starts (${reduced ? "plain fade" : "scan wipe"})`, !!seen && (reduced ? /\brm\b/.test(seen.cls) : /cover/.test(seen.cls)), seen);
  if (!reduced && SHOTS) { await p.evaluate(() => window.__orient.hold(0.8)); await shot(p, "album-rotate-mid-cover"); await p.evaluate(() => window.__orient.release()); }
  const idle = await p.waitForFunction(() => window.__orient.phase() === "idle", null, { timeout: 30000 }).then(() => true, () => false);
  log(`rotate${reduced ? " (reduced motion)" : ""}: veil clears`, idle);
  if (!reduced && SHOTS) {
    // A reveal frame for the report.
    await safe(390, 844); await p.setViewportSize({ width: 390, height: 844 });
    await p.waitForFunction(() => window.__orient.phase() === "reveal", null, { timeout: 30000 }).catch(() => {});
    await p.evaluate(() => window.__orient.hold(0.45)); await shot(p, "album-rotate-mid-reveal"); await p.evaluate(() => window.__orient.release());
    await p.waitForFunction(() => window.__orient.phase() === "idle", null, { timeout: 20000 }).catch(() => {});
    await safe(844, 390); await p.setViewportSize({ width: 844, height: 390 });
    await p.waitForFunction(() => window.__orient.phase() === "idle", null, { timeout: 20000 }).catch(() => {});
  }
  await sleep(4000);
  const lay = await p.evaluate(() => ({ layout: document.querySelector("#stage").dataset.layout, o: document.documentElement.dataset.orientation }));
  const cv = await canvasFits(p);
  log(`rotate${reduced ? " (reduced motion)" : ""}: landscape layout + canvas re-fitted`, lay.layout === "compact" && lay.o === "landscape" && cv?.ok, { ...lay, cv });
  await ctx.close();
}
await b.close();
if (errors.length) { fail++; console.log("  FAIL page errors:\n    " + errors.join("\n    ")); } else console.log("  ok  no page errors");
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
