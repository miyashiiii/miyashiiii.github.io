import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const OUTPUT_DIR = process.env.OUTPUT_DIR || './screenshots';

(async () => {
  const browser = await chromium.launch();

  console.log(`📸 スクリーンショットを取得中: ${BASE_URL}`);

  // デスクトップビュー (1920x1080)
  const desktopPage = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000); // 画像読み込みを待つ
  await desktopPage.screenshot({
    path: `${OUTPUT_DIR}/desktop.png`,
    fullPage: true
  });
  console.log(`✅ デスクトップビュー: ${OUTPUT_DIR}/desktop.png`);

  // タブレットビュー (768x1024)
  const tabletPage = await browser.newPage({
    viewport: { width: 768, height: 1024 }
  });
  await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(2000);
  await tabletPage.screenshot({
    path: `${OUTPUT_DIR}/tablet.png`,
    fullPage: true
  });
  console.log(`✅ タブレットビュー: ${OUTPUT_DIR}/tablet.png`);

  // モバイルビュー (375x667 - iPhone SE)
  const mobilePage = await browser.newPage({
    viewport: { width: 375, height: 667 }
  });
  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({
    path: `${OUTPUT_DIR}/mobile.png`,
    fullPage: true
  });
  console.log(`✅ モバイルビュー: ${OUTPUT_DIR}/mobile.png`);

  await browser.close();
  console.log(`\n🎉 スクリーンショット取得完了！`);
})();
