const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { users } = require("../test-data/user");

test("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.teacherVaildCreds.email,
    users.teacherVaildCreds.password
  );

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});