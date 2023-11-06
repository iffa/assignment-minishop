import { expect, test } from "@playwright/test";

test("order happy path", async ({ page }) => {
  await page.goto("/");

  // Add products to the cart
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByRole("button", { name: "Add to cart" }).nth(1).click();

  // Expect cart state to match
  await page.getByRole("button", { name: /2 products in cart/ }).click();

  // Submit order
  await page.getByRole("button", { name: "Submit order" }).click();

  // Should have order confirmation page visible
  await expect(page.getByText("Thank you for your order!")).toBeVisible();

  // Extract order id from URL
  const orderId = page.url().split("orders/").at(1)?.replace("?isNewOrder", "");

  // Navigate to my orders page
  await page
    .getByRole("banner")
    .getByRole("link", { name: "My orders" })
    .click();

  // Should see created order
  await expect(page.getByRole("heading", { name: orderId })).toBeVisible();
});
