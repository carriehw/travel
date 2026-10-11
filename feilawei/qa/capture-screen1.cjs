/* Screen 1 browser QA for the locked single-artboard strategy. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const root = path.resolve(__dirname, "..");
const output = path.resolve(process.argv[2] || path.join(root, "docs/qa/latest"));
const widths = [375, 390, 393, 430];
const heights = { 375: 667, 390: 844, 393: 852, 430: 932 };
const DESIGN = { width: 390, height: 804.87 };
const CTA = { x: 33.9, y: 651.1, width: 333.5, height: 83.7 };
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
  visualVerdict: "PENDING_PIXEL_REVIEW",
  cases: [],
  engineering: [],
  unavailableBrowsers: [],
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
    await check(prefix + ": production artboard + CTA geometry", () => {
      const scale = width / DESIGN.width;
      assert.ok(Math.abs(normal.board.height - DESIGN.height * scale) < .15);
      assert.equal(normal.board.width, width);
      for (const [key, value] of Object.entries(CTA)) {
        assert.ok(Math.abs(normal.cta[key] - value * scale) < .15, "CTA " + key);
      }
      assert.ok(normal.cta.height >= 56);
      assert.equal(normal.assetStatus.status, "ready");
      assert.equal(normal.disabled, false);
      assert.equal(normal.imageCount, 1);
      assert.ok(Math.abs(short.board.height - normal.board.height) < .15);
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
  await page.addInitScript(() => {
    window.startEvents = [];
    document.addEventListener("feilawei:start", event => window.startEvents.push(event.detail.nextScreen));
  });
  await page.goto(base);
  await waitForHome(page);

  await check(engine + ": start CTA, keyboard, duplicate guard and refresh", async () => {
    const button = page.getByRole("button", { name: "開始飛啦" });
    assert.equal((await geometry(page)).assetStatus.status, "ready");
    await page.evaluate(() => { for (let n = 0; n < 5; n++) document.getElementById("screen1-start").click(); });
    assert.deepEqual(await page.evaluate(() => window.startEvents), ["travelType"]);
    await page.waitForTimeout(400);
    await button.focus();
    assert.equal(await button.evaluate(node => getComputedStyle(node).outlineWidth), "3px");
    await page.keyboard.press("Enter");
    assert.deepEqual(await page.evaluate(() => window.startEvents), ["travelType", "travelType"]);
    await page.reload();
    await waitForHome(page);
    assert.equal((await geometry(page)).disabled, false);
  });

  await check(engine + ": reduced motion keeps layout static", async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const button = page.getByRole("button", { name: "開始飛啦" });
    await button.dispatchEvent("pointerdown");
    assert.equal(await button.evaluate(node => getComputedStyle(node).transform), "none");
    await button.dispatchEvent("pointercancel");
  });

  await check(engine + ": changed artwork bytes are rejected", async () => {
    await page.route("**/screen01_golden@2x.webp?*", route =>
      route.fulfill({ status: 200, contentType: "image/webp", body: Buffer.from("not-the-approved-art") }));
    await page.reload();
    await waitForHome(page);
    const result = await geometry(page);
    assert.equal(result.assetStatus.status, "blocked");
    assert.ok(result.assetStatus.issues.includes("ARTBOARD_HASH_MISMATCH"));
    assert.equal(result.imageCount, 0);
    assert.equal(result.disabled, true);
    await page.unroute("**/screen01_golden@2x.webp?*");
  });

  await check(engine + ": unapproved manifest blocks artwork request", async () => {
    const original = JSON.parse(await fs.readFile(path.join(root, "assets/v20/screen01_manifest.json"), "utf8"));
    const changed = structuredClone(original);
    changed.approval.assetsReady = false;
    let artRequests = 0;
    const count = request => { if (request.url().includes("screen01_golden@2x.webp")) artRequests++; };
    page.on("request", count);
    await page.route("**/screen01_manifest.json?*", route => route.fulfill({ json: changed }));
    await page.reload();
    await waitForHome(page);
    const result = await geometry(page);
    assert.equal(result.assetStatus.status, "blocked");
    assert.equal(result.imageCount, 0);
    assert.equal(result.disabled, true);
    assert.equal(artRequests, 0);
    await page.unroute("**/screen01_manifest.json?*");
    page.off("request", count);
  });

  await context.close();

  const desktop = await browser.newPage({ viewport: { width: 600, height: 1000 } });
  await desktop.goto(base);
  await waitForHome(desktop);
  await check(engine + ": 430px cap, centering and safe-area independence", async () => {
    const result = await geometry(desktop);
    assert.equal(result.board.width, 430);
    assert.equal(result.board.x, 85);
    await desktop.addStyleTag({ content: "*{animation:none!important;transition:none!important}.v20-home-screen{padding-top:44px!important;padding-bottom:34px!important}" });\n    await desktop.waitForTimeout(20);
    const padded = await geometry(desktop);
    assert.equal(padded.board.y, 44);
    assert.equal(padded.board.height, result.board.height);
    for (const key of Object.keys(result.cta)) {
      assert.ok(Math.abs(padded.cta[key] - result.cta[key]) < .15);
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
      } finally {
        await browser.close();
      }
    }
    report.engineeringVerdict = report.engineering.some(item => item.status === "FAIL") ?
      "FAIL" : report.cases.length === 8 ? "PASS" : "INCOMPLETE_BROWSER_MATRIX";
    report.visualVerdict = report.cases.some(item => item.normal.assetStatus.status !== "ready") ?
      "FAIL" : "READY_FOR_PIXEL_REVIEW";
    report.realDeviceUAT = "NOT_RUN: iOS Safari and ChatGPT in-app browser require actual devices";
    await fs.writeFile(path.join(output, "capture.json"), JSON.stringify(report, null, 2) + "\n");
    console.log(JSON.stringify({
      engineering: report.engineeringVerdict,
      visual: report.visualVerdict,
      cases: report.cases.length,
      checks: report.engineering.length,
      failures: report.engineering.filter(item => item.status === "FAIL"),
      unavailable: report.unavailableBrowsers.map(item => item.engine),
    }));
    process.exitCode = report.engineeringVerdict === "PASS" ? 0 : 1;
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
