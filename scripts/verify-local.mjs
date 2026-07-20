import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.env.VERIFY_URL || "http://127.0.0.1:8788/";
await mkdir("file_output", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector(".preloader.hide", { timeout: 45000 });
await page.screenshot({ path: "file_output/ui-v2-play.png" });

await page.click("#map-toggle");
await page.waitForSelector("#map-panel:not([hidden])", { timeout: 5000 });
await page.waitForTimeout(800);
await page.screenshot({ path: "file_output/ui-v2-map.png" });

await page.click("#map-back");
await page.fill("#guess-input", "Paris");
await page.click("#guess-btn");
await page.waitForSelector("#result:not([hidden])", { timeout: 25000 });
await page.screenshot({ path: "file_output/ui-v2-result.png" });

const result = {
  url,
  round: await page.locator("#round-pill").textContent(),
  score: await page.locator("#result-score").textContent(),
  actual: await page.locator("#result-actual-label").textContent(),
  errors: errors.slice(0, 8),
};
console.log(JSON.stringify(result, null, 2));
await browser.close();
