import { expect, test } from "@playwright/test";

test("can view order summary page and order details", async ({ page }) => {
  await page.goto("/");

  // Go to my orders
  await page
    .getByRole("banner")
    .getByRole("link", { name: "My orders" })
    .click();

  // Find order details link and go there
  await page.locator("a", { hasText: "View order details" }).first().click();

  await expect(
    page.getByRole("heading", { name: "Order details" })
  ).toBeVisible();
});
