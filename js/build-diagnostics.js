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

  function logBuildDiagnostics() {
    const client = clientBuild();
    const label = client
      ? `v${client.app} · ${client.git} · ${client.shell} · ui${client.ui}`
      : "client build unknown (missing js/version.js)";

    console.info(
      `%cMapMapMaps build%c ${label}`,
      "font-weight:700;color:#58cc02",
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

        if (client?.git && server.git && client.git !== server.git) {
          console.warn("MapMapMaps STALE CLIENT CACHE", {
            clientGit: client.git,
            serverGit: server.git,
            clientShell: client.shell,
            serverShell: server.shell,
          });
        }
        if (client?.ui != null && server.ui != null && client.ui !== server.ui) {
          console.warn("MapMapMaps UI generation mismatch", {
            clientUi: client.ui,
            serverUi: server.ui,
          });
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

    const refresh = (client, server) => {
      const stale =
        (client?.git && server?.git && client.git !== server.git) ||
        (client?.ui != null && server?.ui != null && client.ui !== server.ui);
      button.classList.toggle("is-stale", Boolean(stale));
      button.textContent = formatBadge(client, server);
      const title = [
        client ? `Client: ${client.app} ${client.git} (${client.shell})` : "Client: unknown",
        server ? `Server: ${server.app} ${server.git} (${server.shell})` : "Server: unknown",
        stale ? "— cache/deploy mismatch, hard refresh" : "",
      ]
        .filter(Boolean)
        .join("\n");
      button.title = title;
    };

    const client = clientBuild();
    refresh(client, null);

    button.addEventListener("click", () => {
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
