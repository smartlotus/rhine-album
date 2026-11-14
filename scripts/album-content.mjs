// Shared album manifest loading and validation (used by the photo pipeline,
// the pre-build check and the content test). Plain JS so Node can run it
// without a TypeScript step.
import { readFile } from "node:fs/promises";

export const VOLUME_COUNT = 5; // The classic 3D array has five columns.
export const MAX_VOLUMES = 12; // Drawers in the time-archive cabinet.
export const MAX_PER_VOLUME = 20; // Rows 12..31 of each 32-row loop column.

const text = (value) => (typeof value === "string" ? value.trim() : "");
const list = (value) =>
  Array.isArray(value) ? value.map(text).filter(Boolean) : text(value) ? [text(value)] : [];

export async function loadAlbum(root = new URL("../", import.meta.url)) {
  const manifest = JSON.parse(await readFile(new URL("content/album.json", root), "utf8"));
  let generated = {};
  try {
    generated = JSON.parse(await readFile(new URL("content/album.generated.json", root), "utf8"));
  } catch {}
  return { manifest, generated };
}

/** Throws with every problem listed; returns photos with resolved volumes. */
export function validateAlbum(manifest, generated = {}, { requireGenerated = true } = {}) {
  const problems = [];
  if (!Array.isArray(manifest.volumes) || manifest.volumes.length < 1 || manifest.volumes.length > MAX_VOLUMES)
    problems.push(`volumes 需要 1–${MAX_VOLUMES} 个（每个是档案柜的一个抽屉；经典三维阵列只在正好 ${VOLUME_COUNT} 个时可用）。`);
  const COUNT = Array.isArray(manifest.volumes) ? Math.min(MAX_VOLUMES, Math.max(1, manifest.volumes.length)) : VOLUME_COUNT;
  const volumes = (manifest.volumes ?? []).map((v, i) => {
    if (!text(v?.name)) problems.push(`volumes[${i}].name 不能为空。`);
    for (const k of ["period", "note"]) if (v?.[k] !== undefined && typeof v[k] !== "string") problems.push(`volumes[${i}].${k} 必须是文字。`);
    return { name: text(v?.name) || `VOL.${i + 1}`, en: text(v?.en), period: text(v?.period), note: text(v?.note) };
  });
  const names = new Set(volumes.map((v) => v.name));
  if (names.size !== volumes.length) problems.push("volumes 的 name 不能重复。");
  const photos = Array.isArray(manifest.photos) ? manifest.photos : [];
  if (!Array.isArray(manifest.photos)) problems.push("photos 必须是数组。");
  const seen = new Set();
  const n = photos.length, base = Math.floor(n / COUNT), extra = n % COUNT;
  const autoVolume = (i) => {
    let end = 0;
    for (let v = 1; v <= COUNT; v++) { end += base + (v <= extra ? 1 : 0); if (i < end) return v; }
    return COUNT;
  };
  const resolved = photos.map((photo, i) => {
    const where = `photos[${i}]`;
    const file = text(photo?.file);
    if (!file) problems.push(`${where}.file 不能为空。`);
    else if (seen.has(file)) problems.push(`${where}.file 重复：${file}`);
    seen.add(file);
    let volume = photo?.volume;
    if (volume === undefined || volume === null || volume === "") volume = autoVolume(i);
    if (!Number.isInteger(volume) || volume < 1 || volume > COUNT)
      problems.push(`${where}.volume 必须是 1–${COUNT} 的整数（或留空自动分卷）。`);
    if (requireGenerated && file && !generated[file])
      problems.push(`${where}：${file} 还没有生成网页图片，请先运行 npm run photos。`);
    return {
      file,
      volume,
      title: text(photo?.title),
      en: text(photo?.en),
      date: text(photo?.date),
      place: text(photo?.place),
      caption: text(photo?.caption),
      notes: list(photo?.notes),
      tags: list(photo?.tags),
      clearance: text(photo?.clearance),
    };
  });
  for (let v = 1; v <= COUNT; v++) {
    const count = resolved.filter((p) => p.volume === v).length;
    if (count > MAX_PER_VOLUME) problems.push(`第 ${v} 卷有 ${count} 张，超过每卷上限 ${MAX_PER_VOLUME}。`);
  }
  if (photos.length > COUNT * MAX_PER_VOLUME)
    problems.push(`照片总数超过 ${COUNT * MAX_PER_VOLUME}。`);
  if (problems.length) throw new Error("相册清单 content/album.json 有问题：\n- " + problems.join("\n- "));
  return { volumes, photos: resolved };
}
