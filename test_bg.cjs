const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/');
  const bg = await page.evaluate(() => {
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      htmlClass: document.documentElement.className,
      rootSimbiotikDeep: window.getComputedStyle(document.documentElement).getPropertyValue('--color-simbiotik-deep'),
      bodySimbiotikDeep: window.getComputedStyle(document.body).getPropertyValue('--color-simbiotik-deep')
    };
  });
  console.log(bg);
  await browser.close();
})();
