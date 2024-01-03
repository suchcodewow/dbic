// $Env:frontendURL = "blah"
import { chromium } from "playwright";
import pLimit from "p-limit";

const frontendURL = process.env.frontendURL ? "http://" + process.env.frontendURL : "http://localhost:3000";
const runTotal = process.env.runTotal ? process.env.runTotal : 10000;
const workers = process.env.workers ? process.env.workers : 3;
const delay = process.env.delay ? process.env.delay : 0;
const timeout = process.env.timeout ? process.env.timeout : 40000;
const limit = pLimit(parseInt(workers));

console.log("Using", workers, "workers to run", runTotal, "tests with timeout", timeout, "targetting:", frontendURL);
console.log("Delaying start by", delay, "s.");
console.log("Running version 3.2");
await new Promise((r) => setTimeout(r, parseInt(delay)));

async function runOne({ browser }) {
  // Setup browser
  const context = await browser.newContext();
  const startTime = new Date();
  context.setDefaultTimeout(parseInt(timeout));
  // await context.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
  const page = await context.newPage();
  // Login
  try {
    await page.goto(frontendURL + "/login");
  } catch (TimeoutException) {
    console.log("Could not connect. Waiting 10.");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return;
  }
  await page.getByRole("button", { name: "Sign In" }).click();
  const userName = await page.getByRole("button", { name: "Open user menu " }).textContent();
  console.log(startTime.toLocaleString(), "LOGIN", userName?.substring(14));
  // Pay bill
  // await page.getByText("Banking", { exact: true }).click();
  await page.getByRole("navigation").getByText("Banking").click();
  await page.getByText("Transfer & Pay").click();
  // await page.getByLabel("Payee").click();
  // await page.getByLabel("Payee").fill(payees[Math.floor(Math.random() * payees.length)]);
  // await page.getByLabel("Payment Amount").click();
  // await page.getByLabel("Payment Amount").fill(randomNumber(10, 1000).toString());
  await page.getByRole("button", { name: "Send Payment" }).click();
  await page.waitForLoadState("networkidle");
  // Get insurance
  await page.getByText("newInsurance").click();
  await page.getByRole("link", { name: "Let's go!" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Submit Quote" }).click();
  await page.waitForLoadState("networkidle");
  // Get new specialty Insurance!
  await page.getByText("newInsurance").click();
  await page.getByRole("link", { name: "Insure specialty item" }).click();
  await page.getByRole("button", { name: "Submit Quote" }).click();
  await page.waitForLoadState("networkidle");
  // Buy item
  await page.getByRole("navigation").getByText("Store").click();
  await page.goto(frontendURL + "/store");
  await page
    .getByRole("heading", {
      name: storeItems[Math.floor(Math.random() * storeItems.length)],
    })
    .locator("span")
    .click();
  await page.getByRole("button", { name: "Add to bag" }).click();
  await page.getByText("View Cart").click();
  await page.getByText("Checkout").nth(2).click();
  await page.getByText("Complete Order").click();
  // Logout
  await page.getByRole("button", { name: "Open user menu " }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await context.close();
  const endTime = new Date();
  console.log(endTime.toLocaleString(), "LOGOUT", userName?.substring(14), Math.abs(endTime - startTime), "ms");
  // Teardown
}
async function oneCycle() {
  // Setup
  console.log("Starting new cycle.");
  const browser = await chromium.launch({
    headless: true,
    timeout: 5000,
    args: [
      //"--no-sandbox",
      //"--disable-setuid-sandbox",
      //"--disable-dev-shm-usage",
      //"--disable-accelerated-2d-canvas",
      //"--no-first-run",
      //"--no-zygote",
      // "--single-process",
      // "--disable-gpu",
      //"--enable-zero-copy",
      //"--disable-features=UseSkiaRenderer",
    ],
  });
  const input = [];
  let i = 0;
  do {
    i++;
    input.push(limit(() => runOne({ browser })));
  } while (i < runTotal);
  // console.log(input);
  await Promise.all(input);
  await browser.close();
  console.log("All test complete. Browser closed.");
}

(async () => {
  while (true) await oneCycle();
})();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const storeItems = [
  "Adazzo 4 in 1 Rolling Makeup Trolley Train Case Cosmetic Suitcase Nail Tech Box for Makeup Artist, Hairstylists, Nail Tech Students Barber Case with with Keys Swivel Wheels - Shiny Pink",
  "NETGEAR Wi-Fi Range Extender EX3700 - Coverage Up to 1000 Sq Ft and 15 Devices with AC750 Dual Band Wireless Signal Booster & Repeater (Up to 750Mbps Speed), and Compact Wall Plug Design",
  "Power Pet Fully Automatic Pet Door for Wall Installation (Wall Installation, Large)",
  "Homall Gaming Chair Office Chair High Back Computer Chair Leather Desk Chair Racing Executive Ergonomic Adjustable Swivel Task Chair with Headrest and Lumbar Support (White)",
];

const payees = [
  "Umbrella Corp",
  "Gringotts Wizarding Bank",
  "Monster's Inc",
  "Cyberdyne Systems",
  "Buy n Large",
  "Wonka Industries",
  "Acme Corp",
  "Bubba Gump",
  "Los Pollos Hermanos",
  "Pritchett Closets & Blinds",
  "Momcorp",
];
