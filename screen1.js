(() => {
  "use strict";

  const VERSION = "20.3";
  const DESIGN = Object.freeze({ width: 390, height: 804.87, maxWidth: 430 });
  const home = document.getElementById("home");
  const artwork = document.getElementById("screen1-artwork");
  const start = document.getElementById("screen1-start");
  let report = { status: "loading", issues: [] };
  let locked = false;
  let unlockTimer;
  let activeObjectUrl = null;

  window.feilaweiScreen1 = Object.freeze({
    version: VERSION,
    design: DESIGN,
    getStatus: () => structuredClone(report)
  });

  function setStatus(status, issues = []) {
    report = { status, issues };
    home.dataset.assetStatus = status;
    home.setAttribute("aria-busy", "false");
    start.disabled = status !== "ready";
    document.dispatchEvent(new CustomEvent("feilawei:screen1status", {
      detail: structuredClone(report)
    }));
  }

  function validSha(value) {
    return /^[a-f0-9]{64}$/.test(value || "");
  }

  function validateBox(box) {
    if (!Array.isArray(box) || box.length !== 4 || !box.every(Number.isFinite)) return false;
    const [x, y, width, height] = box;
    return x >= 0 && y >= 0 && width > 0 && height > 0 &&
      x + width <= DESIGN.width + .1 && y + height <= DESIGN.height + .1;
  }

  function validateManifest(manifest) {
    const issues = [];
    if (manifest.schemaVersion !== 2 ||
        manifest.design?.width !== DESIGN.width ||
        manifest.design?.height !== DESIGN.height ||
        manifest.design?.maxWidth !== DESIGN.maxWidth) {
      issues.push("INVALID_DESIGN_SPEC");
    }
    if (manifest.approval?.assetsReady !== true ||
        manifest.approval?.strategy !== "canonical-artboard") {
      issues.push("PRODUCTION_ART_NOT_APPROVED");
    }
    if (!validSha(manifest.reference?.sha256) || !validSha(manifest.artboard?.sha256)) {
      issues.push("MISSING_OR_INVALID_HASH");
    }
    if (manifest.artboard?.file !== "./assets/v20/screen01_golden@2x.webp") {
      issues.push("UNEXPECTED_ARTBOARD_PATH");
    }
    if (manifest.artboard?.width < 780 || manifest.artboard?.height < 1610) {
      issues.push("INSUFFICIENT_RENDER_ASSET_SIZE");
    }
    const startHotspot = manifest.hotspots?.find(item => item.id === "start");
    if (!startHotspot || !validateBox(startHotspot.box)) {
      issues.push("INVALID_START_HOTSPOT");
    }
    return issues;
  }

  function positionHotspot(element, box) {
    const [x, y, width, height] = box;
    element.style.left = (x / DESIGN.width * 100) + "%";
    element.style.top = (y / DESIGN.height * 100) + "%";
    element.style.width = (width / DESIGN.width * 100) + "%";
    element.style.height = (height / DESIGN.height * 100) + "%";
  }

  async function verifiedImage(file, sha256) {
    const response = await fetch(file + "?v=" + VERSION, { cache: "no-store" });
    if (!response.ok) throw new Error("ARTBOARD_HTTP_" + response.status);
    const bytes = await response.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hash = Array.from(new Uint8Array(digest), byte =>
      byte.toString(16).padStart(2, "0")).join("");
    if (hash !== sha256) throw new Error("ARTBOARD_HASH_MISMATCH");

    const image = new Image();
    image.alt = "";
    image.className = "v20-golden-artboard";
    image.draggable = false;
    image.decoding = "async";
    const url = URL.createObjectURL(new Blob([bytes], { type: "image/webp" }));
    image.src = url;
    try {
      await image.decode();
    } catch {
      URL.revokeObjectURL(url);
      throw new Error("ARTBOARD_DECODE_FAILED");
    }
    if (image.naturalWidth < 780 || image.naturalHeight < 1610) {
      URL.revokeObjectURL(url);
      throw new Error("ARTBOARD_DIMENSION_MISMATCH");
    }
    return { image, url };
  }

  async function init() {
    try {
      const response = await fetch("./assets/v20/screen01_manifest.json?v=" + VERSION, { cache: "no-store" });
      if (!response.ok) throw new Error("MANIFEST_HTTP_" + response.status);
      const manifest = await response.json();
      const issues = validateManifest(manifest);
      if (issues.length) return setStatus("blocked", issues);

      const startHotspot = manifest.hotspots.find(item => item.id === "start");
      positionHotspot(start, startHotspot.box);

      const loaded = await verifiedImage(manifest.artboard.file, manifest.artboard.sha256);
      if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
      activeObjectUrl = loaded.url;
      artwork.replaceChildren(loaded.image);
      setStatus("ready");
    } catch (error) {
      artwork.replaceChildren();
      setStatus("blocked", [error.message]);
    }
  }

  function resetInteraction() {
    clearTimeout(unlockTimer);
    locked = false;
    delete start.dataset.pressed;
    home.classList.remove("v20-leaving");
  }

  function press() {
    if (!start.disabled && !locked) start.dataset.pressed = "true";
  }

  function release() {
    delete start.dataset.pressed;
  }

  start.addEventListener("pointerdown", press);
  ["pointerup", "pointercancel", "blur"].forEach(type => start.addEventListener(type, release));
  start.addEventListener("keydown", event => {
    if (event.key === " " || event.key === "Enter") press();
  });
  start.addEventListener("keyup", release);
  start.addEventListener("click", () => {
    if (start.disabled || locked) return;
    locked = true;
    const event = new CustomEvent("feilawei:start", {
      bubbles: true,
      cancelable: true,
      detail: { nextScreen: "travelType" }
    });
    if (!start.dispatchEvent(event)) home.classList.add("v20-leaving");
    unlockTimer = setTimeout(resetInteraction, 350);
  });

  window.addEventListener("pageshow", resetInteraction);
  window.addEventListener("pagehide", () => {
    if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = null;
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) release();
  });

  init();
})();
