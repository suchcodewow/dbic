// $Env:frontendURL = "blah"

const { test, expect } = require("@playwright/test");
test.describe.configure({ mode: "serial" });
let page;
//const frontendURL = process.env.frontendURL ? "http://" + process.env.frontendURL : "http://localhost";
const frontendURL = "http://20.252.112.104";

// test.beforeAll(async ({ browser }) => {
//   page = await browser.newPage();
// });

// test.afterAll(async () => {
//   await page.close();
// });

// test.describe("user session", () => {
test("login", async ({ page }) => {
  await page.goto(frontendURL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page).toHaveURL(frontendURL + "/login");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(frontendURL + "/");
  const why = await page.getByRole("button", { name: "Open user menu " }).textContent();
  console.log("New login:", why?.substring(14));
});

//   test("pay bill", async ({ page }) => {
//     await page.goto(frontendURL + "/banking");
//     await page.getByText("Transfer & Pay").click();
//     await page.getByLabel("Payee").click();
//     await page.getByLabel("Payee").fill(payees[Math.floor(Math.random() * payees.length)]);
//     await page.getByLabel("Payment Amount").click();
//     await page.getByLabel("Payment Amount").fill(randomNumber(10, 1000).toString());
//     await page.getByRole("button", { name: "Send Payment" }).click();
//   });

//   test("get insurance", async ({ page }) => {
//     await page.getByText("Insurance", { exact: true }).click();
//     await expect(page).toHaveURL(frontendURL + "/insurance");
//     await page.getByRole("link", { name: "Let's go!" }).click();
//     await expect(page).toHaveURL(frontendURL + "/quote");
//     await page.getByRole("button", { name: "Next" }).click();
//     await page.getByRole("button", { name: "Next" }).click();
//     await page.getByRole("button", { name: "Submit Quote" }).click();
//   });

//   test("store purchase", async ({ page }) => {
//     await page.getByRole("navigation").getByText("Store").click();
//     await expect(page).toHaveURL(frontendURL + "/store");
//     await page
//       .getByRole("heading", {
//         name: storeItems[Math.floor(Math.random() * storeItems.length)],
//       })
//       .locator("span")
//       .click();
//     await page.getByRole("button", { name: "Add to bag" }).click();
//     await page.getByText("View Cart").click();
//     await page.getByText("Checkout").nth(2).click();
//     await page.getByText("Complete Order").click();
//   });

//   test("logout", async ({ page }) => {
//     await page.getByRole("button", { name: "Open user menu " }).click();
//     await page.getByRole("menuitem", { name: "Sign out" }).click();
//   });
// });
