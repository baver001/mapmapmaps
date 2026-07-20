document.addEventListener("DOMContentLoaded", () => {
  const appEl = document.querySelector("#app");
  const roundPill = document.querySelector("#round-pill");
  const scorePill = document.querySelector("#score-pill");
  const progressEl = document.querySelector("#progress");
  const preloader = document.querySelector(".preloader");
  const mapPanel = document.querySelector("#map-panel");
  const mapToggle = document.querySelector("#map-toggle");
  const mapBackBtn = document.querySelector("#map-back");
  const mapGuessBtn = document.querySelector("#map-guess-btn");
  const guessForm = document.querySelector("#guess-form");
  const guessInput = document.querySelector("#guess-input");
  const autocompleteEl = document.querySelector("#autocomplete");
  const guessBtn = document.querySelector("#guess-btn");
  const replaceBtn = document.querySelector("#replace-btn");
  const clearPinBtn = document.querySelector("#clear-pin");
  const nextBtn = document.querySelector("#next-btn");
  const resultEl = document.querySelector("#result");
  const resultRound = document.querySelector("#result-round");
  const resultScore = document.querySelector("#result-score");
  const resultDistance = document.querySelector("#result-distance");
  const resultGuessLabel = document.querySelector("#result-guess-label");
  const resultActualLabel = document.querySelector("#result-actual-label");
  const toastEl = document.querySelector("#toast");

  const ROUNDS_PER_GAME = 5;
  const SCORE_KEY = "mapmapmaps_total_v4";
  const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

  let viewer = null;
  let accessToken = null;
  let currentImage = null;
  let pinLatLng = null;
  let pinMarker = null;
  let roundLocked = false;
  let loading = false;
  let roundIndex = 1;
  let gameScore = 0;

  let guessMap = null;
  let resultMap = null;
  let lastNominatimAt = 0;
  let autocompleteTimer = null;
  let pickingAutocomplete = false;
  let toastTimer = null;

  function showToast(text, ms = 3200) {
    if (!text) {
      toastEl.hidden = true;
      return;
    }
    toastEl.textContent = text;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, ms);
  }

  function renderHud() {
    roundPill.textContent = `Round ${roundIndex}/${ROUNDS_PER_GAME}`;
    scorePill.textContent = `${gameScore.toLocaleString("en-US")} pts`;

    const dots = progressEl.querySelectorAll(".hud__dot");
    dots.forEach((dot, i) => {
      dot.classList.remove("is-active", "is-done");
      if (i + 1 < roundIndex) dot.classList.add("is-done");
      else if (i + 1 === roundIndex) dot.classList.add("is-active");
    });
  }

  function showPreloader(show) {
    preloader.classList.toggle("hide", !show);
  }

  function setGuessLoading(on) {
    guessBtn.disabled = on;
    guessBtn.classList.toggle("is-loading", on);
    mapGuessBtn.disabled = on || !pinLatLng;
    mapGuessBtn.classList.toggle("is-loading", on);
  }

  function wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function haversineKm(a, b) {
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  }

  function scoreForKm(km) {
    return Math.round(5000 * Math.exp(-km / 2000));
  }

  function formatDistance(km) {
    if (km < 1) return `${Math.round(km * 1000)} m away`;
    if (km < 10) return `${km.toFixed(1)} km away`;
    return `${Math.round(km)} km away`;
  }

  /** Short readable place label from Nominatim result or address parts. */
  function formatPlaceLabel(item) {
    if (!item) return "Unknown";
    if (typeof item === "string") {
      const parts = item.split(",").map((s) => s.trim());
      if (parts.length <= 2) return item;
      return parts.slice(0, 2).join(", ");
    }
    const a = item.address || {};
    const city =
      a.city || a.town || a.village || a.municipality || a.county || a.state || "";
    const country = a.country || "";
    const short = [city, country].filter(Boolean).join(", ");
    if (short) return short;
    const parts = (item.display_name || "").split(",").map((s) => s.trim());
    return parts.slice(0, 2).join(", ") || item.display_name || "Unknown";
  }

  async function nominatim(path) {
    const elapsed = Date.now() - lastNominatimAt;
    if (elapsed < 1100) await wait(1100 - elapsed);
    lastNominatimAt = Date.now();

    const response = await fetch(`https://nominatim.openstreetmap.org${path}`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        "User-Agent": "MapMapMaps/1.4 (https://mapmapmaps.com; free geography game)",
      },
    });
    if (!response.ok) {
      if (response.status === 429) throw new Error("Geocoder busy — wait a moment");
      throw new Error(`Geocoder error (${response.status})`);
    }
    return response.json();
  }

  async function reverseLabel(lat, lng) {
    try {
      const data = await nominatim(
        `/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
      );
      return formatPlaceLabel(data);
    } catch {
      return `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
    }
  }

  function hideAutocomplete() {
    autocompleteEl.hidden = true;
    autocompleteEl.innerHTML = "";
    pickingAutocomplete = false;
  }

  function showAutocomplete(items) {
    autocompleteEl.innerHTML = "";
    if (!items.length) {
      hideAutocomplete();
      return;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = formatPlaceLabel(item);
      li.title = item.display_name;
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        pickingAutocomplete = true;
      });
      li.addEventListener("click", () => {
        guessInput.value = formatPlaceLabel(item);
        hideAutocomplete();
        clearPin();
        submitGuess({
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          label: formatPlaceLabel(item),
        });
      });
      autocompleteEl.appendChild(li);
    });
    autocompleteEl.hidden = false;
  }

  function updateMapGuessBtn() {
    mapGuessBtn.disabled = !pinLatLng || roundLocked || loading;
  }

  function clearPin() {
    pinLatLng = null;
    if (pinMarker) {
      pinMarker.remove();
      pinMarker = null;
    }
    updateMapGuessBtn();
  }

  function ensureGuessMap() {
    if (guessMap) {
      guessMap.resize();
      return guessMap;
    }

    guessMap = new maplibregl.Map({
      container: "guess-map",
      style: MAP_STYLE,
      center: [0, 20],
      zoom: 1.2,
      attributionControl: true,
    });
    guessMap.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    guessMap.on("click", (e) => {
      if (roundLocked || loading) return;
      pinLatLng = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      if (pinMarker) pinMarker.setLngLat(e.lngLat);
      else {
        pinMarker = new maplibregl.Marker({ color: "#ff6b35", draggable: true })
          .setLngLat(e.lngLat)
          .addTo(guessMap);
        pinMarker.on("dragend", () => {
          const p = pinMarker.getLngLat();
          pinLatLng = { lat: p.lat, lng: p.lng };
          updateMapGuessBtn();
        });
      }
      guessInput.value = "";
      hideAutocomplete();
      updateMapGuessBtn();
      showToast("Pin placed — press Guess");
    });

    guessMap.on("load", () => guessMap.resize());
    return guessMap;
  }

  function openMapPanel(open) {
    mapPanel.hidden = !open;
    appEl.classList.toggle("is-map-open", open);
    mapToggle.setAttribute("aria-expanded", open ? "true" : "false");
    mapToggle.textContent = open ? "Close map" : "Open map";

    if (open) {
      ensureGuessMap();
      setTimeout(() => guessMap?.resize(), 100);
    } else {
      showToast("");
    }
  }

  function resetRoundUi() {
    guessInput.value = "";
    hideAutocomplete();
    clearPin();
    if (guessMap) guessMap.jumpTo({ center: [0, 20], zoom: 1.2 });
    openMapPanel(false);
    appEl.classList.remove("is-result-open");
    showToast("");
  }

  async function loadConfig() {
    const response = await fetch("/api/mapillary?action=config");
    const data = await response.json();
    if (!response.ok || !data.accessToken) {
      throw new Error(data.error || data.message || "Viewer config unavailable");
    }
    accessToken = data.accessToken;
  }

  async function fetchRandomImage() {
    const response = await fetch("/api/mapillary?action=random");
    const data = await response.json();
    if (!response.ok || !data.id) {
      throw new Error(data.message || data.error || "Failed to load location");
    }
    if (!data.isPano) throw new Error("Non-360 image rejected");
    return data;
  }

  function destroyViewer() {
    if (!viewer) return;
    try {
      viewer.remove();
    } catch {
      /* ignore */
    }
    viewer = null;
  }

  async function createViewer(image) {
    destroyViewer();
    currentImage = image;

    viewer = new mapillary.Viewer({
      accessToken,
      container: "panorama",
      component: {
        cover: false,
        bearing: false,
        zoom: true,
        sequence: true,
      },
    });

    await new Promise((resolve, reject) => {
      const onImage = () => {
        cleanup();
        resolve();
      };
      const onError = (event) => {
        cleanup();
        reject(event?.error || new Error("Viewer error"));
      };
      const cleanup = () => {
        viewer.off("image", onImage);
        viewer.off("error", onError);
      };
      viewer.on("image", onImage);
      viewer.on("error", onError);
      viewer.moveTo(image.id).catch(onError);
    });
  }

  async function ensureSdk() {
    if (typeof mapillary !== "undefined" && typeof maplibregl !== "undefined") return;
    for (let i = 0; i < 20; i++) {
      await wait(200);
      if (typeof mapillary !== "undefined" && typeof maplibregl !== "undefined") return;
    }
    throw new Error("Failed to load Mapillary or MapLibre");
  }

  async function loadRound() {
    if (loading) return;
    loading = true;
    roundLocked = false;
    resultEl.hidden = true;
    resetRoundUi();
    showPreloader(true);
    renderHud();

    try {
      await ensureSdk();
      if (!accessToken) await loadConfig();

      let lastErr = null;
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          const image = await fetchRandomImage();
          await createViewer(image);
          showPreloader(false);
          guessInput.focus();
          loading = false;
          return;
        } catch (err) {
          lastErr = err;
          console.warn("round attempt", err);
          destroyViewer();
        }
      }
      throw lastErr || new Error("Could not start a round");
    } catch (err) {
      loading = false;
      showPreloader(false);
      showToast(err.message || "Load failed", 5000);
      throw err;
    }
  }

  function fitResultBounds(map, guess, actual) {
    const bounds = new maplibregl.LngLatBounds();
    bounds.extend([guess.lng, guess.lat]);
    bounds.extend([actual.lng, actual.lat]);
    map.fitBounds(bounds, { padding: 56, maxZoom: 10, duration: 0 });
  }

  function showResult(guess, actual, km, points, guessLabel, actualLabel) {
    resultEl.hidden = false;
    appEl.classList.add("is-result-open");

    resultRound.textContent = `Round ${roundIndex} of ${ROUNDS_PER_GAME}`;
    resultScore.textContent = `${points.toLocaleString("en-US")} pts`;
    resultDistance.textContent = formatDistance(km);
    resultGuessLabel.textContent = guessLabel;
    resultActualLabel.textContent = actualLabel;

    nextBtn.textContent =
      roundIndex >= ROUNDS_PER_GAME ? "New game" : "Next round";

    if (resultMap) {
      resultMap.remove();
      resultMap = null;
    }

    resultMap = new maplibregl.Map({
      container: "result-map",
      style: MAP_STYLE,
      center: [(guess.lng + actual.lng) / 2, (guess.lat + actual.lat) / 2],
      zoom: 2,
      interactive: true,
      attributionControl: false,
    });

    resultMap.on("load", () => {
      resultMap.addSource("line", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [guess.lng, guess.lat],
              [actual.lng, actual.lat],
            ],
          },
        },
      });
      resultMap.addLayer({
        id: "line",
        type: "line",
        source: "line",
        paint: {
          "line-color": "#334155",
          "line-width": 2.5,
          "line-dasharray": [2, 2],
        },
      });

      new maplibregl.Marker({ color: "#2563eb" })
        .setLngLat([guess.lng, guess.lat])
        .addTo(resultMap);
      new maplibregl.Marker({ color: "#059669" })
        .setLngLat([actual.lng, actual.lat])
        .addTo(resultMap);

      fitResultBounds(resultMap, guess, actual);
      resultMap.resize();
    });
  }

  async function resolveTextGuess(query) {
    const data = await nominatim(
      `/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`
    );
    if (!data.length) throw new Error("Place not found — try another spelling");
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      label: formatPlaceLabel(data[0]),
    };
  }

  async function submitGuess(preresolved) {
    if (roundLocked || loading || !currentImage) return;

    let guess = preresolved || null;
    let label = preresolved?.label || "";

    try {
      if (!guess && pinLatLng && !guessInput.value.trim()) {
        guess = { ...pinLatLng };
        label = "Map pin";
      } else if (!guess) {
        const query = guessInput.value.trim();
        if (!query) {
          showToast("Type a city or open the map");
          return;
        }
        hideAutocomplete();
        setGuessLoading(true);
        guess = await resolveTextGuess(query);
        label = guess.label;
      }

      setGuessLoading(true);
      roundLocked = true;
      const actual = { lat: currentImage.lat, lng: currentImage.lng };
      const km = haversineKm(guess, actual);
      const points = scoreForKm(km);
      const actualLabel = await reverseLabel(actual.lat, actual.lng);

      gameScore += points;
      localStorage.setItem(
        SCORE_KEY,
        String(Number(localStorage.getItem(SCORE_KEY) || 0) + points)
      );
      renderHud();
      openMapPanel(false);
      showToast("");
      showResult(guess, actual, km, points, label, actualLabel);
    } catch (err) {
      roundLocked = false;
      showToast(err.message || "Guess failed", 4000);
    } finally {
      setGuessLoading(false);
    }
  }

  function advanceRound() {
    if (roundIndex >= ROUNDS_PER_GAME) {
      roundIndex = 1;
      gameScore = 0;
    } else {
      roundIndex += 1;
    }
    loadRound().catch(() => {});
  }

  guessForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitGuess();
  });

  guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideAutocomplete();
      if (mapPanel.hidden === false) openMapPanel(false);
    }
    if (e.key === "m" || e.key === "M") {
      if (document.activeElement === guessInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        openMapPanel(mapPanel.hidden);
      }
    }
  });

  guessInput.addEventListener("input", () => {
    const query = guessInput.value.trim();
    clearTimeout(autocompleteTimer);
    hideAutocomplete();
    if (query.length < 3 || roundLocked) return;

    autocompleteTimer = setTimeout(async () => {
      try {
        const data = await nominatim(
          `/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
        );
        if (guessInput.value.trim() === query) showAutocomplete(data || []);
      } catch (err) {
        console.warn("autocomplete", err);
      }
    }, 450);
  });

  guessInput.addEventListener("blur", () => {
    if (pickingAutocomplete) return;
    setTimeout(() => {
      if (!pickingAutocomplete) hideAutocomplete();
    }, 150);
  });

  mapToggle.addEventListener("click", () => {
    if (roundLocked || loading) return;
    openMapPanel(mapPanel.hidden);
  });

  mapBackBtn.addEventListener("click", () => openMapPanel(false));

  mapGuessBtn.addEventListener("click", () => submitGuess());

  clearPinBtn.addEventListener("click", () => {
    clearPin();
    showToast("Pin cleared");
  });

  replaceBtn.addEventListener("click", () => {
    if (loading) return;
    loadRound().catch(() => {});
  });

  nextBtn.addEventListener("click", advanceRound);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !resultEl.hidden) {
      /* keep result open until next — no accidental dismiss */
    }
    if (e.key === "Escape" && resultEl.hidden && !mapPanel.hidden) {
      openMapPanel(false);
    }
  });

  renderHud();
  loadRound().catch((err) => {
    console.error(err);
    alert(
      "Could not start MapMapMaps. Ensure MAPILLARY_ACCESS_TOKEN is set and run npm run seeds."
    );
  });
});
