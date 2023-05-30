// @ts-check

// $Env:frontendURL = "blah blah"

const { test, expect } = require("@playwright/test");
const frontendURL = process.env.frontendURL ? "http://" + process.env.frontendURL : "http://localhost";
//const frontendURL = "http://20.94.2.35";
test("dynabank", async ({ page }) => {
  await page.goto(frontendURL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page).toHaveURL(frontendURL + "/login");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(frontendURL + "/");
  // await page.getByRole("navigation").getByText("Banking").click();
  await page.goto(frontendURL + "/banking");
  // await expect(page).toHaveURL(frontendURL + "/banking");
  await page.getByText("Transfer & Pay").click();
  await page.getByLabel("Payee").click();
  await page.getByLabel("Payee").fill(payees[Math.floor(Math.random() * payees.length)]);
  await page.getByLabel("Payment Amount").click();
  await page.getByLabel("Payment Amount").fill(randomNumber(10, 1000).toString());
  await page.getByRole("button", { name: "Send Payment" }).click();
  // Do two additional bank transactions
  await page.goto(frontendURL + "/banking");
  await page.getByText("Transfer & Pay").click();
  await page.getByLabel("Payee").click();
  await page.getByLabel("Payee").fill(payees[Math.floor(Math.random() * payees.length)]);
  await page.getByLabel("Payment Amount").click();
  await page.getByLabel("Payment Amount").fill(randomNumber(10, 1000).toString());
  await page.getByRole("button", { name: "Send Payment" }).click();
  await page.goto(frontendURL + "/banking");
  await page.getByText("Transfer & Pay").click();
  await page.getByLabel("Payee").click();
  await page.getByLabel("Payee").fill(payees[Math.floor(Math.random() * payees.length)]);
  await page.getByLabel("Payment Amount").click();
  await page.getByLabel("Payment Amount").fill(randomNumber(10, 1000).toString());
  await page.getByRole("button", { name: "Send Payment" }).click();
  // END two additional bank transactions
  await page.getByText("Insurance").click();
  await expect(page).toHaveURL(frontendURL + "/insurance");
  await page.getByRole("link", { name: "Let's go!" }).click();
  await expect(page).toHaveURL(frontendURL + "/quote");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Submit Quote" }).click();
  await expect(page).toHaveURL(frontendURL + "/myaccount");
  await page.getByRole("navigation").getByText("Store").click();
  await expect(page).toHaveURL(frontendURL + "/store");
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
  // await expect(page).toHaveURL(new RegExp("^" + frontendURL + "/myaccount"));
  // await page.getByRole("button", { name: new RegExp("^Open user menu ") }).click();
  // await page.getByRole("menuitem", { name: "Sign out" }).click();
  // await expect(page).toHaveURL(frontendURL + "/");
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
