import { test, expect } from "@playwright/test";
test("Banking Transaction", async ({ page }) => {
  await page.goto("http://localhost/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost/login");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("http://localhost/");
  await page
    .locator(
      'nav:has-text("Open main menuHomeBankingInsuranceStoreView notificationsOpen user menuHotTurkey")'
    )
    .getByRole("link", { name: "Banking" })
    .click();
  await expect(page).toHaveURL("http://localhost/banking");
  await page.getByText("Transfer & Pay").click();
  await page.getByLabel("Payee").click();
  await page.getByLabel("Payee").fill("Mel's Mowing and Tooth Repair");
  await page.getByLabel("Payee").press("Tab");
  await page.getByRole("combobox", { name: "From Account" }).press("Tab");
  await page.getByLabel("Payment Amount").fill("100");
  await page.getByRole("button", { name: "Send Payment" }).click();
});
