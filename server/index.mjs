/**
 * Production server for VPS: static site + /api/mapillary
 * Token: MAPILLARY_ACCESS_TOKEN env or --env-file (see DEPLOY_VPS.md)
 */

import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import {
  handleMapillaryAction,
  loadSeedsFromFile,
} from "../lib/mapillary-api.mjs";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SEEDS_PATH = join(ROOT, "data", "seeds.json");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 8787);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (key && val && process.env[key] == null) process.env[key] = val;
  }
}

function loadDevVarsFallback() {
  if (process.env.MAPILLARY_ACCESS_TOKEN) return;
  loadEnvFile(join(ROOT, ".env.local"));
  if (process.env.MAPILLARY_ACCESS_TOKEN) return;
  loadEnvFile(join(ROOT, ".dev.vars"));
}

loadDevVarsFallback();

const token = () => process.env.MAPILLARY_ACCESS_TOKEN || null;
const loadSeeds = () => loadSeedsFromFile(SEEDS_PATH);

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const action = url.searchParams.get("action") || "random";
  const result = await handleMapillaryAction({
    action,
    token: token(),
    loadSeeds,
  });
  sendJson(res, result.status, result.body);
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const rel = decoded === "/" ? "/index.html" : decoded;
  const resolved = normalize(join(ROOT, rel));
  if (!resolved.startsWith(ROOT)) return null;
  return resolved;
}

async function serveStatic(req, res, url) {
  let filePath = safePath(url.pathname);
  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  createReadStream(filePath).pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/api/mapillary") {
      await handleApi(req, res, url);
      return;
    }

    await serveStatic(req, res, url);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end("Internal error");
    }
  }
});

server.listen(PORT, HOST, () => {
  const hasToken = Boolean(token());
  console.log(`MapMapMaps listening on http://${HOST}:${PORT}`);
  console.log(hasToken ? "MAPILLARY_ACCESS_TOKEN: set" : "MAPILLARY_ACCESS_TOKEN: MISSING");
});
