/** Client-side build diagnostics (version.js + /api/version). */
(function (global) {
  function clientBuild() {
    return global.__MAPMAPMAPS_BUILD__ || null;
  }

  function formatBadge(client, server) {
    const app = server?.app || client?.app || "?";
    const git = server?.git || client?.git || "?";
    const ui = server?.ui ?? client?.ui ?? "?";
    return `v${app} · ${git} · ui${ui}`;
  }

  function isStale(client, server) {
    if (!client || !server) return false;
    if (client.git && server.git && client.git !== server.git) return true;
    if (client.ui != null && server.ui != null && client.ui !== server.ui) return true;
    return false;
  }

  function maybeReloadForDeploy(server) {
    if (!server?.git) return false;
    const key = `mapmapmaps-reload-${server.git}`;
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
            clientUi: client?.ui,
            serverUi: server.ui,
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

  function mountBuildBadge(button) {
    if (!button) return () => {};
    button.hidden = false;

    let lastPair = { client: clientBuild(), server: null };

    const refresh = (client, server) => {
      lastPair = { client, server };
      const stale = isStale(client, server);
      button.classList.toggle("is-stale", stale);
      button.textContent = formatBadge(client, server);
      const title = [
        client ? `Client: ${client.app} ${client.git} (${client.shell})` : "Client: unknown",
        server ? `Server: ${server.app} ${server.git} (${server.shell})` : "Server: unknown",
        stale ? "— click to reload and pick up new deploy" : "Click to copy build info",
      ]
        .filter(Boolean)
        .join("\n");
      button.title = title;
    };

    refresh(lastPair.client, null);

    button.addEventListener("click", () => {
      if (isStale(lastPair.client, lastPair.server)) {
        global.location.reload();
        return;
      }
      const text = button.title || button.textContent;
      navigator.clipboard?.writeText(text).catch(() => {});
    });

    return (pair) => refresh(pair.client, pair.server);
  }

  global.MapMapMapsBuild = {
    clientBuild,
    logBuildDiagnostics,
    mountBuildBadge,
  };
})(window);
