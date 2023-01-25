module.exports = { test };
const { expect } = require("@playwright/test");
const frontendURL = process.env.frontendURL ? "http://" + process.env.frontendURL : "http://localhost";
async function test(page) {
  google(page);
  await page.goto("http://www.osu.edu");
  await new Promise((r) => setTimeout(r, 2000));
}
async function google(page) {
  await page.goto("http://www.google.com");
  await new Promise((r) => setTimeout(r, 2000));
}
