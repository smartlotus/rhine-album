// Album photo pipeline.
//   1. Put original photos in photos/ (this folder is git-ignored: originals
//      keep full EXIF, including GPS, and never get published).
//   2. List them in content/album.json.
//   3. npm run photos
// For every listed photo this writes web versions to public/photos/ with all
// metadata stripped (orientation is applied to the pixels first), and records
// size / colour / a tiny blurred preview in content/album.generated.json.
// Output names are content hashes, so they reveal nothing about the original
// file name and can be cached forever.
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import exifr from "exifr";
import { loadAlbum, validateAlbum } from "./album-content.mjs";

const root = new URL("../", import.meta.url);
const sourceDir = new URL("photos/", root);
const outDir = new URL("public/photos/", root);
const SIZES = { full: 2048, mid: 1080, thumb: 400 };
const force = process.argv.includes("--force");

const { manifest, generated: previous } = await loadAlbum(root);
const { photos } = validateAlbum(manifest, previous, { requireGenerated: false });
await mkdir(outDir, { recursive: true });
const exists = (url) => access(url).then(() => true, () => false);

const next = {};
let made = 0, kept = 0;
const missing = [];
for (const photo of photos) {
  const source = new URL(photo.file, sourceDir);
  if (!(await exists(source))) {
    // A fresh clone has no originals: keep the published versions as they are.
    if (previous[photo.file]) { next[photo.file] = previous[photo.file]; kept++; continue; }
    missing.push(photo.file);
    continue;
  }
  const bytes = await readFile(source);
  const key = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  const old = previous[photo.file];
  if (!force && old?.key === key && (await exists(new URL(old.src.full.webp, root.href + "public/")))) {
    next[photo.file] = old; kept++; continue;
  }
  let taken = "";
  try {
    const exif = await exifr.parse(bytes, { pick: ["DateTimeOriginal", "CreateDate"] });
    const d = exif?.DateTimeOriginal ?? exif?.CreateDate;
    if (d instanceof Date && !Number.isNaN(d.valueOf()))
      taken = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  } catch {}
  // rotate() with no argument bakes EXIF orientation into the pixels; sharp
  // writes no metadata unless asked, so GPS / camera / time tags are dropped.
  const base = sharp(bytes, { failOn: "none" }).rotate();
  const { data: oriented, info } = await base.clone().toBuffer({ resolveWithObject: true });
  const width = info.width, height = info.height;
  const src = {};
  for (const [name, edge] of Object.entries(SIZES)) {
    const resized = sharp(oriented).resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true });
    const webpName = `photos/${key}-${name}.webp`;
    await resized.clone().webp({ quality: name === "thumb" ? 78 : 88, effort: 5 }).toFile(fileURLToPath(new URL(webpName, root.href + "public/")));
    src[name] = { webp: webpName };
    if (name !== "thumb") {
      const avifName = `photos/${key}-${name}.avif`;
      await resized.clone().avif({ quality: 72, effort: 4 }).toFile(fileURLToPath(new URL(avifName, root.href + "public/")));
      src[name].avif = avifName;
    }
  }
  const stats = await sharp(oriented).resize(32, 32, { fit: "inside" }).stats();
  const color = "#" + stats.channels.slice(0, 3).map((c) => Math.round(c.mean).toString(16).padStart(2, "0")).join("");
  const lqip = "data:image/webp;base64," + (await sharp(oriented).resize(24, 24, { fit: "inside" }).webp({ quality: 40 }).toBuffer()).toString("base64");
  next[photo.file] = { key, width, height, color, lqip, taken, src };
  made++;
  console.log(`  ✓ ${photo.file} → ${key} (${width}×${height}${taken ? ", " + taken : ""})`);
}

// Remove web files no longer referenced by the manifest.
const used = new Set(Object.values(next).flatMap((g) => Object.values(g.src).flatMap((s) => Object.values(s))).map((p) => p.replace(/^photos\//, "")));
for (const name of await readdir(outDir)) if (!used.has(name)) await rm(new URL(name, outDir));

await writeFile(new URL("content/album.generated.json", root), JSON.stringify(next, null, 2) + "\n");
console.log(`Album: ${made} processed, ${kept} unchanged, ${Object.keys(next).length} total.`);
if (missing.length) {
  console.error(`找不到这些原图（应放在 photos/ 目录下）：\n  ${missing.join("\n  ")}`);
  process.exitCode = 1;
}
