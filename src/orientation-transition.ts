// Orientation change veil (portrait ⇄ landscape). The page is never locked to an
// orientation: when the phone turns, a paper "scan" sheet wipes down over the
// archive, the renderer and layout are re-fitted underneath while it is opaque,
// then the sheet wipes away with the orange scan line. Reduced motion: a short
// plain cross-fade, no movement.
type Opts = { reduced: () => boolean; dark: () => boolean; refit: () => void };

export function mountOrientationTransition(opts: Opts) {
  const mq = matchMedia("(orientation: landscape)");
  const el = document.createElement("div");
  el.className = "orient-veil";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `<div class="ov-ticks"></div><div class="ov-scan"></div><div class="ov-label"><span><i></i>RHINE LAB / VIEWPORT</span><b>RECALIBRATING</b><small class="ov-mode"></small></div>`;
  document.body.append(el);
  const mark = () => { document.documentElement.dataset.orientation = mq.matches ? "landscape" : "portrait"; };
  mark();
  let lastResize = 0, timer = 0, held = false, runs = 0, pending: (() => void) | null = null;
  addEventListener("resize", () => { lastResize = performance.now(); });
  const clear = () => { clearTimeout(timer); };
  const finish = () => { el.classList.remove("on", "cover", "reveal"); el.dataset.phase = "idle"; };
  function run() {
    runs++;
    mark();
    clear();
    el.querySelector(".ov-mode")!.textContent = mq.matches ? "LANDSCAPE · 横屏" : "PORTRAIT · 竖屏";
    el.dataset.dark = String(opts.dark());
    if (opts.reduced()) {
      el.className = "orient-veil rm on"; el.dataset.phase = "cover";
      timer = window.setTimeout(() => { opts.refit(); el.classList.remove("on"); el.dataset.phase = "idle"; }, 140);
      return;
    }
    el.className = "orient-veil on cover"; el.dataset.phase = "cover";
    const start = performance.now();
    // Hold the sheet until the browser has stopped resizing (iOS sends several
    // resize events while the rotation animation runs), at least 260 ms.
    const tick = () => {
      const now = performance.now();
      if (!held && now - start > 260 && now - lastResize > 160) {
        opts.refit();
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.classList.remove("cover"); el.classList.add("reveal"); el.dataset.phase = "reveal";
          timer = window.setTimeout(finish, 680);
        }));
      } else timer = window.setTimeout(tick, 50);
    };
    pending = tick;
    timer = window.setTimeout(tick, 50);
  }
  mq.addEventListener("change", run);
  // Review / test hook: freeze the veil mid-way to capture a frame.
  (window as unknown as { __orient?: unknown }).__orient = {
    run,
    runs: () => runs,
    phase: () => el.dataset.phase ?? "idle",
    hold(progress = 0.5) {
      held = true;
      clear();
      for (const a of el.getAnimations({ subtree: true })) { a.pause(); const d = Number(a.effect?.getTiming().duration) || 0; a.currentTime = d * progress; }
    },
    release() {
      held = false;
      for (const a of el.getAnimations({ subtree: true })) a.play();
      if (el.dataset.phase === "cover" && pending) timer = window.setTimeout(pending, 50);
      else if (el.dataset.phase === "reveal") timer = window.setTimeout(finish, 680);
    },
  };
  return { run };
}
