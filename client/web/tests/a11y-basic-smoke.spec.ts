import AxeBuilder from "@axe-core/playwright";
import test, { Page, expect } from "@playwright/test";

async function analyze(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
}

test.describe("storefront", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");

    await analyze(page);
  });
});

test.describe("order summary page", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/orders");

    await analyze(page);
  });
});

test.describe("order details page", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/orders/order-1");

    await analyze(page);
  });
});
