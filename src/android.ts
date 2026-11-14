// 2026-11-14 · Android / WeChat (X5 · XWeb) / vendor-browser detection for the album's existing quality tiers.
// iOS and desktop are untouched. Used by defaultPreset() (first visit), the classic array's dynamic resolution floor,
// and a 60 fps cap on 90 / 120 Hz Android screens (rendering every vsync there doubles GPU work for no visible gain).
const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
export const isAndroid = /Android|HarmonyOS|OpenHarmony/i.test(ua);
export const inApp = /MicroMessenger|WeChat|TBS\/|MQQBrowser|XWEB|QQ\/|Weibo|DingTalk|AlipayClient/i.test(ua);
export const vendorBrowser = /HuaweiBrowser|HeyTapBrowser|VivoBrowser|MiuiBrowser|XiaoMi|SamsungBrowser|UCBrowser|baiduboxapp|Quark/i.test(ua);
const nav = (typeof navigator === "undefined" ? {} : navigator) as Navigator & { deviceMemory?: number };
/** weak Android: ≤ 4 GB, ≤ 4 cores, or an in-app WebView */
export const weakAndroid =
  isAndroid && ((nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency ?? 8) <= 4 || inApp);
/** lowest dynamic-resolution scale the classic array may drop to */
export const dynamicFloor = isAndroid ? 0.5 : 0.67;
/** true when this frame should be skipped to hold ~60 fps on high-refresh Android screens */
let last = 0;
export function skip60(ms: number) {
  if (!isAndroid) return false;
  if (ms - last < 14.5) return true;
  last = ms;
  return false;
}
