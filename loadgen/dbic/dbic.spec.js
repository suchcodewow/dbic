// @ts-check
import { test, expect } from "@playwright/test";
test("Purchase from the catalog", async ({ page }) => {
  const app = process.env.frontend
    ? process.env.frontend
    : "http://localhost:3000/";
  // Go to http://localhost:3000/
  await page.goto(app);
  // Click text=Sign in
  await page.locator("text=Sign in").click();
  await expect(page).toHaveURL(app + "login");
  // Click form >> text=Sign in
  await page.locator("form >> text=Sign in").click();
  await expect(page).toHaveURL(app);
  // Click text=Store
  await page.locator("text=Store").click();
  await expect(page).toHaveURL(app + "store");
  // Click div:nth-child(3) > .StoreFeature__ItemImage-sc-f701e29c-2 > img
  await page.locator("#storeFeature > nth=3").click();
  // Click text=HomeBankingInsuranceStore2 >> div
  await page.locator("text=HomeBankingInsuranceStore2 >> div").click();
  await expect(page).toHaveURL(app + "cart");
  // Click button:has-text("checkout")
  await page.locator('button:has-text("checkout")').click();
  // Click text=use my saved address
  await page.locator("text=use my saved address").click();
  // Click button:has-text("Use your new DYNACARD")
  await page.locator('button:has-text("Use your new DYNACARD")').click();
  await page.waitForURL(app + "myaccount**");
});
