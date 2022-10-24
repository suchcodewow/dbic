import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto("https://github.com/login");
  await page.getByText("Login").click();
  await page.getByLabel("User name").fill("username");
  await page.getByLabel("Password").fill("password");
  await page.getByText("Submit").click();
});

test("PayBill", async ({ page }) => {
  await page.goto("http://localhost/");

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost/login");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost/");

  await page.locator('nav:has-text("DynaBankInsuraCart")').getByRole("link", { name: "Banking" }).click();
  await expect(page).toHaveURL("http://localhost/banking");

  await page.getByText("Transfer & Pay").click();

  await page.getByLabel("Payee").click();

  await page.getByLabel("Payee").fill("Tim's Tulip");

  await page.getByLabel("Payee").press("Tab");

  await page.getByRole("combobox", { name: "From Account" }).press("Tab");

  await page.getByLabel("Payment Amount").fill("100");

  await page.getByRole("button", { name: "Send Payment" }).click();
});

test("SubmitQuote", async ({ page }) => {
  await page.goto("http://localhost/");

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost/login");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost/");

  await page.getByRole("link", { name: "Insurance" }).click();
  await expect(page).toHaveURL("http://localhost/insurance");

  await page.getByRole("link", { name: "Let's go!" }).click();
  await expect(page).toHaveURL("http://localhost/quote");

  await page.getByRole("button", { name: "Next" }).click();
});
