// Photo ratio helpers shared by the DOM album layer and the 3D print (no CSS / DOM imports).
/** Nearest familiar print ratio ("9:16", "3:4", "4:3" …) and the orientation word. */
const RATIOS: [number, number][] = [[9, 16], [5, 8], [3, 5], [2, 3], [5, 7], [3, 4], [4, 5], [1, 1], [5, 4], [4, 3], [3, 2], [16, 9], [9, 19.5], [1, 2], [2, 1]];
export function ratioInfo(width: number, height: number) {
  const r = width / Math.max(1, height);
  let best = RATIOS[0], err = Infinity;
  for (const q of RATIOS) { const e = Math.abs(Math.log(r / (q[0] / q[1]))); if (e < err) { err = e; best = q; } }
  const label = err < 0.035 ? `${best[0]}:${best[1]}` : (r >= 1 ? `${r.toFixed(2)}:1` : `1:${(1 / r).toFixed(2)}`);
  const kind = r > 1.04 ? "LANDSCAPE" : r < 0.96 ? "PORTRAIT" : "SQUARE";
  return { ratio: r, label, kind, zh: kind === "LANDSCAPE" ? "横幅" : kind === "PORTRAIT" ? "竖幅" : "方幅" };
}
export const ratioLabel = ratioInfo;
