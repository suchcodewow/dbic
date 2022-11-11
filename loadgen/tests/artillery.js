module.exports = { test };
const { expect } = require("@playwright/test");
const frontendURL = process.env.frontendURL ? "http://" + process.env.frontendURL : "http://localhost";
async function test(page) {
  await page.goto(frontendURL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page).toHaveURL(frontendURL + "/login");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(frontendURL + "/");
  await page.getByRole("navigation").getByText("Banking").click();
  await expect(page).toHaveURL(frontendURL + "/banking");
  await page.getByText("Transfer & Pay").click();
  await page.getByLabel("Payee").click();
  await page.getByLabel("Payee").fill("Bob's Beards");
  await page.getByLabel("Payment Amount").click();
  await page.getByLabel("Payment Amount").fill("100");
  await page.getByRole("button", { name: "Send Payment" }).click();
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
      name: "Adazzo 4 in 1 Rolling Makeup Trolley Train Case Cosmetic Suitcase Nail Tech Box for Makeup Artist, Hairstylists, Nail Tech Students Barber Case with with Keys Swivel Wheels - Shiny Pink",
    })
    .locator("span")
    .click();
  await page.getByRole("button", { name: "Add to bag" }).click();
  await page.getByText("View Cart").click();
  await page.getByText("Checkout").nth(2).click();
  await page.getByText("Complete Order").click();
  await expect(page).toHaveURL(new RegExp("^http://localhost/myaccount"));
  await page.getByRole("button", { name: new RegExp("^Open user menu ") }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await expect(page).toHaveURL(frontendURL + "/");
}
