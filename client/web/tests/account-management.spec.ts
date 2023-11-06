import { expect, test } from "@playwright/test";

test("account management", async ({ page }) => {
  await page.goto("/");

  // Find user select and change current user
  await page.getByLabel("Select current user").selectOption("customer-2");

  expect(
    await page.getByRole("banner").locator("#userSelect").inputValue()
  ).toEqual("customer-2");
});
