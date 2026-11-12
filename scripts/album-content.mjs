// Shared album manifest loading and validation (used by the photo pipeline,
// the pre-build check and the content test). Plain JS so Node can run it
// without a TypeScript step.
import { readFile } from "node:fs/promises";

export const VOLUME_COUNT = 5; // The 3D array has five columns.
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
  if (!Array.isArray(manifest.volumes) || manifest.volumes.length !== VOLUME_COUNT)
    problems.push(`volumes 必须正好有 ${VOLUME_COUNT} 个（三维阵列固定五列）。`);
  const volumes = (manifest.volumes ?? []).map((v, i) => {
    if (!text(v?.name)) problems.push(`volumes[${i}].name 不能为空。`);
    return { name: text(v?.name) || `VOL.${i + 1}`, en: text(v?.en) };
  });
  const names = new Set(volumes.map((v) => v.name));
  if (names.size !== volumes.length) problems.push("volumes 的 name 不能重复。");
  const photos = Array.isArray(manifest.photos) ? manifest.photos : [];
  if (!Array.isArray(manifest.photos)) problems.push("photos 必须是数组。");
  const seen = new Set();
  const autoSize = Math.max(1, Math.ceil(photos.length / VOLUME_COUNT));
  const resolved = photos.map((photo, i) => {
    const where = `photos[${i}]`;
    const file = text(photo?.file);
    if (!file) problems.push(`${where}.file 不能为空。`);
    else if (seen.has(file)) problems.push(`${where}.file 重复：${file}`);
    seen.add(file);
    let volume = photo?.volume;
    if (volume === undefined || volume === null || volume === "") volume = Math.min(VOLUME_COUNT, Math.floor(i / autoSize) + 1);
    if (!Number.isInteger(volume) || volume < 1 || volume > VOLUME_COUNT)
      problems.push(`${where}.volume 必须是 1–${VOLUME_COUNT} 的整数（或留空自动分卷）。`);
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
  for (let v = 1; v <= VOLUME_COUNT; v++) {
    const count = resolved.filter((p) => p.volume === v).length;
    if (count > MAX_PER_VOLUME) problems.push(`第 ${v} 卷有 ${count} 张，超过每卷上限 ${MAX_PER_VOLUME}。`);
  }
  if (photos.length > VOLUME_COUNT * MAX_PER_VOLUME)
    problems.push(`照片总数超过 ${VOLUME_COUNT * MAX_PER_VOLUME}。`);
  if (problems.length) throw new Error("相册清单 content/album.json 有问题：\n- " + problems.join("\n- "));
  return { volumes, photos: resolved };
}
