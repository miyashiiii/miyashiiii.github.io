import { test, expect } from "@playwright/test";

const PRODUCTION_URL = "https://miyashiiii.github.io";

test("production: top page is accessible and has correct title", async ({
  page,
}) => {
  const response = await page.goto(PRODUCTION_URL);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("miyashiiii portfolio");
});

test("production: posts page is accessible and has correct title", async ({
  page,
}) => {
  const response = await page.goto(`${PRODUCTION_URL}/posts`);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Posts | miyashiiii portfolio");
});

test("production: works page is accessible and has correct title", async ({
  page,
}) => {
  const response = await page.goto(`${PRODUCTION_URL}/works`);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Works | miyashiiii portfolio");
});

test("production: verify DNS resolution and response time", async ({
  page,
}) => {
  const startTime = Date.now();
  const response = await page.goto(PRODUCTION_URL);
  const loadTime = Date.now() - startTime;

  expect(response?.status()).toBe(200);
  expect(loadTime).toBeLessThan(10000);
});
