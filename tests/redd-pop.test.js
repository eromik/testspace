const { test, expect } = require('@playwright/test');

test('Проверка ленты /r/popular', async ({ page }, testInfo) => {
  // 1. Переходим на страницу
  await page.goto('https://www.reddit.com/r/popular/');
  
  // 2. Проверяем, что загрузилась нужная страница
  await expect(page).toHaveURL(/\/r\/popular/);

  // 3. Ищем посты (используем тег article как самый стабильный селектор)
  const posts = page.locator('article');
  let post_count;

  // 4. Проверяем, что постов больше 1
  await expect(async () => {
    post_count = await posts.count();
    if (post_count <= 1) {
      throw new Error(`Слишком мало постов: ${post_count}`);
    }
  }).toPass({ timeout: 10000 });

  // 5. Выводим результаты
  console.log(`✅ Проверка завершена. Найдено постов: ${post_count}`);
  testInfo.annotations.push({
    type: 'Результат',
    description: `Обнаружено постов: ${post_count}`
  });

  // 6. Сохраняем скриншот
  await page.screenshot({ path: 'reddit-popular.png' });
});

 // запуск тестов: npx playwright test tests/redd-pop.test.js --headed --browser=chromium