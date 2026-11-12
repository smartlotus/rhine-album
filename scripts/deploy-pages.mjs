// Publish dist/ to this repository's own gh-pages branch (GitHub Pages).
// Run through `npm run deploy:pages`, which builds with BASE_PATH=/rhine-album/.
// Uses a git worktree and an ordinary (non-force) commit on gh-pages.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const git = (args, cwd = process.cwd()) => execFileSync("git", args, { cwd, stdio: ["ignore", "pipe", "inherit"] }).toString().trim();
if (!existsSync("dist/index.html")) throw new Error("先运行 npm run build:pages");
const remote = process.env.PAGES_REMOTE ?? "origin";
const source = git(["rev-parse", "--short", "HEAD"]);
const dir = mkdtempSync(join(tmpdir(), "rhine-pages-"));
let hasBranch = true;
try { git(["fetch", remote, "gh-pages"]); } catch { hasBranch = false; }
if (hasBranch) git(["worktree", "add", "-B", "gh-pages", dir, `${remote}/gh-pages`]);
else { git(["worktree", "add", "--detach", dir]); git(["checkout", "--orphan", "gh-pages"], dir); }
try {
  for (const name of readdirSync(dir)) if (name !== ".git") rmSync(join(dir, name), { recursive: true, force: true });
  cpSync("dist", dir, { recursive: true });
  writeFileSync(join(dir, ".nojekyll"), "");
  git(["add", "-A"], dir);
  const changed = execFileSync("git", ["status", "--porcelain"], { cwd: dir }).toString().trim();
  if (!changed) console.log("gh-pages 已是最新，无需发布。");
  else {
    git(["commit", "-m", `Deploy album from ${source}`], dir);
    git(["push", remote, "gh-pages"], dir);
    console.log(`已发布到 ${remote}/gh-pages（来源 ${source}）。`);
  }
} finally {
  git(["worktree", "remove", "--force", dir]);
}
