// npm run add-photos -- <图片1> <图片2> ...
// Copies new originals into photos/ (git-ignored) with sequential names,
// skips exact duplicates (same bytes), and appends them to the end of
// content/album.json with empty text fields. Run `npm run photos` afterwards.
import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { extname, basename } from "node:path";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const dir = new URL("photos/", root);
await mkdir(dir, { recursive: true });
const manifestUrl = new URL("content/album.json", root);
const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
const hash = (b) => createHash("sha256").update(b).digest("hex");
// Perceptual "difference hash": catches the same picture saved twice at a
// different size / quality (e.g. a re-sent chat image), not only exact copies.
async function dhash(bytes) {
  const { data } = await sharp(bytes).rotate().grayscale().resize(9, 8, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  let bits = "";
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += data[y * 9 + x] > data[y * 9 + x + 1] ? "1" : "0";
  return bits;
}
const distance = (a, b) => [...a].reduce((n, c, i) => n + (c !== b[i] ? 1 : 0), 0);
const known = new Map();
const looks = [];
for (const name of await readdir(dir)) {
  if (name.startsWith(".") || name === "README.md") continue;
  const bytes = await readFile(new URL(name, dir));
  known.set(hash(bytes), name);
  looks.push({ name, d: await dhash(bytes) });
}
const allowSimilar = process.argv.includes("--allow-similar");
let n = manifest.photos.reduce((max, p) => Math.max(max, Number.parseInt(p.file, 10) || 0), 0);
for (const path of process.argv.slice(2).filter((a) => !a.startsWith("--"))) {
  const bytes = await readFile(path);
  const h = hash(bytes);
  if (known.has(h)) { console.log(`  = ${basename(path)} 与 ${known.get(h)} 相同，跳过`); continue; }
  const d = await dhash(bytes);
  const twin = looks.find((l) => distance(l.d, d) <= 5);
  if (twin && !allowSimilar) { console.log(`  ≈ ${basename(path)} 看起来和 ${twin.name} 是同一张，跳过（确定不同请加 --allow-similar）`); continue; }
  const name = String(++n).padStart(4, "0") + (extname(path).toLowerCase() || ".jpg");
  await copyFile(path, new URL(name, dir));
  known.set(h, name);
  looks.push({ name, d });
  manifest.photos.push({ file: name, title: "", date: "", place: "", caption: "", tags: [] });
  console.log(`  + ${basename(path)} → photos/${name}`);
}
await writeFile(manifestUrl, JSON.stringify(manifest, null, 2) + "\n");
console.log("已写入 content/album.json。接着运行：npm run photos");
