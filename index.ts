import { chromium, devices } from 'playwright';
import assert from 'node:assert';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        ...devices['iPhone 11'],
        locale: 'en-US',
    });
    const page = await context.newPage();

    await context.route(url: '**.jpg', route => route.abort());
    await page.goto(url: 'https://example.com');

    assert(await page.title() === 'Example Domain');

    await context.close();
    await browser.close();

})();
