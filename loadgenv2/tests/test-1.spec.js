// @ts-check

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Go to http://52.251.67.123/
  await page.goto("http://52.251.67.123/");

  // Go to http://52.251.67.123/store
  await page.goto("http://52.251.67.123/store");

  // Click div:nth-child(2) > img
  await page.locator("div:nth-child(2) > img").click();

  // Click text=HomeBankingInsuranceStore1 >> svg
  await page.locator("text=HomeBankingInsuranceStore1 >> svg").click();
  await expect(page).toHaveURL("http://52.251.67.123/cart");

  // Go to http://52.251.67.123/myaccount?ordercomplete=3
  await page.goto("http://52.251.67.123/myaccount?ordercomplete=3");
});
