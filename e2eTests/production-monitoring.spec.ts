import { test, expect } from "@playwright/test";

const PRODUCTION_URL = "https://miyashiiii.com";

test("本番: トップページにアクセスでき、正しいタイトルが表示される", async ({
  page,
}) => {
  const response = await page.goto(PRODUCTION_URL);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("miyashiiii portfolio");
});

test("本番: 記事一覧ページにアクセスでき、正しいタイトルが表示される", async ({
  page,
}) => {
  const response = await page.goto(`${PRODUCTION_URL}/posts`);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Posts | miyashiiii portfolio");
});

test("本番: 成果物一覧ページにアクセスでき、正しいタイトルが表示される", async ({
  page,
}) => {
  const response = await page.goto(`${PRODUCTION_URL}/works`);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Works | miyashiiii portfolio");
});

test("本番: DNS解決とレスポンス時間を確認", async ({
  page,
}) => {
  const startTime = Date.now();
  const response = await page.goto(PRODUCTION_URL);
  const loadTime = Date.now() - startTime;

  expect(response?.status()).toBe(200);
  expect(loadTime).toBeLessThan(10000);
});
