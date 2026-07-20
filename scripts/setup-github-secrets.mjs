/**
 * One-time: push MAPILLARY + VPS credentials to GitHub Actions secrets from local files.
 * Requires: gh auth login, .dev.vars, deploy.config.json
 */

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseEnvFile(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

function ghSecretSet(name, value) {
  execFileSync("gh", ["secret", "set", name, "-b", value], {
    stdio: "inherit",
    cwd: ROOT,
  });
  console.log(`✓ ${name}`);
}

const dev = parseEnvFile(join(ROOT, ".dev.vars"));
const token = dev.MAPILLARY_ACCESS_TOKEN;
if (!token) {
  console.error("Missing MAPILLARY_ACCESS_TOKEN in .dev.vars");
  process.exit(1);
}

const cfgPath = join(ROOT, "deploy.config.json");
if (!existsSync(cfgPath)) {
  console.error("Create deploy.config.json from deploy.config.example.json");
  process.exit(1);
}

const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
const { vpsHost, vpsUser, vpsSshKeyPath, vpsPort } = cfg;
if (!vpsHost || !vpsUser || !vpsSshKeyPath) {
  console.error("deploy.config.json needs vpsHost, vpsUser, vpsSshKeyPath");
  process.exit(1);
}

if (!existsSync(vpsSshKeyPath)) {
  console.error(`SSH key not found: ${vpsSshKeyPath}`);
  process.exit(1);
}

const key = readFileSync(vpsSshKeyPath, "utf8");

ghSecretSet("MAPILLARY_ACCESS_TOKEN", token);
ghSecretSet("VPS_HOST", vpsHost);
ghSecretSet("VPS_USER", vpsUser);
ghSecretSet("VPS_SSH_KEY", key);
if (vpsPort && vpsPort !== "22") ghSecretSet("VPS_PORT", String(vpsPort));

console.log("\nDone. Push to main: git push origin main");
