const { test, expect } = require('@playwright/test');

test('Check Reddit Popular Feed', async ({ page }) => {
  // 1. Переходим на страницу
  await page.goto('https://www.reddit.com/r/popular/');
  
  // 2. Проверяем URL
  await expect(page).toHaveURL(/\/r\/popular/);

  // 3. создаём константу
  const posts = page.locator('article');

// 1 способ лучший
  await expect(async () => {
  const count = await posts.count();
  console.log(`Найдено постов: ${count}`); // Вывод в консоль
  if (count <= 1) throw new Error(`Постов должно быть >1, но найдено ${count}`);
}).toPass({ timeout: 10000 });


// 2 способ
// await expect.poll(async () => await posts.count())
//  .toBeGreaterThan(1);

  // 3 Способ : Гибкая проверка (>1)
 // await expect(posts).not.toHaveCount(0);
 // await expect(posts).not.toHaveCount(1, { timeout: 10000 }); // Если нужно именно >1

  // 5. Скриншот 
  await page.screenshot({ path: 'reddit-popular.png' });
});

// Если хочешь всегда видеть число, добавь кастомный репортер или используй testInfo:
//test('Check posts', async ({ page }, testInfo) => {
//  const count = await posts.count();
//  testInfo.annotations.push({ type: 'Посты', description: `Найдено: ${count}` });
//});

 // запуск тестов: npx playwright test reddit-popular.spec.js --headed