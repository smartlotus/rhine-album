import assert from "node:assert/strict";
import { test } from "node:test";
import { ratioInfo } from "../src/photo-ratio.ts";
import { readFileSync } from "node:fs";

test("common phone / camera ratios get their familiar names", () => {
  assert.equal(ratioInfo(1500, 2666).label, "9:16");
  assert.equal(ratioInfo(1500, 2000).label, "3:4");
  assert.equal(ratioInfo(1500, 1125).label, "4:3");
  assert.equal(ratioInfo(1920, 1080).label, "16:9");
  assert.equal(ratioInfo(1000, 1000).kind, "SQUARE");
  assert.equal(ratioInfo(1500, 1125).kind, "LANDSCAPE");
  assert.equal(ratioInfo(1500, 2666).kind, "PORTRAIT");
});
test("odd ratios fall back to 1:x / x:1", () => {
  assert.equal(ratioInfo(1000, 2600).label, "1:2.60");
  assert.equal(ratioInfo(3000, 1000).label, "3.00:1");
});
test("every photo in the manifest has a positive width / height (the layout uses them, not the image)", () => {
  const gen = JSON.parse(readFileSync(new URL("../content/album.generated.json", import.meta.url), "utf8"));
  for (const [file, g] of Object.entries(gen)) assert.ok(g.width > 0 && g.height > 0, file);
});
