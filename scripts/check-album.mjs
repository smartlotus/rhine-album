// Pre-build check: the manifest is valid and every listed photo has web files.
import { access } from "node:fs/promises";
import { loadAlbum, validateAlbum } from "./album-content.mjs";
const root = new URL("../", import.meta.url);
const { manifest, generated } = await loadAlbum(root);
const { photos } = validateAlbum(manifest, generated);
const missing = [];
for (const p of photos)
  for (const s of Object.values(generated[p.file].src))
    for (const file of Object.values(s))
      await access(new URL("public/" + file, root)).catch(() => missing.push(file));
if (missing.length) throw new Error("缺少网页图片文件，请运行 npm run photos：\n  " + missing.join("\n  "));
console.log(`Album manifest OK: ${photos.length} photos in 5 volumes.`);
