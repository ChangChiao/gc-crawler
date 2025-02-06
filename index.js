import { chromium } from "playwright";
import { saveHtml } from "./utils/fileHandler.js";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const visited = new Set();
  const toVisit = ["https://www.duotify.com/"];

  while (toVisit.length > 0) {
    const url = toVisit.pop();
    if (visited.has(url)) continue;
    visited.add(url);

    await page.goto(url);
    const content = await page.content();
    await saveHtml(url, content);

    const links = await page.$$eval("a", (as) => as.map((a) => a.href));
    for (const link of links) {
      // 根據需求過濾外部連結或篩選
      if (link.includes("duotify.com") && !visited.has(link)) {
        toVisit.push(link);
      }
    }
  }

  await browser.close();
})();
