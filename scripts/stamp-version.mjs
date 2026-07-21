/**
 * Writes js/version.js + version.json and bumps ?v= on script/sw in index.html.
 * Run after deploy: node scripts/stamp-version.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getBuildInfo, UI_GENERATION } from "../lib/build-info.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const info = getBuildInfo(ROOT);
info.ui = UI_GENERATION;
info.stampedAt = new Date().toISOString();

writeFileSync(join(ROOT, "version.json"), `${JSON.stringify(info, null, 2)}\n`, "utf8");

const js = `/* Auto-generated — do not edit. Run: npm run stamp */
window.__MAPMAPMAPS_BUILD__ = ${JSON.stringify(info, null, 2)};
`;
writeFileSync(join(ROOT, "js", "version.js"), js, "utf8");

const indexPath = join(ROOT, "index.html");
let html = readFileSync(indexPath, "utf8");
const v = info.git;
html = html.replace(/\/script\.js(\?v=[^"'`]*)?"/g, `/script.js?v=${v}"`);
html = html.replace(/\/sw\.js(\?v=[^"'`]*)?"/g, `/sw.js?v=${v}"`);
html = html.replace(/\/js\/build-diagnostics\.js(\?v=[^"'`]*)?"/g, `/js/build-diagnostics.js?v=${v}"`);
html = html.replace(/\/js\/version\.js(\?v=[^"'`]*)?"/g, `/js/version.js?v=${v}"`);
html = html.replace(/\/css\/style\.css(\?v=[^"'`]*)?"/g, `/css/style.css?v=${v}"`);
html = html.replace(
  /<meta name="mapmapmaps-build" content="[^"]*"\s*\/?>/,
  `<meta name="mapmapmaps-build" content="${info.app}+${info.git}+ui${info.ui}" />`
);
if (!html.includes('name="mapmapmaps-build"')) {
  html = html.replace(
    /<meta name="theme-color"/,
    `<meta name="mapmapmaps-build" content="${info.app}+${info.git}+ui${info.ui}" />\n    <meta name="theme-color"`
  );
}
writeFileSync(indexPath, html, "utf8");

console.log(JSON.stringify(info, null, 2));
