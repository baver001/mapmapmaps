document.addEventListener("DOMContentLoaded", () => {
  window.MapMapMapsBuild?.logBuildDiagnostics();

  if (window.MapMapMapsI18n) MapMapMapsI18n.applyStatic();
  const t = (key, vars) => window.MapMapMapsI18n?.t(key, vars) ?? key;
  const fmtNum = (n) => window.MapMapMapsI18n?.formatNumber(n) ?? String(n);
  const nominatimLang = () => window.MapMapMapsI18n?.localeTag?.() ?? "en";

  const sfxToggle = document.querySelector("#sfx-toggle");
  if (sfxToggle && window.MapMapMapsSfx) MapMapMapsSfx.bindToggle(sfxToggle);
  const unlockAudio = () => window.MapMapMapsSfx?.unlock();
  document.addEventListener("pointerdown", unlockAudio, { once: true, passive: true });

  const donateBtn = document.querySelector("#donate-btn");
  if (donateBtn) donateBtn.setAttribute("aria-label", t("donateTitle"));

  const appEl = document.querySelector("#app");
  const roundPill = document.querySelector("#round-pill");
  const scorePill = document.querySelector("#score-pill");
  const progressEl = document.querySelector("#progress");
  const runTrackFill = document.querySelector("#run-track-fill");
  const runPctEl = document.querySelector("#run-pct");
  const scoreChip = document.querySelector(".hud__score-chip");
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
  const mapPinHint = document.querySelector("#map-pin-hint");
  const mapPinHintText = document.querySelector("#map-pin-hint-text");
  const mapPinHintX = document.querySelector("#map-pin-hint-x");
  const nextBtn = document.querySelector("#next-btn");
  const resultEl = document.querySelector("#result");
  const resultRound = document.querySelector("#result-round");
  const resultScore = document.querySelector("#result-score");
  const resultDistance = document.querySelector("#result-distance");
  const resultGuessLabel = document.querySelector("#result-guess-label");
  const resultActualLabel = document.querySelector("#result-actual-label");
  const resultCheer = document.querySelector("#result-cheer");
  const resultGain = document.querySelector("#result-gain");
  const resultStars = document.querySelectorAll("#result-stars .result__star");
  const toastEl = document.querySelector("#toast");
  const gameCompleteEl = document.querySelector("#game-complete");
  const confettiCanvas = document.querySelector("#confetti-canvas");
  const gameCompleteBadge = document.querySelector("#game-complete-badge");
  const gameCompleteTotal = document.querySelector("#game-complete-total");
  const gameCompleteBest = document.querySelector("#game-complete-best");
  const gameCompleteSub = document.querySelector("#game-complete-sub");
  const gameCompletePlay = document.querySelector("#game-complete-play");

  function bind(el, type, handler, options) {
    if (!el) {
      console.warn(`MapMapMaps: missing element for "${type}" listener`);
      return;
    }
    el.addEventListener(type, handler, options);
  }

  const requiredElements = {
    app: appEl,
    roundPill,
    scorePill,
    progress: progressEl,
    runTrackFill,
    runPct: runPctEl,
    mapPanel,
    mapToggle,
    mapBack: mapBackBtn,
    mapGuess: mapGuessBtn,
    guessForm,
    guessInput,
    replace: replaceBtn,
    next: nextBtn,
    result: resultEl,
    gameComplete: gameCompleteEl,
    gameCompletePlay,
  };
  const missingElements = Object.entries(requiredElements)
    .filter(([, element]) => !element)
    .map(([name]) => name);
  if (missingElements.length) {
    console.error(`MapMapMaps: missing required elements: ${missingElements.join(", ")}`);
    preloader?.classList.add("hide");
    return;
  }

  const ROUNDS_PER_GAME = 5;
  const BEST_KEY = "mapmapmaps_personal_best_v1";
  const GAMES_KEY = "mapmapmaps_games_completed_v1";
  const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
  const MASCOT_PIN_SRC = "./image/mascot-pin.svg";

  function createMascotMarkerElement() {
    const el = document.createElement("div");
    el.className = "mascot-marker";
    const img = document.createElement("img");
    img.src = MASCOT_PIN_SRC;
    img.alt = "";
    img.width = 36;
    img.height = 44;
    el.appendChild(img);
    return el;
  }

  function addMascotMarker(lngLat, map, draggable) {
    return new maplibregl.Marker({
      element: createMascotMarkerElement(),
      anchor: "bottom",
      draggable: Boolean(draggable),
    })
      .setLngLat(lngLat)
      .addTo(map);
  }

  function syncMapPinHint() {
    if (!mapPinHint || !mapPinHintText) return;
    const hasPin = Boolean(pinLatLng);
    mapPinHintText.textContent = hasPin ? t("clearPin") : t("dropPin");
    mapPinHint.classList.toggle("is-clear", hasPin);
    mapPinHint.disabled = !hasPin;
    if (mapPinHintX) mapPinHintX.hidden = !hasPin;
    mapPinHint.setAttribute("aria-label", hasPin ? t("clearPin") : t("dropPin"));
  }

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
  let confettiRaf = null;

  function getPersonalBest() {
    return Number(localStorage.getItem(BEST_KEY) || 0);
  }

  const fmtPoints = (n) => window.MapMapMapsI18n?.formatPoints?.(n) ?? `${fmtNum(n)} ${t("pts")}`;

  function formatPts(n) {
    return fmtPoints(n);
  }

  function launchConfetti(durationMs = 4200) {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext("2d");
    if (!ctx) return;

    if (confettiRaf) cancelAnimationFrame(confettiRaf);

    const resize = () => {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#8b5cf6", "#ffd166", "#a78bfa", "#6d28d9", "#ef476f", "#ffffff", "#8338ec"];
    const w = () => confettiCanvas.width;
    const h = () => confettiCanvas.height;
    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random() * w(),
      y: -20 - Math.random() * h() * 0.6,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * 4 + 3,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.25,
      pw: 5 + Math.random() * 7,
      ph: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const start = performance.now();

    const frame = (now) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w(), h());

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.995;
        p.rot += p.vr;

        if (p.y > h() + 20) {
          p.y = -16;
          p.x = Math.random() * w();
          p.vy = Math.random() * 3 + 2;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.pw / 2, -p.ph / 2, p.pw, p.ph);
        ctx.restore();
      }

      if (elapsed < durationMs) {
        confettiRaf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w(), h());
        window.removeEventListener("resize", resize);
        confettiRaf = null;
      }
    };

    confettiRaf = requestAnimationFrame(frame);
  }

  function showGameComplete(totalScore) {
    const prevBest = getPersonalBest();
    const gamesBefore = Number(localStorage.getItem(GAMES_KEY) || 0);
    const isFirstFinish = gamesBefore === 0;
    const isNewRecord = totalScore > prevBest;

    if (isNewRecord) {
      localStorage.setItem(BEST_KEY, String(totalScore));
    }
    localStorage.setItem(GAMES_KEY, String(gamesBefore + 1));

    const bestNow = isNewRecord ? totalScore : prevBest;

    resultEl.hidden = true;
    gameCompleteEl.hidden = false;
    appEl.classList.add("is-result-open");

    gameCompleteTotal.textContent = formatPts(totalScore);
    gameCompleteBest.textContent = formatPts(bestNow);

    if (isFirstFinish) {
      gameCompleteBadge.hidden = false;
      gameCompleteBadge.textContent = t("firstComplete");
      gameCompleteSub.textContent = t("firstCompleteSub");
      launchConfetti();
      window.MapMapMapsSfx?.playGameComplete();
    } else if (isNewRecord) {
      gameCompleteBadge.hidden = false;
      gameCompleteBadge.textContent = t("newBest");
      gameCompleteSub.textContent = t("beatRecord", { score: formatPts(prevBest) });
      launchConfetti();
      window.MapMapMapsSfx?.playGameComplete();
    } else {
      gameCompleteBadge.hidden = true;
      const diff = bestNow - totalScore;
      gameCompleteSub.textContent =
        diff > 0
          ? t("awayFromRecord", { diff: formatPts(diff) })
          : t("greatRun");
    }
  }

  function closeGameCompleteAndRestart() {
    gameCompleteEl.hidden = true;
    appEl.classList.remove("is-result-open");
    roundIndex = 1;
    gameScore = 0;
    loadRound().catch(() => {});
  }

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

  function cheerMessage(points) {
    if (points >= 4500) return t("cheerPerfect");
    if (points >= 3500) return t("cheerBrilliant");
    if (points >= 2500) return t("cheerGreat");
    if (points >= 1500) return t("cheerNice");
    if (points >= 800) return t("cheerKeep");
    return t("cheerNext");
  }

  function starCount(points) {
    if (points >= 4000) return 3;
    if (points >= 2200) return 2;
    if (points >= 900) return 1;
    return 0;
  }

  function popScoreChip() {
    if (!scoreChip) return;
    scoreChip.classList.remove("is-pop");
    void scoreChip.offsetWidth;
    scoreChip.classList.add("is-pop");
  }

  function renderHud(options = {}) {
    if (!progressEl || !roundPill || !scorePill) return;
    const completedStops =
      options.completedStops ?? Math.max(0, roundIndex - 1);
    const pulseStep = options.pulseStep ?? null;
    const pct = Math.round((completedStops / ROUNDS_PER_GAME) * 100);

    if (completedStops >= ROUNDS_PER_GAME) {
      roundPill.textContent = t("runComplete");
    } else {
      roundPill.textContent = t("stopOf", { n: roundIndex, total: ROUNDS_PER_GAME });
    }
    scorePill.textContent = fmtNum(gameScore);
    if (runPctEl) runPctEl.textContent = `${pct}%`;
    if (runTrackFill) runTrackFill.style.width = `${pct}%`;

    const steps = progressEl.querySelectorAll(".run-step");
    steps.forEach((step, i) => {
      const n = i + 1;
      step.classList.remove("is-current", "is-done", "is-just-done");
      if (n <= completedStops) step.classList.add("is-done");
      else if (n === completedStops + 1 && completedStops < ROUNDS_PER_GAME) {
        step.classList.add("is-current");
      }
      if (pulseStep === n) step.classList.add("is-just-done");
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
    const mi = km * 0.621371;
    const i18n = window.MapMapMapsI18n;
    let main;
    if (i18n?.locale === "ru" && i18n.formatMeters && i18n.formatKilometers) {
      if (km < 1) main = i18n.formatMeters(km * 1000);
      else main = i18n.formatKilometers(km);
    } else if (km < 1) main = t("distanceM", { d: Math.round(km * 1000) });
    else if (km < 10) main = t("distanceKm1", { d: km.toFixed(1) });
    else main = t("distanceKm", { d: Math.round(km) });

    const miStr = mi < 10 ? mi.toFixed(1) : String(Math.round(mi));
    return `${main} (${miStr} mi)`;
  }

  function initMascotEyes() {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const mascot = document.querySelector("#hud-mascot");
    const eyes = document.querySelector("#mascot-eyes");
    const svg = document.querySelector(".hud__mascot-svg");
    if (!mascot || !eyes || !svg) return;

    const maxX = 2.4;
    const maxY = 2;
    let raf = 0;

    const aim = (clientX, clientY) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const box = mascot.getBoundingClientRect();
        const cx = box.left + box.width * 0.5;
        const cy = box.top + box.height * 0.36;
        const nx = (clientX - cx) / (box.width || 1);
        const ny = (clientY - cy) / (box.height || 1);
        const tx = Math.max(-maxX, Math.min(maxX, nx * 5));
        const ty = Math.max(-maxY, Math.min(maxY, ny * 4));
        eyes.setAttribute("transform", `translate(${tx.toFixed(2)} ${ty.toFixed(2)})`);
      });
    };

    document.addEventListener("pointermove", (e) => aim(e.clientX, e.clientY), { passive: true });
    document.addEventListener(
      "focusin",
      () => {
        const el = document.activeElement;
        if (!el || el === document.body) return;
        const r = el.getBoundingClientRect();
        aim(r.left + r.width / 2, r.top + r.height / 2);
      },
      true
    );

    const scheduleBlink = () => {
      const delay = 2800 + Math.random() * 5200;
      window.setTimeout(() => {
        if (document.hidden) {
          scheduleBlink();
          return;
        }
        svg.classList.remove("is-blink");
        void svg.offsetWidth;
        svg.classList.add("is-blink");
        window.setTimeout(() => svg.classList.remove("is-blink"), 180);
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
  }

  /** Short readable place label from Nominatim result or address parts. */
  function formatPlaceLabel(item) {
    if (!item) return t("unknown");
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
    return parts.slice(0, 2).join(", ") || item.display_name || t("unknown");
  }

  async function nominatim(path) {
    const elapsed = Date.now() - lastNominatimAt;
    if (elapsed < 1100) await wait(1100 - elapsed);
    lastNominatimAt = Date.now();

    const response = await fetch(`https://nominatim.openstreetmap.org${path}`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": nominatimLang(),
        "User-Agent": "MapMapMaps/1.4 (https://mapmapmaps.com; free geography game)",
      },
    });
    if (!response.ok) {
      if (response.status === 429) throw new Error(t("errGeocoderBusy"));
      throw new Error(t("errGeocoder", { status: response.status }));
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
    syncMapPinHint();
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
        pinMarker = addMascotMarker(e.lngLat, guessMap, true);
        pinMarker.on("dragend", () => {
          const p = pinMarker.getLngLat();
          pinLatLng = { lat: p.lat, lng: p.lng };
          updateMapGuessBtn();
        });
      }
      guessInput.value = "";
      hideAutocomplete();
      updateMapGuessBtn();
      syncMapPinHint();
      showToast(t("toastPin"));
    });

    guessMap.on("load", () => guessMap.resize());
    return guessMap;
  }

  function openMapPanel(open) {
    mapPanel.hidden = !open;
    appEl.classList.toggle("is-map-open", open);
    mapToggle.setAttribute("aria-expanded", open ? "true" : "false");
    mapToggle.textContent = open ? t("closeMap") : t("pickOnMap");

    if (open) {
      ensureGuessMap();
      setTimeout(() => guessMap?.resize(), 100);
      syncMapPinHint();
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
      throw new Error(data.error || data.message || t("errViewerConfig"));
    }
    accessToken = data.accessToken;
  }

  async function fetchRandomImage() {
    const response = await fetch("/api/mapillary?action=random");
    const data = await response.json();
    if (!response.ok || !data.id) {
      throw new Error(data.message || data.error || t("errLoadLocation"));
    }
    if (!data.isPano) throw new Error(t("errNonPano"));
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
        reject(event?.error || new Error(t("errViewer")));
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
    throw new Error(t("errSdk"));
  }

  async function loadRound() {
    if (loading) return;
    loading = true;
    roundLocked = false;
    resultEl.hidden = true;
    gameCompleteEl.hidden = true;
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
      throw lastErr || new Error(t("errRound"));
    } catch (err) {
      loading = false;
      showPreloader(false);
      showToast(err.message || t("toastLoadFailed"), 5000);
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

    resultCheer.textContent = cheerMessage(points);
    resultRound.textContent = t("stopCleared", { n: roundIndex });
    resultGain.textContent = `+${fmtNum(points)}`;
    resultScore.textContent = t("ptsTotal", { score: formatPts(gameScore) });
    resultDistance.textContent = formatDistance(km);
    resultGuessLabel.textContent = guessLabel;
    resultActualLabel.textContent = actualLabel;

    resultStars.forEach((star, i) => {
      star.classList.toggle("is-lit", i < starCount(points));
    });

    renderHud({ completedStops: roundIndex, pulseStep: roundIndex });
    popScoreChip();
    window.MapMapMapsSfx?.playStepComplete();
    window.MapMapMapsSfx?.playStar(starCount(points));
    window.MapMapMapsSfx?.playScorePop();

    nextBtn.textContent =
      roundIndex >= ROUNDS_PER_GAME ? t("finishRun") : t("nextStop");

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

      new maplibregl.Marker({ element: createMascotMarkerElement(), anchor: "bottom" })
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
    if (!data.length) throw new Error(t("errPlaceNotFound"));
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
        label = t("mapPin");
      } else if (!guess) {
        const query = guessInput.value.trim();
        if (!query) {
          showToast(t("toastTypeOrMap"));
          return;
        }
        hideAutocomplete();
        setGuessLoading(true);
        guess = await resolveTextGuess(query);
        label = guess.label;
      }

      setGuessLoading(true);
      roundLocked = true;
      window.MapMapMapsSfx?.playClick();
      const actual = { lat: currentImage.lat, lng: currentImage.lng };
      const km = haversineKm(guess, actual);
      const points = scoreForKm(km);
      const actualLabel = await reverseLabel(actual.lat, actual.lng);

      gameScore += points;
      renderHud();
      openMapPanel(false);
      showToast("");
      showResult(guess, actual, km, points, label, actualLabel);
    } catch (err) {
      roundLocked = false;
      showToast(err.message || t("toastGuessFailed"), 4000);
    } finally {
      setGuessLoading(false);
    }
  }

  function advanceRound() {
    if (roundIndex >= ROUNDS_PER_GAME) {
      showGameComplete(gameScore);
      return;
    }
    roundIndex += 1;
    loadRound().catch(() => {});
  }

  bind(guessForm, "submit", (e) => {
    e.preventDefault();
    submitGuess();
  });

  bind(guessInput, "keydown", (e) => {
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

  bind(guessInput, "input", () => {
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

  bind(guessInput, "blur", () => {
    if (pickingAutocomplete) return;
    setTimeout(() => {
      if (!pickingAutocomplete) hideAutocomplete();
    }, 150);
  });

  bind(mapToggle, "click", () => {
    if (roundLocked || loading) return;
    openMapPanel(mapPanel.hidden);
  });

  bind(mapBackBtn, "click", () => openMapPanel(false));

  bind(mapGuessBtn, "click", () => submitGuess());

  if (mapPinHint) {
    mapPinHint.addEventListener("click", () => {
      if (!pinLatLng) return;
      clearPin();
      showToast(t("toastPinCleared"));
    });
  }

  bind(replaceBtn, "click", () => {
    if (loading) return;
    loadRound().catch(() => {});
  });

  bind(nextBtn, "click", advanceRound);
  bind(gameCompletePlay, "click", closeGameCompleteAndRestart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !resultEl.hidden) {
      /* keep result open until next — no accidental dismiss */
    }
    if (e.key === "Escape" && resultEl.hidden && !mapPanel.hidden) {
      openMapPanel(false);
    }
  });

  renderHud();
  syncMapPinHint();
  initMascotEyes();
  loadRound().catch((err) => {
    console.error(err);
    alert(t("errStartup"));
  });
});
