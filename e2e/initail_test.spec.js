import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { users } from "../test-data/user";
import { ToastMessages } from "../pages/ToastMessages";

test.describe("Login Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.verifyPageLoaded();
  });

  test("Login Valid Cred", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(
      users.teacherVaildCreds.email,
      users.teacherVaildCreds.password,
    );

    await dashboardPage.verifyDashboardLoaded();
  });

  test("Login Invalid Cred", async () => {
    await loginPage.login(
      users.teacherInvalidCreds.email,
      users.teacherInvalidCreds.password,
    );
  });
  test("Email format check", async () => {
    await loginPage.login(
      "asaddfsfsafsffa.com",
      users.teacherInvalidCreds.password,
    );
    await loginPage.verifyInvalidemail();
  });

  test("Should not login with empty fields", async () => {
    await loginPage.login("", "");
    await loginPage.verifyEmptyFeilds();
  });
  test("Should show error when password is empty", async () => {
    await loginPage.login(users.teacherVaildCreds.email, "");
    await loginPage.verifyEmptyPasswordFeild();
  });
  test("Login page UI elements visible", async () => {
    await loginPage.verifyVisiblityofLoginPageElements();
  });
});
