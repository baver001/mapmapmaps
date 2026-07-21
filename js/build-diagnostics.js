/** Client-side build diagnostics (version.js + /api/version). Console only — no on-screen badge. */
(function (global) {
  const MAX_STALE_RELOADS = 3;

  function clientBuild() {
    return global.__MAPMAPMAPS_BUILD__ || null;
  }

  function isStale(client, server) {
    if (!client || !server) return false;
    if (client.shell && server.shell && client.shell !== server.shell) return true;
    if (client.git && server.git && client.git !== server.git) return true;
    if (client.ui != null && server.ui != null && client.ui !== server.ui) return true;
    return false;
  }

  function staleReloadKey(server) {
    return `mapmapmaps-stale-reload-${server.shell || "shell"}-${server.git}`;
  }

  function clearClientCaches() {
    const tasks = [
      global.caches?.keys().then((keys) => Promise.all(keys.map((k) => global.caches.delete(k)))) ??
        Promise.resolve(),
    ];
    const worker = global.navigator?.serviceWorker?.controller;
    if (worker) {
      tasks.push(
        new Promise((resolve) => {
          const ch = new MessageChannel();
          const done = () => resolve();
          ch.port1.onmessage = done;
          ch.port1.onmessageerror = done;
          worker.postMessage({ type: "clearShell" }, [ch.port2]);
          global.setTimeout(done, 400);
        })
      );
    }
    return Promise.all(tasks);
  }

  function maybeReloadForDeploy(server) {
    if (!server?.git) return Promise.resolve(false);
    const attemptKey = staleReloadKey(server);
    const attempts = Number(global.sessionStorage.getItem(attemptKey) || 0);
    if (attempts >= MAX_STALE_RELOADS) {
      console.warn(
        "MapMapMaps: client still out of date after reloads. Hard refresh (Ctrl+Shift+R) or clear site data for this origin."
      );
      return Promise.resolve(false);
    }
    global.sessionStorage.setItem(attemptKey, String(attempts + 1));
    console.info(
      "MapMapMaps: syncing to server deploy",
      server.git,
      `(attempt ${attempts + 1}/${MAX_STALE_RELOADS})`
    );
    return clearClientCaches().then(() => {
      const u = new URL(global.location.href);
      u.searchParams.set("_v", server.git);
      global.location.replace(u.pathname + u.search + u.hash);
      return true;
    });
  }

  function logBuildDiagnostics() {
    const client = clientBuild();
    const label = client
      ? `v${client.app} · ${client.git} · ${client.shell} · ui${client.ui}`
      : "client build unknown (missing js/version.js)";

    console.info(
      `%cMapMapMaps build%c ${label}`,
      "font-weight:700;color:#8b5cf6",
      "font-weight:600;color:inherit"
    );

    if (!client) {
      console.warn("MapMapMaps: stale or partial deploy — no __MAPMAPMAPS_BUILD__");
    }

    return fetch("/api/version", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((server) => {
        if (server) {
          console.info("MapMapMaps server:", server);
        } else {
          console.warn("MapMapMaps: /api/version unavailable");
          return { client, server: null };
        }

        if (isStale(client, server)) {
          console.warn("MapMapMaps STALE CLIENT CACHE", {
            clientGit: client?.git,
            serverGit: server.git,
            clientShell: client?.shell,
            serverShell: server.shell,
          });
          maybeReloadForDeploy(server);
        } else {
          global.sessionStorage.removeItem(staleReloadKey(server));
          const u = new URL(global.location.href);
          if (u.searchParams.has("_v")) {
            u.searchParams.delete("_v");
            global.history.replaceState(null, "", u.pathname + u.search + u.hash);
          }
        }
        return { client, server };
      })
      .catch((err) => {
        console.warn("MapMapMaps version check failed", err);
        return { client, server: null };
      });
  }

  global.MapMapMapsBuild = {
    clientBuild,
    logBuildDiagnostics,
  };
})(window);
