import assert from "node:assert/strict";
import { test } from "node:test";
import { validateAlbum } from "./album-content.mjs";

const volumes = [1, 2, 3, 4, 5].map((n) => ({ name: `卷${n}`, en: `V${n}` }));
const gen = (files) => Object.fromEntries(files.map((f) => [f, { src: {} }]));
test("photos without a volume are spread over the five volumes in order", () => {
  const files = Array.from({ length: 14 }, (_, i) => `${i}.jpg`);
  const { photos } = validateAlbum({ volumes, photos: files.map((file) => ({ file })) }, gen(files));
  assert.deepEqual(photos.map((p) => p.volume), [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5]);
});
test("explicit volumes are kept", () => {
  const { photos } = validateAlbum({ volumes, photos: [{ file: "a.jpg", volume: 4 }] }, gen(["a.jpg"]));
  assert.equal(photos[0].volume, 4);
});
test("invalid manifests are rejected with a readable reason", () => {
  assert.throws(() => validateAlbum({ volumes: volumes.slice(0, 4), photos: [] }), /正好有 5 个/);
  assert.throws(() => validateAlbum({ volumes, photos: [{ file: "a.jpg" }, { file: "a.jpg" }] }, gen(["a.jpg"])), /重复/);
  assert.throws(() => validateAlbum({ volumes, photos: [{ file: "a.jpg", volume: 9 }] }, gen(["a.jpg"])), /volume/);
  assert.throws(() => validateAlbum({ volumes, photos: [{ file: "b.jpg" }] }, {}), /npm run photos/);
});
