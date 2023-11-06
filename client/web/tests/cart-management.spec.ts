import { expect, test } from "@playwright/test";

test("cart management", async ({ page }) => {
  await page.goto("/");

  // Add product to cart 4 times
  await page.getByRole("button", { name: "Add to cart" }).first().click({
    clickCount: 4,
  });

  // Expect cart state to match
  await page.getByRole("button", { name: /1 products in cart/ }).click();

  // Should have correct amount in table
  await expect(page.getByRole("cell", { name: "4" })).toBeVisible();

  // Remove all items from cart
  await page.getByRole("button", { name: "-" }).click({
    clickCount: 4,
  });

  // Shopping cart should now be empty
  await expect(
    page.getByRole("cell", { name: "Your shopping cart is empty." })
  ).toBeVisible();
});
