import { expect, test } from '@playwright/test';

const internalRoutes = ['/', '/solutions/solo', '/solutions/sme', '/solutions/enterprise', '/services'];

test('五個頁面皆有單一 H1 且可存取', async ({ request }) => {
  for (const route of internalRoutes) {
    const response = await request.get(route);
    expect(response.ok(), `${route} -> ${response.status()}`).toBeTruthy();
  }
});

for (const route of internalRoutes) {
  test(`${route} 語意、標題與 H1`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.title()).toContain('實瀚科技');
    expect(errors).toEqual([]);
  });
}

test('首頁語意、SEO 與結構化資料', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.service-card')).toHaveCount(5);
  await expect(page.locator('.faq-item')).toHaveCount(6);
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(schema['@graph'].filter((item: { '@type': string }) => item['@type'] === 'Service')).toHaveLength(5);
  const faqSchema = schema['@graph'].find((item: { '@type': string }) => item['@type'] === 'FAQPage');
  expect(faqSchema.mainEntity).toHaveLength(6);
  for (const faq of faqSchema.mainEntity) {
    await expect(page.locator('.faq-list')).toContainText(faq.name);
    await expect(page.locator('.faq-list')).toContainText(faq.acceptedAnswer.text);
  }
});

test('三個解決方案頁各有獨立結構化資料與 FAQ', async ({ page }) => {
  for (const route of ['/solutions/solo', '/solutions/sme', '/solutions/enterprise']) {
    await page.goto(route);
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    const graph = schema['@graph'];
    const faq = graph.find((item: { '@type': string }) => item['@type'] === 'FAQPage');
    const breadcrumb = graph.find((item: { '@type': string }) => item['@type'] === 'BreadcrumbList');
    expect(faq.mainEntity.length).toBeGreaterThan(0);
    expect(breadcrumb.itemListElement.map((item: { name: string }) => item.name)).toContain('首頁');
    expect(await page.locator('.faq-item').count()).toBe(faq.mainEntity.length);
  }
});

test('服務介紹頁結構化資料與內容', async ({ page }) => {
  await page.goto('/services');
  await expect(page.locator('.offering-row')).toHaveCount(6);
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  const graph = schema['@graph'];
  expect(graph.find((item: { '@type': string }) => item['@type'] === 'Service').name).toContain('服務介紹');
  expect(graph.find((item: { '@type': string }) => item['@type'] === 'FAQPage').mainEntity.length).toBe(5);
});

for (const width of [320, 375, 430, 768, 1024, 1440]) {
  for (const route of ['/', '/solutions/sme', '/services']) {
    test(`響應式 ${route} @ ${width}px 無橫向溢出`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
      if (width === 1440) await page.screenshot({ path: `test-results/${route.replaceAll('/', '-').replace(/^-/, '') || 'home'}-${width}.png`, fullPage: true });
    });
  }
}

test('桌面解決方案下拉選單與頁面轉跳', async ({ page }) => {
  await page.goto('/');
  await page.locator('.solution-dropdown summary').click();
  await expect(page.locator('.solution-menu')).toBeVisible();
  await page.locator('.solution-menu').getByRole('link', { name: /中小企業/ }).click();
  await expect(page).toHaveURL(/\/solutions\/sme$/);
  await expect(page.locator('h1')).toContainText('讓 AI 真正落地');
  await expect(page.locator('.solution-dropdown summary')).toHaveClass(/current-solution/);
});

test('手機選單導覽到解決方案頁', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: '開啟選單' }).click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.locator('#mobile-menu').getByRole('link', { name: /中小企業/ }).click();
  await expect(page).toHaveURL(/\/solutions\/sme$/);
  await expect(page.locator('#mobile-menu')).not.toBeVisible();
  await expect(page.locator('h1')).toContainText('讓 AI 真正落地');
});

test('預約免費諮詢按鈕在五頁皆可開啟', async ({ page }) => {
  for (const route of internalRoutes) {
    await page.goto(route);
    await page.getByRole('button', { name: '預約免費諮詢' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
});

test('諮詢只產生本機摘要，不發送資料', async ({ page }) => {
  const submissions: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') submissions.push(request.url()); });
  await page.goto('/solutions/sme');
  await page.getByRole('button', { name: '預約免費諮詢' }).first().click();
  await page.getByLabel('你的稱呼').fill('測試使用者');
  await page.getByLabel('公司／團隊名稱').fill('示範公司');
  await page.getByLabel('聯絡電郵').fill('test@example.com');
  await page.getByLabel('目前最想解決甚麼問題？').fill('希望自動整理客戶查詢及建立知識庫。');
  await page.getByRole('button', { name: '整理我的諮詢需求' }).click();
  const summary = page.getByLabel('諮詢需求摘要，可選取複製');
  await expect(summary).toHaveValue(/測試使用者/);
  await expect(summary).toHaveValue(/尚未傳送/);
  expect(submissions).toEqual([]);
});

test('解決方案頁 FAQ 展開收合', async ({ page }) => {
  await page.goto('/solutions/sme');
  const item = page.locator('.faq-item').first();
  await item.locator('summary').click();
  await expect(item).toHaveAttribute('open', '');
  await expect(item.locator('.faq-answer')).toBeVisible();
  await item.locator('summary').click();
  await expect(item).not.toHaveAttribute('open', '');
});

test('解決方案頁間相關連結轉跳', async ({ page }) => {
  await page.goto('/solutions/solo');
  await page.locator('.related-solutions').getByRole('link', { name: /中小企業/ }).click();
  await expect(page).toHaveURL(/\/solutions\/sme$/);
  await expect(page.locator('h1')).toContainText('讓 AI 真正落地');
});

test('沒有 JavaScript 仍可閱讀主要內容', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3107/solutions/sme');
  await expect(page.locator('h1')).toContainText('讓 AI 真正落地');
  await expect(page.locator('.pillar-card')).toHaveCount(3);
  await expect(page.locator('.noscript-navigation')).toBeVisible();
  await page.locator('.faq-item summary').first().click();
  await expect(page.locator('.faq-answer').first()).toBeVisible();
  await context.close();
});

test('SEO 和分享圖路由', async ({ request }) => {
  for (const route of ['/robots.txt', '/sitemap.xml', '/icon.svg', '/opengraph-image']) {
    const response = await request.get(route);
    expect(response.ok(), route).toBeTruthy();
  }
});

const catalogRoutes = [['ai-applications', 'ai-chatbot'], ['workflow-integration', 'rpa-automation'], ['cloud-devops', 'cloud-migration'], ['security', 'security-testing'], ['digital-platforms', 'web-ecommerce'], ['training', 'ai-workshop']];

for (const [category] of catalogRoutes) {
  test(`服務分類頁 ${category} 語意與內容`, async ({ page }) => {
    await page.goto(`/services/${category}`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(await page.locator('.catalog-card').count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
  });
}

for (const [category, service] of catalogRoutes) {
  test(`服務詳情頁 ${category}/${service} 語意與內容`, async ({ page }) => {
    await page.goto(`/services/${category}/${service}`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(await page.locator('.capability-tile').count()).toBeGreaterThanOrEqual(3);
    await expect(await page.locator('.faq-item').count()).toBeGreaterThanOrEqual(3);
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    expect(schema['@graph'].find((item: { '@type': string }) => item['@type'] === 'BreadcrumbList').itemListElement.length).toBeGreaterThanOrEqual(4);
  });
}

test('服務介紹頁連結到分類頁', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('link', { name: '查看服務詳情' }).first().click();
  await expect(page).toHaveURL(/\/services\/ai-applications$/);
});

test('分類頁連結到服務詳情頁', async ({ page }) => {
  await page.goto('/services/ai-applications');
  await page.locator('.catalog-card').first().click();
  await expect(page).toHaveURL(/\/services\/ai-applications\/ai-chatbot$/);
});

for (const width of [320, 375]) {
  for (const route of ['/services/ai-applications', '/services/ai-applications/ai-chatbot']) {
    test(`響應式 ${route} @ ${width}px 無橫向溢出`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    });
  }
}

test('服務雙層選單：展開、左右切換與導航', async ({ page }) => {
  await page.goto('/');
  await page.locator('.services-mega').hover();
  await expect(page.locator('#services-mega-panel')).toBeVisible();
  await expect(page.locator('.mega-left > button')).toHaveCount(6);
  await expect(page.locator('.mega-right > a strong').first()).toHaveText('AI 智能客服');
  await page.locator('.mega-left > button').nth(1).hover();
  await expect(page.locator('.mega-right > a strong').first()).toHaveText('RPA 流程自動化');
  await page.locator('.mega-right > a').first().click();
  await expect(page).toHaveURL(/\/services\/workflow-integration\/rpa-automation$/);
});

test('選擇服務頁：卡片展開與收合獨立', async ({ page }) => {
  await page.goto('/choose-service');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.choose-panel-empty')).toBeVisible();
  await page.locator('.choose-card').first().click();
  await expect(page.locator('.choose-panel-empty')).toHaveCount(0);
  await expect(await page.locator('.choose-option').count()).toBeGreaterThanOrEqual(4);
  await page.locator('.choose-card').first().click();
  await expect(page.locator('.choose-panel-empty')).toBeVisible();
});

test('選擇服務頁：選取、全選與諮詢預填', async ({ page }) => {
  await page.goto('/choose-service');
  await page.locator('.choose-card').first().click();
  await page.locator('.choose-option input').first().check();
  await expect(page.locator('.summary-badge')).toHaveText('1');
  await page.getByRole('button', { name: '全選所有' }).click();
  await expect(page.locator('.summary-badge')).toHaveText('19');
  await page.getByRole('button', { name: '找到適合的方向' }).click();
  await expect(page.locator('.modal')).toBeVisible();
  await expect(page.locator('textarea[name="message"]')).toHaveValue(/我感興趣的服務方向：/);
});

for (const width of [320, 375]) {
  test(`響應式 /choose-service @ ${width}px 無橫向溢出`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/choose-service');
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
}
