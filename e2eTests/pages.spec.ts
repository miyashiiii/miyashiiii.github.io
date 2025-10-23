import { test, expect } from "@playwright/test";

test("top page has title", async ({ page }) => {
  await page.goto("http://localhost:3001");
  await expect(page).toHaveTitle("miyashiiii portfolio");
});

test("posts page has title", async ({ page }) => {
  await page.goto("http://localhost:3001/posts");
  await expect(page).toHaveTitle("Posts | miyashiiii portfolio");
});

test("works page has title", async ({ page }) => {
  await page.goto("http://localhost:3001/works");
  await expect(page).toHaveTitle("Works | miyashiiii portfolio");
});

test("posts page displays at least one post", async ({ page }) => {
  await page.goto("http://localhost:3001/posts");
  const postCards = page.locator(".q-card, .q-item");
  await expect(postCards.first()).toBeVisible();
  const count = await postCards.count();
  expect(count).toBeGreaterThan(0);
});
