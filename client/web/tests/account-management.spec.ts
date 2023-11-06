import { expect, test } from "@playwright/test";

test("account management", async ({ page }) => {
  await page.goto("/");

  // Find user select and click
  await page.getByRole("banner").locator("#userSelect").click();

  // Choose another user
  await page.getByRole("option", { name: "customer-2" }).click();

  expect(
    await page.getByRole("banner").locator("#userSelect").inputValue()
  ).toEqual("customer-2");
});
