(() => {
  "use strict";

  const VERSION = "20.1";
  const DESIGN = Object.freeze({ width: 390, height: 788.4, maxWidth: 430 });
  const REQUIRED_LAYERS = [
    "decorations", "brand", "title", "mascot", "letsgo", "route",
    "condition", "blindbox", "reveal", "cta", "slogan"
  ];
  const home = document.getElementById("home");
  const artwork = document.getElementById("screen1-artwork");
  const start = document.getElementById("screen1-start");
  let report = { status: "loading", issues: [] };
  let locked = false;
  let unlockTimer;

  // QA can read diagnostics; there is no bypass for missing or unapproved art.
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

  function validateManifest(manifest) {
    const issues = [];
    if (manifest.schemaVersion !== 1 ||
        manifest.design?.width !== DESIGN.width ||
        manifest.design?.height !== DESIGN.height ||
        manifest.design?.maxWidth !== DESIGN.maxWidth) {
      issues.push("INVALID_DESIGN_SPEC");
    }
    if (manifest.approval?.assetsReady !== true ||
        !/^[a-f0-9]{64}$/.test(manifest.reference?.sha256 || "")) {
      issues.push("PRODUCTION_ART_NOT_APPROVED");
    }
    const layers = Array.isArray(manifest.layers) ? manifest.layers : [];
    const ids = layers.map(layer => layer.id);
    if (ids.length !== REQUIRED_LAYERS.length ||
        new Set(ids).size !== ids.length ||
        REQUIRED_LAYERS.some(id => !ids.includes(id))) {
      issues.push("INCOMPLETE_LAYER_SET");
    }
    for (const layer of layers) {
      if (typeof layer.file !== "string" ||
          !/^\.\/assets\/v20\/[a-zA-Z0-9_./-]+\.(svg|png|webp)$/.test(layer.file) ||
          layer.file.includes("..")) {
        issues.push("MISSING_LAYER:" + layer.id);
      }
      const [x, y, width, height] = layer.box || [];
      if (!Array.isArray(layer.box) || layer.box.length !== 4 ||
          !layer.box.every(Number.isFinite) ||
          x < 0 || y < 0 || width <= 0 || height <= 0 ||
          x + width > DESIGN.width + .1 || y + height > DESIGN.height + .1) {
        issues.push("INVALID_LAYER_BOX:" + layer.id);
      }
      if (!["vector", "raster"].includes(layer.kind)) {
        issues.push("INVALID_LAYER_KIND:" + layer.id);
      }
      if (layer.kind === "raster" && width >= DESIGN.width * .8 &&
          height >= DESIGN.height * .8) {
        issues.push("FULL_PAGE_RASTER:" + layer.id);
      }
    }
    return issues;
  }

  function position(image, box) {
    const [x, y, width, height] = box;
    image.style.left = (x / DESIGN.width * 100) + "%";
    image.style.top = (y / DESIGN.height * 100) + "%";
    image.style.width = (width / DESIGN.width * 100) + "%";
    image.style.height = (height / DESIGN.height * 100) + "%";
  }

  async function loadLayer(layer) {
    const image = new Image();
    image.alt = "";
    image.className = "v20-art-layer";
    image.dataset.layer = layer.id;
    image.draggable = false;
    image.decoding = "async";
    image.src = layer.file + "?v=" + VERSION;
    try {
      await image.decode();
    } catch {
      throw new Error("LAYER_DECODE_FAILED:" + layer.id);
    }
    if (layer.kind === "raster") {
      const scale = DESIGN.maxWidth / DESIGN.width * 2;
      if (image.naturalWidth < Math.ceil(layer.box[2] * scale) ||
          image.naturalHeight < Math.ceil(layer.box[3] * scale)) {
        throw new Error("INSUFFICIENT_RETINA_RESOLUTION:" + layer.id);
      }
    }
    if (layer.id !== "cta") position(image, layer.box);
    if (layer.id === "mascot") image.classList.add("v20-mascot-motion");
    return { layer, image };
  }

  async function init() {
    try {
      const response = await fetch("./assets/v20/screen01_manifest.json?v=" + VERSION);
      if (!response.ok) throw new Error("MANIFEST_HTTP_" + response.status);
      const manifest = await response.json();
      const issues = validateManifest(manifest);
      if (issues.length) return setStatus("blocked", issues);
      // Publish atomically: a missing layer must never leave a half-built home.
      const loaded = await Promise.all(manifest.layers.map(loadLayer));
      const fragment = document.createDocumentFragment();
      for (const { layer, image } of loaded) {
        if (layer.id === "cta") start.append(image);
        else fragment.append(image);
      }
      artwork.replaceChildren(fragment);
      setStatus("ready");
    } catch (error) {
      artwork.replaceChildren();
      start.replaceChildren();
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
  function release() { delete start.dataset.pressed; }
  start.addEventListener("pointerdown", press);
  for (const type of ["pointerup", "pointercancel", "blur"]) {
    start.addEventListener(type, release);
  }
  start.addEventListener("keydown", event => {
    if (event.key === " " || event.key === "Enter") press();
  });
  start.addEventListener("keyup", release);
  start.addEventListener("click", () => {
    if (start.disabled || locked) return;
    locked = true;
    // The future flow controller consumes this event. No Screen 2 is built here.
    const event = new CustomEvent("feilawei:start", {
      bubbles: true, cancelable: true, detail: { nextScreen: "travelType" }
    });
    if (!start.dispatchEvent(event)) home.classList.add("v20-leaving");
    unlockTimer = setTimeout(resetInteraction, 350);
  });
  window.addEventListener("pageshow", resetInteraction);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) release();
  });
  init();
})();
