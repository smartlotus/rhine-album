// 性能相关的行为检查（Chromium，SwiftShader）。用法同 check-landscape：
//   BASE=http://127.0.0.1:4602/rhine-album/ PLAYWRIGHT=/path/to/playwright-core/index.mjs node scripts/check-perf.mjs
// 检查：手机默认「均衡」、桌面默认「原始」、手动选择后不再自动；跨卷切换不报错（各卷照片数不同）；
// 连续切换 24 次纹理数量不增长（印片不泄漏）；全屏查看先显示中图再换原图；全屏查看/总览盖住时三维画面暂停渲染。
const { chromium } = await import(process.env.PLAYWRIGHT || "playwright-core");
const BASE = (process.env.BASE || "http://127.0.0.1:4602/rhine-album/").replace(/\/?$/, "/");
let pass = 0, fail = 0;
const log = (name, ok, x) => { ok ? pass++ : fail++; console.log(`${ok ? "  ok " : "  FAIL"} ${name}${x === undefined ? "" : "  " + JSON.stringify(x).slice(0, 400)}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox", "--disable-dev-shm-usage", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
async function open({ mobile, settings }) {
  const ctx = await b.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, serviceWorkers: "block" } : { viewport: { width: 1280, height: 800 }, serviceWorkers: "block" });
  await ctx.addInitScript((s) => localStorage.setItem("rhine-settings", s), JSON.stringify(settings));
  const p = await ctx.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(BASE, { waitUntil: "load" });
  await p.waitForFunction(() => window.rhine?.stats()?.startup === "started" && window.rhine.stats().loaded, null, { timeout: 180000 });
  return { ctx, p, errors };
}
const quiet = { sound: false, music: false, classic3D: true };
{
  const { ctx, p } = await open({ mobile: true, settings: quiet });
  const s = await p.evaluate(() => rhine.stats());
  log("phone default quality = balanced (AO 16, shadows 1024)", s.autoQuality && s.quality.aoSamples === 16 && s.quality.shadows === 1024, s.quality);
  await ctx.close();
}
{
  const { ctx, p } = await open({ mobile: false, settings: quiet });
  const s = await p.evaluate(() => rhine.stats());
  log("desktop default quality = original (AO 32, shadows 2048)", s.autoQuality && s.quality.aoSamples === 32 && s.quality.shadows === 2048, s.quality);
  await ctx.close();
}
{
  const high = { scale: 125, pixelRatio: 2, antialias: "smaa", shadows: 4096, aoSamples: 32, aoResolution: 1, depthOfField: 100, transmission: 1, anisotropy: 16 };
  const { ctx, p } = await open({ mobile: true, settings: { ...quiet, autoQuality: false, rendering: high } });
  const s = await p.evaluate(() => rhine.stats());
  log("a chosen preset (high) is kept on a phone", !s.autoQuality && s.quality.shadows === 4096 && s.quality.antialias === "smaa", s.quality);
  await ctx.close();
}
{
  const { ctx, p, errors } = await open({ mobile: true, settings: { ...quiet, superPerformance: true } });
  await p.evaluate(() => rhine.archive());
  await sleep(3000);
  for (let i = 0; i < 12; i++) { await p.evaluate((i) => rhine.select(i), (i * 5) % 17); await sleep(250); }
  const settle = () => p.waitForFunction(() => rhine.stats().returningFiles === 0, null, { timeout: 120000 }).catch(() => {});
  await settle();
  const t0 = await p.evaluate(() => rhine.stats().memory?.textures);
  for (let i = 0; i < 24; i++) { await p.evaluate((i) => rhine.select(i), (i * 5) % 17); await sleep(250); }
  await settle();
  const s = await p.evaluate(() => ({ returning: rhine.stats().returningFiles, textures: rhine.stats().memory?.textures, selected: rhine.stats().selected, title: document.querySelector("#selected-code")?.textContent }));
  log("selecting across volumes of 3 and 2 photos: no errors", errors.length === 0, errors.slice(0, 3));
  log("24 more selections: GPU textures do not grow", s.textures <= t0 + 1, { before: t0, after: s.textures, returning: s.returning });
  const ticks = await p.evaluate(() => document.querySelectorAll("#file-ticks button").length);
  log("file ticks match the volume's photo count", ticks >= 1 && ticks <= 3, ticks);
  // Lightbox: mid first, then full; scene paused while covered.
  await p.evaluate(() => document.querySelector('[data-action="album"]').click());
  await sleep(1200);
  await p.evaluate(() => {
    window.__lbFirst = "";
    new MutationObserver((list) => { for (const m of list) for (const n of m.addedNodes) { const img = n.querySelector?.("img"); if (img && !window.__lbFirst) window.__lbFirst = img.getAttribute("src"); } }).observe(document.querySelector(".lb-frame"), { childList: true });
    document.querySelector("[data-sheet]")?.click();
  });
  await p.waitForSelector(".album-lightbox.lb-visible .lb-photo picture.loaded", { timeout: 30000 });
  const first = await p.evaluate(() => window.__lbFirst);
  await p.waitForFunction(() => document.querySelector(".lb-photo:not(.lb-out)")?.dataset.res === "full", null, { timeout: 30000 }).catch(() => {});
  const after = await p.evaluate(() => document.querySelector(".lb-photo:not(.lb-out) img").currentSrc);
  log("lightbox shows the mid file first, then the full file", /-mid\./.test(first) && /-full\./.test(after), { first, after });
  await sleep(800);
  const r0 = await p.evaluate(() => rhine.stats().renderedFrames);
  await p.evaluate(() => rhine.select(1));
  await sleep(2500);
  const r1 = await p.evaluate(() => rhine.stats().renderedFrames);
  log("3D scene does not render under the open lightbox", r1 === r0, { r0, r1 });
  await p.keyboard.press("Escape"); await sleep(800); await p.keyboard.press("Escape");
  const r2 = await p.waitForFunction((r1) => rhine.stats().renderedFrames > r1 && rhine.stats().renderedFrames, r1, { timeout: 30000 }).then((h) => h.jsonValue(), () => r1);
  log("3D scene renders again after closing", r2 > r1, { r1, r2 });
  await ctx.close();
}
await b.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
