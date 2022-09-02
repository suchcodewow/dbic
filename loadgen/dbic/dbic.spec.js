// @ts-check
import { test, expect } from "@playwright/test";
test("Purchase from the catalog", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");
  // Click text=Sign in
  await page.locator("text=Sign in").click();
  await expect(page).toHaveURL("http://localhost:3000/login");
  // Click form >> text=Sign in
  await page.locator("form >> text=Sign in").click();
  await expect(page).toHaveURL("http://localhost:3000/");
  // Click text=Store
  await page.locator("text=Store").click();
  await expect(page).toHaveURL("http://localhost:3000/store");
  // Click div:nth-child(3) > .StoreFeature__ItemImage-sc-f701e29c-2 > img
  await page
    .locator("div:nth-child(3) > .StoreFeature__ItemImage-sc-f701e29c-2 > img")
    .click();
  // Click div:nth-child(2) > .StoreFeature__ItemImage-sc-f701e29c-2 > img
  await page
    .locator("div:nth-child(2) > .StoreFeature__ItemImage-sc-f701e29c-2 > img")
    .click();
  // Click text=HomeBankingInsuranceStore2 >> div
  await page.locator("text=HomeBankingInsuranceStore2 >> div").click();
  await expect(page).toHaveURL("http://localhost:3000/cart");
  // Click button:has-text("checkout")
  await page.locator('button:has-text("checkout")').click();
  // Click text=use my saved address
  await page.locator("text=use my saved address").click();
  // Click button:has-text("Use your new DYNACARD")
  await page.locator('button:has-text("Use your new DYNACARD")').click();
  // await expect(page.url()).toContain
  //   "http://localhost:3000/myaccount?ordercomplete="
  // );
  await page.waitForURL("http://localhost:3000/myaccount**");
});
