const { chrome } = require("playwright"); // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await chrome.launch();
  const page = await browser.newPage();
  await page.goto("http://20.3.50.188");
  await browser.close();
})();
