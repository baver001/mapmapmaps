/** Client-side build diagnostics (version.js + /api/version). Console only — no on-screen badge. */
(function (global) {
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

  function maybeReloadForDeploy(server) {
    if (!server?.git) return false;
    const key = `mapmapmaps-reload-${server.shell || "shell"}-${server.git}`;
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
    console.info("MapMapMaps: new deploy detected, reloading…", server.git);
    global.location.reload();
    return true;
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
