import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

export function readPackageVersion(root) {
  try {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    return pkg.version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

export function readGitShort(root) {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

export function readShellCacheId(root) {
  try {
    const sw = readFileSync(join(root, "sw.js"), "utf8");
    const m = sw.match(/const CACHE = "([^"]+)"/);
    return m ? m[1] : "unknown";
  } catch {
    return "unknown";
  }
}

/** Bump when HUD/UX generation changes (compare client vs expected). */
export const UI_GENERATION = 5;

function readStampedVersion(root) {
  const path = join(root, "version.json");
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

export function getBuildInfo(root) {
  const indexPath = join(root, "index.html");
  let indexMtime = null;
  if (existsSync(indexPath)) {
    indexMtime = statSync(indexPath).mtime.toISOString();
  }
  const stamped = readStampedVersion(root);
  const git = stamped?.git || readGitShort(root);
  return {
    app: stamped?.app || readPackageVersion(root),
    git,
    shell: stamped?.shell || readShellCacheId(root),
    ui: stamped?.ui ?? UI_GENERATION,
    indexMtime: stamped?.indexMtime || indexMtime,
    builtAt: new Date().toISOString(),
    stampedAt: stamped?.stampedAt || null,
  };
}
