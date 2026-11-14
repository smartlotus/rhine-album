import album from "../content/album.json" with { type: "json" };
import generated from "../content/album.generated.json" with { type: "json" };

/** Web versions of one photo, written by scripts/build-photos.mjs. */
export interface PhotoAsset {
  key: string;
  width: number;
  height: number;
  color: string;
  lqip: string;
  taken: string;
  src: {
    full: { webp: string; avif?: string };
    mid: { webp: string; avif?: string };
    thumb: { webp: string };
  };
}

/**
 * One archive in the 3D array. The original project's field names are kept so
 * every scene, transition and search path works unchanged; album meaning:
 * title/en = 标题, department = 日期, date = 地点, lead = 标签,
 * abstract = 说明, findings = 备注, category = 卷.
 */
export interface ArchiveRecord {
  id: string;
  title: string;
  en: string;
  department: string;
  category: string;
  date: string;
  lead: string;
  clearance: string;
  abstract: string;
  findings: string[];
  source: string;
  tags: string[];
  /** Absent for the placeholder file that keeps an empty volume in the array. */
  photo?: PhotoAsset;
  file?: string;
}

type ManifestPhoto = {
  file: string;
  volume?: number;
  title?: string;
  en?: string;
  date?: string;
  place?: string;
  caption?: string;
  notes?: string[] | string;
  tags?: string[] | string;
  clearance?: string;
};
// One drawer of the time archive cabinet per volume in content/album.json.
const VOLUMES = Math.max(1, album.volumes.length);
const assets = generated as Record<string, PhotoAsset>;
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const list = (v: unknown) =>
  Array.isArray(v) ? v.map(text).filter(Boolean) : text(v) ? [text(v)] : [];
export const volumes = (album.volumes.length ? album.volumes : [{ name: "第一卷" }]).map((v, i) => {
  const extra = v as { en?: string; period?: string; note?: string };
  return {
    name: text(v.name) || `VOL.${i + 1}`,
    en: text(extra.en) || `VOLUME ${String(i + 1).padStart(2, "0")}`,
    /** Optional: the time span or event this drawer holds, e.g. "2026.05 — 2026.06". */
    period: text(extra.period),
    /** Optional: one line shown when the drawer is opened. */
    note: text(extra.note),
  };
});
const manifestPhotos = (album.photos as ManifestPhoto[]).filter((p) => assets[text(p.file)]);
// Photos without a volume are spread evenly, in order (12 → 3,3,2,2,2).
const autoVolume = (i: number, n: number) => {
  const base = Math.floor(n / VOLUMES), extra = n % VOLUMES;
  let end = 0;
  for (let v = 1; v <= VOLUMES; v++) {
    end += base + (v <= extra ? 1 : 0);
    if (i < end) return v;
  }
  return VOLUMES;
};

export const photoCount = manifestPhotos.length;
const photoRecords: ArchiveRecord[] = manifestPhotos.map((p, i) => {
  const asset = assets[text(p.file)];
  const no = String(i + 1).padStart(3, "0");
  const volume = Number.isInteger(p.volume) && p.volume! >= 1 && p.volume! <= VOLUMES
    ? p.volume!
    : autoVolume(i, manifestPhotos.length);
  const tags = list(p.tags);
  return {
    id: `X-${no}`,
    title: text(p.title) || `影像 ${no}`,
    en: text(p.en) || `MEMORY NO.${no}`,
    department: text(p.date) || asset.taken || "—",
    category: volumes[volume - 1].name,
    date: text(p.place) || "—",
    lead: tags.length ? tags.join(" / ") : "—",
    clearance: text(p.clearance) || "PRIVATE ARCHIVE",
    abstract: text(p.caption),
    findings: list(p.notes),
    source: "",
    tags,
    photo: asset,
    file: text(p.file),
  };
});
// Every column needs at least one file. A column without photos gets one
// "awaiting" cassette; an album with no photos at all keeps the original
// five-by-eight rhythm so the empty terminal still looks like the original.
const MIN_PER_VOLUME = photoRecords.length ? 1 : 8;
let placeholderNo = 0;
const placeholders: ArchiveRecord[] = volumes.flatMap((v) => {
  const have = photoRecords.filter((r) => r.category === v.name).length;
  return Array.from({ length: Math.max(0, MIN_PER_VOLUME - have) }, () => ({
    id: `X-${String(901 + placeholderNo++)}`,
    title: "待归档",
    en: "AWAITING ARCHIVE",
    department: "—",
    category: v.name,
    date: "—",
    lead: "—",
    clearance: "EMPTY SLOT",
    abstract: "",
    findings: [],
    source: "",
    tags: [],
  }));
});

export const records: ArchiveRecord[] = [...photoRecords, ...placeholders];
export const categories = ["全部档案", ...volumes.map((v) => v.name)];
// The original opens on the middle column; keep the first photo there by
// rotating which volume sits in the centre.
const first = records[0] ? volumes.findIndex((v) => v.name === records[0].category) : 0;
export const archiveColumns = volumes.map((_, lane) => volumes[(first + lane - 2 + VOLUMES * 2) % VOLUMES].name);

export function columnFiles(lane: number) {
  return records
    .map((record, index) => ({ record, index }))
    .filter(({ record }) => record.category === archiveColumns[lane])
    .map(({ index }) => index);
}
export function fileLocation(index: number) {
  const lane = archiveColumns.indexOf(records[index].category);
  const row = 12 + columnFiles(lane).indexOf(index);
  return { lane, row, slot: lane * 32 + row };
}
export function fileAtSlot(slot: number) {
  const files = columnFiles(Math.floor(slot / 32));
  return files[Math.max(0, Math.min(files.length - 1, (slot % 32) - 12))];
}
export const photoRecordIndexes = records.map((r, i) => (r.photo ? i : -1)).filter((i) => i >= 0);
