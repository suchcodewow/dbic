// @ts-check

// $Env:frontendURL = "blah"

async function runOne({ page }) {}

const { test, expect } = require("@playwright/test");
const frontendURL = process.env.frontendURL ? "http://" + process.env.frontendURL : "http://localhost";
test("get insurance", async ({ page }) => {
  do {
    // Login
    await page.goto(frontendURL);
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL(frontendURL + "/login");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(frontendURL + "/");
    const why = await page.getByRole("button", { name: "Open user menu " }).textContent();
    console.log("Insurance login:", why?.substring(14));
    // Get Insurance
    await page.getByText("Insurance", { exact: true }).click();
    await expect(page).toHaveURL(frontendURL + "/insurance");
    await page.getByRole("link", { name: "Let's go!" }).click();
    await expect(page).toHaveURL(frontendURL + "/quote");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Submit Quote" }).click();
    // Logout
    await page.getByRole("button", { name: "Open user menu " }).click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();
  } while (true);
});

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
