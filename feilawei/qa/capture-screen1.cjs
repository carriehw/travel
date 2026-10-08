/* Capture real home output separately from synthetic engineering fixtures. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");
const { createHash } = require("node:crypto");
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const root = path.resolve(__dirname, "..");
const output = path.resolve(process.argv[2] || path.join(root, "docs/qa/latest"));
const widths = [375, 390, 393, 430];
const heights = { 375: 667, 390: 844, 393: 852, 430: 932 };
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };
const server = http.createServer(async (request, response) => {
  try {
    const name = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = path.resolve(root, "." + (name.endsWith("/") ? name + "index.html" : name));
    if (!file.startsWith(root + path.sep)) throw new Error("Outside root");
    response.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
    response.end(await fs.readFile(file));
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});
const report = {
  visualVerdict: "FAIL",
  note: "Screenshots are real home output. Synthetic controls checks do not prove visual fidelity.",
  cases: [], engineering: [], unavailableBrowsers: [],
};

function check(name, fn) {
  return Promise.resolve().then(fn).then(() => {
    report.engineering.push({ name, status: "PASS" });
  }).catch(error => {
    report.engineering.push({ name, status: "FAIL", error: error.message });
  });
}

async function waitForHome(page) {
  await page.waitForFunction(() =>
    window.feilaweiScreen1 && window.feilaweiScreen1.getStatus().status !== "loading");
}

async function geometry(page) {
  return page.evaluate(() => {
    const board = document.querySelector(".v20-artboard").getBoundingClientRect();
    const cta = document.getElementById("screen1-start").getBoundingClientRect();
    return {
      board: { x: board.x, y: board.y, width: board.width, height: board.height },
      cta: { x: cta.x - board.x, y: cta.y - board.y, width: cta.width, height: cta.height },
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      assetStatus: window.feilaweiScreen1.getStatus(),
      imageCount: document.images.length,
      disabled: document.getElementById("screen1-start").disabled,
    };
  });
}

async function capture(browser, engine, base) {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: heights[width] }, deviceScaleFactor: 3,
      isMobile: true, hasTouch: true, reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [], badResponses = [], requests = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => { if (response.status() >= 400) badResponses.push(response.url()); });
    page.on("request", request => requests.push(new URL(request.url()).pathname));
    await page.goto(base);
    await waitForHome(page);
    const normal = await geometry(page);
    const prefix = engine + "-" + width;
    await page.screenshot({ path: path.join(output, prefix + "-viewport.png"), scale: "css" });
    await page.locator(".v20-artboard").screenshot({
      path: path.join(output, prefix + "-live.png"), scale: "css", animations: "disabled",
    });
    await page.setViewportSize({ width, height: 568 });
    const short = await geometry(page);
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    const bottomVisible = await page.evaluate(() =>
      document.querySelector(".v20-artboard").getBoundingClientRect().bottom <= innerHeight + 1);
    await page.screenshot({ path: path.join(output, prefix + "-short-bottom.png"), scale: "css" });
    report.cases.push({
      engine, width, viewportHeight: heights[width], deviceScaleFactor: 3,
      normal, short, bottomVisible, errors, badResponses, requests,
      live: prefix + "-live.png",
    });
    await check(prefix + ": proportional artboard, CTA and short viewport", () => {
      const scale = width / 390;
      const expected = { x: 33.9, y: 651.1, width: 333.5, height: 83.7 };
      assert.ok(Math.abs(normal.board.height - 788.4 * scale) < .1);
      assert.equal(normal.board.width, width);
      for (const [key, value] of Object.entries(expected)) {
        assert.ok(Math.abs(normal.cta[key] - value * scale) < .1, "CTA " + key);
      }
      assert.ok(normal.cta.height >= 56);
      assert.ok(Math.abs(short.board.height - normal.board.height) < .1);
      assert.equal(normal.horizontalOverflow || short.horizontalOverflow, false);
      assert.equal(bottomVisible, true);
      assert.deepEqual(errors, []);
      assert.deepEqual(badResponses, []);
      assert.equal(requests.some(name => /style\.css|app\.js|prototype|assets\/master/.test(name)), false);
    });
    await context.close();
  }
}

async function controls(browser, engine, base) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await context.newPage();
  await check(engine + ": absent artwork cannot enable CTA or load legacy UI", async () => {
    await page.goto(base);
    await waitForHome(page);
    const status = await geometry(page);
    assert.equal(status.assetStatus.status, "blocked");
    assert.equal(status.disabled, true);
    assert.equal(status.imageCount, 0);
    assert.equal(await page.locator("#travelType").count(), 0);
    const ids = await page.locator("[id]").evaluateAll(nodes => nodes.map(node => node.id));
    assert.equal(new Set(ids).size, ids.length);
    assert.deepEqual(await page.locator("h1, h2, li, button, [lang=en], .sr-only > p").allTextContents(),
      ["飛啦喂！", "外星旅人・地球導遊", "想去邊？抽咗先算。", "揀條件，話你知想點玩",
        "揀盲盒，揀你心儀嘅盒", "揭曉下一站，睇吓去邊！", "",
        "You only live once", "人生得一次，仲等咩？飛啦喂！"]);
  });

  // Plain rectangles are transport/interaction fixtures, never approved artwork.
  const manifest = JSON.parse(await fs.readFile(path.join(root, "assets/v20/screen01_manifest.json"), "utf8"));
  manifest.approval.assetsReady = true;
  manifest.reference.sha256 = "0".repeat(64);
  const fixtures = new Map();
  for (const layer of manifest.layers) {
    layer.kind = "vector";
    layer.file = "./assets/v20/qa-fixture-" + layer.id + ".svg";
    const [, , w, h] = layer.box;
    const body = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h +
      '"><rect width="' + w + '" height="' + h + '" fill="#eee"/></svg>';
    fixtures.set(layer.id, body);
    layer.sha256 = createHash("sha256").update(body).digest("hex");
    layer.source = "Synthetic QA rectangle; not approved artwork";
  }
  await page.route("**/screen01_manifest.json?*", route => route.fulfill({ json: manifest }));
  await page.route("**/qa-fixture-*.svg?*", route => {
    const id = new URL(route.request().url()).pathname.split("qa-fixture-")[1].split(".")[0];
    return route.fulfill({ contentType: "image/svg+xml", body: fixtures.get(id) });
  });
  await check(engine + ": synthetic valid layers load atomically, tap once, keyboard and refresh", async () => {
    await page.addInitScript(() => {
      localStorage.setItem("flw_recent", "{invalid");
      localStorage.setItem("flw_saved", "{invalid");
      window.startEvents = [];
      document.addEventListener("feilawei:start", event => window.startEvents.push(event.detail.nextScreen));
    });
    await page.reload();
    await waitForHome(page);
    assert.equal((await geometry(page)).assetStatus.status, "ready");
    assert.equal(await page.locator("img").count(), 11);
    // The verified Blob must remain drawable after its temporary URL is revoked.
    const pixel = await page.locator('[data-layer="title"]').evaluate(image => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 16;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, 16, 16);
      return [...context.getImageData(8, 8, 1, 1).data];
    });
    assert.deepEqual(pixel, [238, 238, 238, 255]);
    await page.waitForTimeout(300);
    const button = page.getByRole("button", { name: "開始飛啦" });
    await button.dispatchEvent("pointerdown");
    await page.waitForTimeout(60);
    assert.notEqual(await button.evaluate(node => getComputedStyle(node).transform), "none");
    await button.dispatchEvent("pointercancel");
    await page.evaluate(() => { for (let n = 0; n < 5; n++) document.getElementById("screen1-start").click(); });
    assert.deepEqual(await page.evaluate(() => window.startEvents), ["travelType"]);
    await page.waitForTimeout(400);
    await page.keyboard.press("Tab");
    await button.focus();
    assert.equal(await button.evaluate(node => getComputedStyle(node).outlineWidth), "3px");
    await page.keyboard.press("Enter");
    assert.deepEqual(await page.evaluate(() => window.startEvents), ["travelType", "travelType"]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(await page.locator(".v20-mascot-motion").evaluate(node => getComputedStyle(node).animationName), "none");
    await button.dispatchEvent("pointerdown");
    assert.equal(await button.evaluate(node => getComputedStyle(node).transform), "none");
    await button.dispatchEvent("pointercancel");
    await page.reload();
    await waitForHome(page);
    assert.equal((await geometry(page)).disabled, false);
    assert.deepEqual(await page.evaluate(() => window.startEvents), []);
  });
  await check(engine + ": replaced artwork bytes cannot enable CTA", async () => {
    const original = fixtures.get("title");
    fixtures.set("title", original.replace("#eee", "#fff"));
    try {
      await page.reload();
      await waitForHome(page);
      const result = await geometry(page);
      assert.equal(result.assetStatus.status, "blocked");
      assert.ok(result.assetStatus.issues.includes("LAYER_HASH_MISMATCH:title"));
      assert.equal(result.imageCount, 0);
      assert.equal(result.disabled, true);
    } finally { fixtures.set("title", original); }
  });
  await check(engine + ": unlocked metadata prevents all artwork requests", async () => {
    const title = manifest.layers.find(layer => layer.id === "title");
    const original = { sha256: title.sha256, source: title.source };
    title.sha256 = null;
    title.source = "";
    let requests = 0;
    const count = request => { if (request.url().includes("qa-fixture-")) requests++; };
    page.on("request", count);
    try {
      await page.reload();
      await waitForHome(page);
      const result = await geometry(page);
      assert.ok(result.assetStatus.issues.includes("UNLOCKED_LAYER_HASH:title"));
      assert.ok(result.assetStatus.issues.includes("MISSING_LAYER_PROVENANCE:title"));
      assert.equal(result.assetStatus.status, "blocked");
      assert.equal(result.disabled, true);
      assert.equal(result.imageCount, 0);
      assert.equal(requests, 0);
    } finally {
      Object.assign(title, original);
      page.off("request", count);
    }
  });
  await check(engine + ": tiny raster cannot pass Retina readiness", async () => {
    const mascot = manifest.layers.find(layer => layer.id === "mascot");
    const original = { file: mascot.file, kind: mascot.kind, sha256: mascot.sha256 };
    const tiny = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4//8/AwAI/AL+p5qgoAAAAABJRU5ErkJggg==", "base64");
    mascot.file = "./assets/v20/qa-small.png";
    mascot.kind = "raster";
    mascot.sha256 = createHash("sha256").update(tiny).digest("hex");
    await page.route("**/qa-small.png?*", route => route.fulfill({
      contentType: "image/png",
      body: tiny,
    }));
    try {
      await page.reload();
      await waitForHome(page);
      const result = await geometry(page);
      assert.equal(result.assetStatus.status, "blocked");
      assert.ok(result.assetStatus.issues.includes("INSUFFICIENT_RETINA_RESOLUTION:mascot"));
      assert.equal(result.disabled, true);
      assert.equal(result.imageCount, 0);
    } finally { Object.assign(mascot, original); }
  });
  await check(engine + ": one failed layer leaves no partial artwork or CTA", async () => {
    await page.route("**/qa-fixture-title.svg?*", route => route.fulfill({ status: 404, body: "" }));
    await page.reload();
    await waitForHome(page);
    const status = await geometry(page);
    assert.equal(status.assetStatus.status, "blocked");
    assert.equal(status.imageCount, 0);
    assert.equal(status.disabled, true);
  });
  await context.close();

  const desktop = await browser.newPage({ viewport: { width: 600, height: 900 } });
  await desktop.goto(base);
  await waitForHome(desktop);
  await check(engine + ": 430px cap, centering and synthetic safe-area", async () => {
    let result = await geometry(desktop);
    assert.equal(result.board.width, 430);
    assert.equal(result.board.x, 85);
    await desktop.addStyleTag({ content: ".v20-home-screen{padding-top:44px;padding-bottom:34px}" });
    const padded = await geometry(desktop);
    assert.equal(padded.board.y, 44);
    assert.equal(padded.board.height, result.board.height);
    for (const key of Object.keys(result.cta)) {
      assert.ok(Math.abs(padded.cta[key] - result.cta[key]) < .1);
    }
  });
  await desktop.close();
}

(async () => {
  await fs.mkdir(output, { recursive: true });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port + "/";
  try {
    for (const [engine, type] of Object.entries({ chromium, webkit })) {
      let browser;
      try {
        browser = await type.launch(engine === "chromium" && process.env.CHROMIUM_EXECUTABLE ?
          { executablePath: process.env.CHROMIUM_EXECUTABLE, args: ["--no-sandbox"] } : {});
      } catch (error) {
        report.unavailableBrowsers.push({ engine, reason: error.message.split("\n").slice(0, 14).join("\n") });
        continue;
      }
      try {
        await capture(browser, engine, base);
        await controls(browser, engine, base);
      } finally { await browser.close(); }
    }
    report.engineeringVerdict = report.engineering.some(item => item.status === "FAIL") ?
      "FAIL" : report.cases.length === 8 ? "PASS" : "INCOMPLETE_BROWSER_MATRIX";
    report.visualVerdict = report.cases.some(item => item.normal.assetStatus.status !== "ready") ?
      "FAIL" : "REQUIRES_OVERLAY_REVIEW";
    report.realDeviceUAT = "NOT_RUN: iOS Safari and ChatGPT in-app browser require actual devices";
    await fs.writeFile(path.join(output, "capture.json"), JSON.stringify(report, null, 2) + "\n");
    console.log(JSON.stringify({
      engineering: report.engineeringVerdict, visual: report.visualVerdict,
      cases: report.cases.length, checks: report.engineering.length,
      failures: report.engineering.filter(item => item.status === "FAIL"),
      unavailable: report.unavailableBrowsers.map(item => item.engine),
    }));
    process.exitCode = report.engineeringVerdict === "PASS" ? 0 : 1;
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
