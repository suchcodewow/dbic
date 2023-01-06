module.exports = { test };
const { expect } = require("@playwright/test");
const frontendURL = process.env.frontendURL ? "http://" + process.env.frontendURL : "http://localhost";
async function test(page) {
  await page.goto(frontendURL);
  await new Promise((r) => setTimeout(r, 6000));
}
