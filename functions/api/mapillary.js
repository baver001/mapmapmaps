/**
 * Cloudflare Pages Function — thin wrapper around lib/mapillary-api.mjs
 */

import {
  handleMapillaryAction,
  loadSeedsFromRequest,
} from "../../lib/mapillary-api.mjs";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "random";
  const token = env.MAPILLARY_ACCESS_TOKEN || null;
  const loadSeeds = () => loadSeedsFromRequest(request, env);

  const result = await handleMapillaryAction({ action, token, loadSeeds });
  return json(result.body, result.status);
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
