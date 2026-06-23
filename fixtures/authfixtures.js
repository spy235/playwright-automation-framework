const base = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { users } = require("../test-data/user");

exports.test = base.test.extend({
  page: async ({ browser }, use) => {
    const authFile = "playwright/.auth/user.json";

    // Login and create fresh state
    const authContext = await browser.newContext();
    const authPage = await authContext.newPage();

    const loginPage = new LoginPage(authPage);

    await loginPage.goto();

    await loginPage.login(
      users.teacherVaildCreds.email,
      users.teacherVaildCreds.password,
    );
  
    await loginPage.verifyPageLoaded();
    

    await authContext.storageState({
      path: authFile,
    });

    await authContext.close();

    // Create test context using fresh state
    const context = await browser.newContext({
      storageState: authFile,
    });

    const page = await context.newPage();

    await use(page);

    await context.close();
  },
});

exports.expect = base.expect;
