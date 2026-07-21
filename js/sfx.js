(function (global) {
  const STORAGE_KEY = "mapmapmaps_sfx_muted_v1";
  let ctx = null;
  let muted = localStorage.getItem(STORAGE_KEY) === "1";

  function ensureCtx() {
    if (muted) return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!ctx) ctx = new Ctx();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }

  function tone(freq, start, dur, type, gain, detune = 0) {
    const ac = ensureCtx();
    if (!ac) return;
    const t0 = ac.currentTime + start;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (detune) osc.detune.setValueAtTime(detune, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function playStepComplete() {
    tone(523.25, 0, 0.12, "sine", 0.11);
    tone(659.25, 0.06, 0.14, "sine", 0.1);
    tone(783.99, 0.12, 0.18, "sine", 0.09);
  }

  function playStar(count) {
    if (count <= 0) return;
    const base = 880;
    for (let i = 0; i < count; i++) {
      tone(base * (1 + i * 0.12), i * 0.07, 0.1, "triangle", 0.07);
    }
  }

  function playScorePop() {
    tone(392, 0, 0.08, "sine", 0.06);
  }

  function playClick() {
    tone(240, 0, 0.04, "square", 0.025);
  }

  function playGameComplete() {
    const seq = [523.25, 659.25, 783.99, 1046.5];
    seq.forEach((f, i) => tone(f, i * 0.11, 0.22, "sine", 0.08));
  }

  function setMuted(value) {
    muted = Boolean(value);
    localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    updateToggleUi();
  }

  function toggleMuted() {
    setMuted(!muted);
    return muted;
  }

  function isMuted() {
    return muted;
  }

  let toggleBtn = null;

  function bindToggle(btn) {
    toggleBtn = btn;
    updateToggleUi();
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const nowMuted = toggleMuted();
      if (!nowMuted) {
        ensureCtx();
        playClick();
      }
    });
  }

  function updateToggleUi() {
    if (!toggleBtn) return;
    toggleBtn.classList.toggle("is-muted", muted);
    toggleBtn.setAttribute("aria-pressed", muted ? "true" : "false");
    const label = muted
      ? global.MapMapMapsI18n?.t("sfxUnmute") || "Unmute"
      : global.MapMapMapsI18n?.t("sfxMute") || "Mute";
    toggleBtn.setAttribute("aria-label", label);
    toggleBtn.setAttribute("title", label);
  }

  global.MapMapMapsSfx = {
    unlock: ensureCtx,
    playStepComplete,
    playStar,
    playScorePop,
    playClick,
    playGameComplete,
    setMuted,
    toggleMuted,
    isMuted,
    bindToggle,
    updateToggleUi,
  };
})(window);
